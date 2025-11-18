import specialNoticeClosure from "../data/closureNotice";
import {
  getLocalDate,
  getDateForDayInWeek,
  formatShortDate,
} from "./date-utils";
import { formatHoursRange } from "./time-formatting";
import {
  getSpecialNoticeForDate,
  resolveNoticeOutcome,
  isNoticeEarlyWarning,
  type SpecialNotice,
  type NoticeType,
} from "./notice-resolver";

// ============================================================================
// TYPY A KONSTANTY
// ============================================================================

// Re-export typů pro zpětnou kompatibilitu
export type { NoticeType, SpecialNotice } from "./notice-resolver";

export interface OpeningHoursInfo {
  title: string;
  hours: string | null;
  isModified?: boolean;
  isClosed?: boolean;
  notice?: string;
  noticeType?: NoticeType;
}

export interface WeekDaySchedule {
  dayName: string;
  dayOfWeek: WeekScheduleDay;
  regularHours: string | null;
  actualHours: string | null;
  isToday: boolean;
  isClosed: boolean;
  isModified: boolean;
  changedFromRegular: boolean;
  notice?: string;
  noticeType?: NoticeType;
  noticeBadgeLabel?: string;
  isWeekend?: boolean;
}

/** Dny v týdnu podle Date.getDay() (0 = neděle, 6 = sobota) */
export const DayOfWeek = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 0,
} as const;

export type DayOfWeekValue = (typeof DayOfWeek)[keyof typeof DayOfWeek];
export const WEEKEND_GROUP_DAY = -1 as const;
export type WeekScheduleDay = DayOfWeekValue | typeof WEEKEND_GROUP_DAY;

/** Názvy dnů v češtině */
export const DAY_NAMES: Record<DayOfWeekValue, string> = {
  [DayOfWeek.MONDAY]: "Pondělí",
  [DayOfWeek.TUESDAY]: "Úterý",
  [DayOfWeek.WEDNESDAY]: "Středa",
  [DayOfWeek.THURSDAY]: "Čtvrtek",
  [DayOfWeek.FRIDAY]: "Pátek",
  [DayOfWeek.SATURDAY]: "Sobota",
  [DayOfWeek.SUNDAY]: "Neděle",
} as const;

/** CSS třídy pro typy oznámení */
export const NOTICE_TYPE_CLASSES = {
  urgent: {
    text: "text-red-700",
    badge: "text-red-600",
    background: "bg-red-600",
  },
  warning: {
    text: "text-amber-700",
    badge: "text-amber-600",
    background: "bg-amber-600",
  },
  info: {
    text: "text-blue-700",
    badge: "text-blue-600",
    background: "bg-blue-600",
  },
} as const;

/** Textové labely pro ordinační hodiny */
export const HOURS_LABELS = {
  CLOSED: "Zavřeno",
  TODAY_OPEN: "Dnes otevřeno",
  TODAY_CLOSED: "Dnes zavřeno",
  TODAY_NOT_WORKING: "Dnes neordinujeme",
} as const;

const openingHoursByDay: Record<DayOfWeekValue, string | null> = {
  [DayOfWeek.SUNDAY]: null,
  [DayOfWeek.MONDAY]: "7:30 - 16:00",
  [DayOfWeek.TUESDAY]: "7:30 - 13:00",
  [DayOfWeek.WEDNESDAY]: "7:30 - 13:00",
  [DayOfWeek.THURSDAY]: "7:30 - 13:30",
  [DayOfWeek.FRIDAY]: "7:30 - 12:00",
  [DayOfWeek.SATURDAY]: null,
};

const WORKING_DAYS: DayOfWeekValue[] = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
];

const WEEKEND_DAYS: DayOfWeekValue[] = [DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];

// ============================================================================
// POMOCNÉ FUNKCE PRO SPECIAL NOTICE
// ============================================================================

/**
 * Vrátí aktivní special notice pokud existuje a je platné
 * @param respectShowEarly - pokud true, zobrazí notice i před validFrom (early warning)
 */
export function getActiveSpecialNotice(
  respectShowEarly: boolean = false
): SpecialNotice | null {
  return getSpecialNoticeForDate(getLocalDate(), respectShowEarly);
}

export interface SpecialNoticeDisplay {
  notice: SpecialNotice | null;
  shouldDisplay: boolean;
  displayHours: string | null;
  isClosed: boolean;
  isEarlyWarning: boolean; // Pokud true, oznámení se zobrazuje před validFrom (informuje o budoucnosti)
  closureInfo?: SpecialNoticeClosureInfo;
}

export interface SpecialNoticeClosureInfo {
  doctorName: string;
  addressLabel: string;
  mapUrl: string;
  phoneDisplay: string;
  phoneHref: string;
  introText: string;
  phoneNote: string;
}

/**
 * Vrátí předzpracovaná data pro komponenty zobrazující speciální oznámení.
 * @param respectShowEarly - pokud true, zobrazí notice i před validFrom (early warning)
 */
export function getSpecialNoticeDisplay(
  respectShowEarly: boolean = false
): SpecialNoticeDisplay {
  const notice = getActiveSpecialNotice(respectShowEarly);

  if (!notice) {
    return {
      notice: null,
      shouldDisplay: false,
      displayHours: null,
      isClosed: false,
      isEarlyWarning: false,
      closureInfo: undefined,
    };
  }

  const isEarlyWarning = isNoticeEarlyWarning(notice);

  if (notice.closed) {
    return {
      notice,
      shouldDisplay: true,
      displayHours: HOURS_LABELS.CLOSED,
      isClosed: true,
      isEarlyWarning,
      // Zobraz zástupujícího lékaře pouze pokud showSubstituteDoctor není explicitně false
      closureInfo:
        notice.showSubstituteDoctor !== false
          ? specialNoticeClosure
          : undefined,
    };
  }

  return {
    notice,
    shouldDisplay: true,
    displayHours: formatHoursRange(notice.hoursFrom, notice.hoursTo),
    isClosed: false,
    isEarlyWarning,
    closureInfo: undefined,
  };
}

