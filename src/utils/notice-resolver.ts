import specialNoticeData from "../data/special-notice.json";
import { isDateInRange, getLocalDate } from "./date-utils";
import { formatHoursRange, areHoursEqual } from "./time-formatting";

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
 * Vrací special notice pokud je aktivní a platí pro daný den
 * @param targetDate - datum pro které kontrolujeme
 * @param respectShowEarly - pokud true, respektuje showEarly flag (zobrazí i před validFrom)
 */
export function getSpecialNoticeForDate(
  targetDate: Date,
  respectShowEarly: boolean = true
): SpecialNotice | null {
  const notice = specialNoticeData as SpecialNotice;

  if (!notice.active) return null;

  // Pokud showEarly = true a respektujeme ho, kontrolujeme pouze validTo
  if (notice.showEarly && respectShowEarly) {
    if (notice.validTo) {
      const validToDate = new Date(notice.validTo);
      validToDate.setHours(23, 59, 59, 999);
      if (targetDate > validToDate) return null;
    }
    return notice;
  }

  // Standardní chování - kontrola validFrom i validTo
  if (!isDateInRange(targetDate, notice.validFrom, notice.validTo)) {
    return null;
  }

  return notice;
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
