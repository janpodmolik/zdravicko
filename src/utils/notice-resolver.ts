import specialNoticeData from "../data/special-notice.json";
import { isDateInRange, getLocalDate } from "./date-utils";
import { formatHoursRange, areHoursEqual } from "./time-formatting";
import { getHolidayScheduleForDate } from "./holiday-schedule";

// ============================================================================
// TYPY
// ============================================================================

export type NoticeType = "warning" | "info" | "urgent";

export interface SpecialNotice {
  active: boolean;
  message?: string;
  closed?: boolean;
  showSubstituteDoctor?: boolean;
  showEarly?: boolean;
  hoursFrom?: string;
  hoursTo?: string;
  type: NoticeType;
  validFrom?: string;
  validTo?: string;
}

/**
 * Nový formát: soubor obsahuje pole oznámení pod klíčem `notices`.
 * Starý formát: soubor byl jeden objekt SpecialNotice.
 * Tato struktura pokrývá obě varianty kvůli zpětné kompatibilitě.
 */
type SpecialNoticeData =
  | { notices: SpecialNotice[] }
  | SpecialNotice;

// ============================================================================
// NAČTENÍ OZNÁMENÍ
// ============================================================================

/**
 * Vrátí všechna oznámení ze souboru jako pole.
 * Podporuje nový formát ({ notices: [...] }) i starý (jeden objekt).
 * Pořadí v poli je významné - při překryvu vyhrává první aktivní oznámení.
 */
export function getAllSpecialNotices(): SpecialNotice[] {
  const data = specialNoticeData as SpecialNoticeData;

  if (data && Array.isArray((data as { notices?: unknown }).notices)) {
    return (data as { notices: SpecialNotice[] }).notices;
  }

  // Zpětná kompatibilita - starý formát jednoho objektu
  return [data as SpecialNotice];
}

// ============================================================================
// NOTICE RESOLVER
// ============================================================================

/**
 * Zkontroluje, jestli je notice v "early warning" režimu
 * (zobrazuje se už PŘED validFrom kvůli showEarly flagu)
 */
export function isNoticeEarlyWarning(notice: SpecialNotice): boolean {
  if (!notice.showEarly || !notice.validFrom) return false;
  const today = getLocalDate();
  const validFromDate = new Date(notice.validFrom);
  validFromDate.setHours(0, 0, 0, 0);
  return today < validFromDate;
}

/**
 * Zkontroluje, jestli konkrétní oznámení platí pro daný den.
 * @param respectShowEarly - pokud true, respektuje showEarly flag (platí i před validFrom)
 */
function isNoticeValidForDate(
  notice: SpecialNotice,
  targetDate: Date,
  respectShowEarly: boolean
): boolean {
  if (!notice.active) return false;

  // Pokud showEarly = true a respektujeme ho, kontrolujeme pouze validTo
  if (notice.showEarly && respectShowEarly) {
    if (notice.validTo) {
      const validToDate = new Date(notice.validTo);
      validToDate.setHours(23, 59, 59, 999);
      if (targetDate > validToDate) return false;
    }
    return true;
  }

  // Standardní chování - kontrola validFrom i validTo
  return isDateInRange(targetDate, notice.validFrom, notice.validTo);
}

/**
 * Vrací všechna oznámení, která jsou aktivní a platí pro daný den.
 * Zachovává pořadí ze souboru (první = nejvyšší priorita).
 * @param targetDate - datum pro které kontrolujeme
 * @param respectShowEarly - pokud true, respektuje showEarly flag (zobrazí i před validFrom)
 */
export function getSpecialNoticesForDate(
  targetDate: Date,
  respectShowEarly: boolean = true
): SpecialNotice[] {
  return getAllSpecialNotices().filter((notice) =>
    isNoticeValidForDate(notice, targetDate, respectShowEarly)
  );
}

/**
 * Vrací JEDNO special notice pro daný den (pro výpočet hodin v kalendáři).
 * Při překryvu více oznámení vyhrává první aktivní v pořadí ze souboru.
 * @param targetDate - datum pro které kontrolujeme
 * @param respectShowEarly - pokud true, respektuje showEarly flag (zobrazí i před validFrom)
 */
export function getSpecialNoticeForDate(
  targetDate: Date,
  respectShowEarly: boolean = true
): SpecialNotice | null {
  return getSpecialNoticesForDate(targetDate, respectShowEarly)[0] ?? null;
}

export interface NoticeResolution {
  finalHours: string | null;
  isClosed: boolean;
  isModified: boolean;
  matchesRegularHours: boolean;
  hasSpecialNotice: boolean;
  notice?: string;
  noticeType?: NoticeType;
}

/**
 * Vypočítá výsledné ordinační hodiny pro daný den s ohledem na special notice
 * @param date - Datum pro které počítáme
 * @param regularHours - Standardní ordinační hodiny (např. "7:30 - 16:00")
 * @param respectShowEarly - pokud false, ignoruje showEarly flag (zobrazí warning jen když platí DNES)
 */
export function resolveNoticeOutcome(
  date: Date,
  regularHours: string | null,
  respectShowEarly: boolean = true
): NoticeResolution {
  // 1. Nejprve zkontroluj holiday-schedule (má přednost před special-notice)
  const holidayDay = getHolidayScheduleForDate(date);
  if (holidayDay) {
    const isClosed = !holidayDay.hours;
    const matchesRegular = areHoursEqual(holidayDay.hours, regularHours);
    const isModified = isClosed || !matchesRegular;

    return {
      finalHours: holidayDay.hours,
      isClosed,
      isModified,
      matchesRegularHours: matchesRegular,
      hasSpecialNotice: true,
      notice: isModified
        ? holidayDay.note || (isClosed ? "Dovolená" : undefined)
        : undefined,
      noticeType: isModified ? "warning" : undefined,
    };
  }

  // 2. Pak standardní special-notice
  const notice = getSpecialNoticeForDate(date, respectShowEarly);

  if (!notice) {
    return {
      finalHours: regularHours,
      isClosed: !regularHours,
      isModified: false,
      matchesRegularHours: true,
      hasSpecialNotice: false,
    };
  }

  if (notice.closed) {
    return {
      finalHours: null,
      isClosed: true,
      isModified: true,
      matchesRegularHours: false,
      hasSpecialNotice: true,
      notice: notice.message,
      noticeType: notice.type,
    };
  }

  const modifiedHours = formatHoursRange(notice.hoursFrom, notice.hoursTo);

  if (modifiedHours) {
    const matchesRegularHours = areHoursEqual(modifiedHours, regularHours);

    return {
      finalHours: modifiedHours,
      isClosed: false,
      isModified: !matchesRegularHours,
      matchesRegularHours,
      hasSpecialNotice: true,
      notice: !matchesRegularHours ? notice.message : undefined,
      noticeType: !matchesRegularHours ? notice.type : undefined,
    };
  }

  return {
    finalHours: regularHours,
    isClosed: !regularHours,
    isModified: false,
    matchesRegularHours: true,
    hasSpecialNotice: true,
    notice: notice.message,
    noticeType: notice.type,
  };
}