/**
 * Získá informace o dnešních ordinačních hodinách (AKTUÁLNÍ STAV - pouze když platí DNES)
 * Ignoruje showEarly flag - zobrazí warning pouze když změna platí dnes.
 * Použití: QuickInfo, TodayHoursCard (kdy nechceme pokazovat "dnes zavřeno" když je zavřeno až zítra)
 */
export function getTodayActualHours(): OpeningHoursInfo {
  const today = getLocalDate();
  const dayOfWeek = today.getDay() as DayOfWeekValue;
  const regularHours = openingHoursByDay[dayOfWeek];

  const resolution = resolveNoticeOutcome(today, regularHours, false); // respectShowEarly = false

  const title = resolution.isClosed
    ? resolution.hasSpecialNotice
      ? HOURS_LABELS.TODAY_CLOSED
      : HOURS_LABELS.TODAY_NOT_WORKING
    : HOURS_LABELS.TODAY_OPEN;

  return {
    title,
    hours: resolution.finalHours,
    isModified: resolution.isModified,
    isClosed: resolution.isClosed,
    notice: resolution.notice,
    noticeType: resolution.noticeType,
  };
}

/**
 * Získá informace o dnešních ordinačních hodinách (S EARLY WARNINGS)
 * Respektuje showEarly flag - zobrazí upozornění i na budoucí změny.
 * Použití: Stránky kde chceme zobrazit předčasná upozornění.
 *
 * @deprecated Použij getTodayActualHours() pro většinu případů
 */
export function getTodayHoursWithNotice(): OpeningHoursInfo {
  const today = getLocalDate();
  const dayOfWeek = today.getDay() as DayOfWeekValue;
  const regularHours = openingHoursByDay[dayOfWeek];

  const resolution = resolveNoticeOutcome(today, regularHours, true); // respectShowEarly = true

  const title = resolution.isClosed
    ? resolution.hasSpecialNotice
      ? HOURS_LABELS.TODAY_CLOSED
      : HOURS_LABELS.TODAY_NOT_WORKING
    : HOURS_LABELS.TODAY_OPEN;

  return {
    title,
    hours: resolution.finalHours,
    isModified: resolution.isModified,
    isClosed: resolution.isClosed,
    notice: resolution.notice,
    noticeType: resolution.noticeType,
  };
}

/**
 * @deprecated Použij getTodayActualHours() nebo getTodayHoursWithNotice()
 */
export function getTodayOpeningHours(
  respectShowEarly: boolean = true
): OpeningHoursInfo {
  return respectShowEarly ? getTodayHoursWithNotice() : getTodayActualHours();
}

/**
 * Vrátí ordinační hodiny pro konkrétní den v týdnu (0 = neděle, 6 = sobota)
 * Používá se pro zobrazení týdenního rozvrhu
 */
export function getOpeningHoursForDay(
  dayOfWeek: DayOfWeekValue
): string | null {
  return openingHoursByDay[dayOfWeek];
}

/**
 * Vrátí datum ve formátu DD.MM. pro daný den v týdnu
 * @param dayOfWeek Den v týdnu (0 = neděle, 1 = pondělí, atd.)
 * @returns Formátované datum např. "28.10."
 */
export function formatDateForDay(dayOfWeek: DayOfWeekValue): string {
  return formatShortDate(getDateForDayInWeek(dayOfWeek));
}

// ============================================================================
// HLAVNÍ API FUNKCE
// ============================================================================

/**
 * Vrátí kompletní týdenní rozvrh s respektováním special notices
 * Zahrnuje jak běžné hodiny, tak případné výjimky
 * Nepoužívá showEarly - zobrazuje změny pouze pro dny, kdy skutečně platí
 */
export function getWeekScheduleWithNotices(): WeekDaySchedule[] {
  const today = getLocalDate();
  const currentDay = today.getDay() as DayOfWeekValue;

  const schedule: WeekDaySchedule[] = WORKING_DAYS.map((dayOfWeek) => {
    const targetDate = getDateForDayInWeek(dayOfWeek, 0, today);
    const regularHours = openingHoursByDay[dayOfWeek];
    const resolution = resolveNoticeOutcome(targetDate, regularHours, false); // respectShowEarly = false
    const isToday = currentDay === dayOfWeek;

    const actualHours = resolution.matchesRegularHours
      ? regularHours
      : resolution.finalHours;
    const changedFromRegular = !resolution.matchesRegularHours;
    const noticeBadgeLabel =
      resolution.isModified && !isToday
        ? formatShortDate(targetDate)
        : undefined;

    return {
      dayOfWeek,
      dayName: DAY_NAMES[dayOfWeek],
      regularHours,
      actualHours,
      isToday,
      isClosed: resolution.isClosed,
      isModified: resolution.isModified,
      changedFromRegular,
      notice: resolution.isModified ? resolution.notice : undefined,
      noticeType: resolution.isModified ? resolution.noticeType : undefined,
      noticeBadgeLabel,
      isWeekend: false,
    };
  });

  // Přidáme víkend (kombinovaný řádek)
  schedule.push({
    dayOfWeek: WEEKEND_GROUP_DAY,
    dayName: "Sobota - Neděle",
    regularHours: null,
    actualHours: null,
    isToday: WEEKEND_DAYS.includes(currentDay),
    isClosed: true,
    isModified: false,
    changedFromRegular: false,
    isWeekend: true,
  });

  return schedule;
}
