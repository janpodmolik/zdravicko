import specialNoticeData from "../data/special-notice.json";
import specialNoticeClosure from "../data/closureNotice";

// ============================================================================
// TYPY A KONSTANTY
// ============================================================================

export type NoticeType = "warning" | "info" | "urgent";

export interface OpeningHoursInfo {
  title: string;
  hours: string | null;
  isModified?: boolean;
  isClosed?: boolean;
  notice?: string;
  noticeType?: NoticeType;
}

export interface SpecialNotice {
  active: boolean;
  message?: string;
  closed?: boolean;
  hoursFrom?: string; // Formát "HH:mm" např. "08:00"
  hoursTo?: string; // Formát "HH:mm" např. "14:00"
  type: NoticeType;
  validFrom?: string;
  validTo?: string;
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
// POMOCNÉ FUNKCE
// ============================================================================

const HOURS_SEPARATOR = "-";

function normalizeTimeValue(time: string): string {
  const [hours = "0", minutes = "0"] = time.trim().split(":");
  const normalizedHours = hours.trim();
  const normalizedMinutes = minutes.trim();
  const parsedHours = Number.parseInt(normalizedHours, 10);
  const minutePart = normalizedMinutes.padStart(2, "0");

  return `${
    Number.isNaN(parsedHours) ? normalizedHours : parsedHours
  }:${minutePart}`;
}

function buildHoursRange(hoursFrom: string, hoursTo: string): string {
  return `${normalizeTimeValue(
    hoursFrom
  )} ${HOURS_SEPARATOR} ${normalizeTimeValue(hoursTo)}`;
}

/**
 * Zkombinuje hoursFrom a hoursTo do standardního formátu "HH:MM - HH:MM"
 */
function formatHoursRange(hoursFrom?: string, hoursTo?: string): string | null {
  if (!hoursFrom || !hoursTo) return null;
  return buildHoursRange(hoursFrom, hoursTo);
}

/**
 * Porovná dvě časová rozpětí a vrátí true, pokud jsou stejné
 * Ignoruje rozdíly ve formátování (7:30 vs 07:30)
 */
function normalizeHoursRangeValue(range: string | null): string | null {
  if (!range) return null;

  const [fromRaw, toRaw] = range
    .split(HOURS_SEPARATOR)
    .map((part) => part.trim());
  if (!fromRaw || !toRaw) {
    return range.trim();
  }

  return buildHoursRange(fromRaw, toRaw);
}

function areHoursEqual(hours1: string | null, hours2: string | null): boolean {
  return normalizeHoursRangeValue(hours1) === normalizeHoursRangeValue(hours2);
}

function isDateInRange(date: Date, fromStr?: string, toStr?: string): boolean {
  if (!fromStr && !toStr) return true; // Žádné datum = platí vždy

  if (fromStr) {
    const from = new Date(fromStr);
    from.setHours(0, 0, 0, 0);
    if (date < from) return false;
  }

  if (toStr) {
    const to = new Date(toStr);
    to.setHours(23, 59, 59, 999);
    if (date > to) return false;
  }

  return true;
}

/**
 * Vrátí aktivní special notice pokud existuje a je platné
 */
export function getActiveSpecialNotice(): SpecialNotice | null {
  return getSpecialNoticeForDate(new Date());
}

export interface SpecialNoticeDisplay {
  notice: SpecialNotice | null;
  shouldDisplay: boolean;
  displayHours: string | null;
  isClosed: boolean;
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
 * Konsoliduje logiku kolem zavřených dnů a formátu času.
 */
export function getSpecialNoticeDisplay(): SpecialNoticeDisplay {
  const notice = getActiveSpecialNotice();

  if (!notice) {
    return {
      notice: null,
      shouldDisplay: false,
      displayHours: null,
      isClosed: false,
      closureInfo: undefined,
    };
  }

  if (notice.closed) {
    return {
      notice,
      shouldDisplay: true,
      displayHours: "Zavřeno",
      isClosed: true,
      closureInfo: specialNoticeClosure,
    };
  }

  return {
    notice,
    shouldDisplay: true,
    displayHours: formatHoursRange(notice.hoursFrom, notice.hoursTo),
    isClosed: false,
    closureInfo: undefined,
  };
}

/**
 * Získá informace o dnešních ordinačních hodinách
 * Logika (v pořadí priority):
 * 1. Special notice (zavřeno/upravené hodiny/informace)
 * 2. Standardní ordinační hodiny podle dne v týdnu
 */
export function getTodayOpeningHours(): OpeningHoursInfo {
  const today = new Date();
  const dayOfWeek = today.getDay() as DayOfWeekValue;
  const regularHours = openingHoursByDay[dayOfWeek];

  const resolution = resolveNoticeOutcome(today, regularHours);

  const title = resolution.isClosed
    ? resolution.hasSpecialNotice
      ? "Dnes zavřeno"
      : "Dnes neordinujeme"
    : "Dnes otevřeno";

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
 * Vrátí ordinační hodiny pro konkrétní den v týdnu (0 = neděle, 6 = sobota)
 * Používá se pro zobrazení týdenního rozvrhu
 */
export function getOpeningHoursForDay(
  dayOfWeek: DayOfWeekValue
): string | null {
  return openingHoursByDay[dayOfWeek];
}

/**
 * Vrátí datum ve formátu YYYY-MM-DD pro daný den v týdnu
 */
function getDateForDayInWeek(
  dayOfWeek: DayOfWeekValue,
  weekOffset: number = 0,
  referenceDate: Date = new Date()
): Date {
  const currentDay = referenceDate.getDay() as DayOfWeekValue;

  let daysToAdd = dayOfWeek - currentDay;
  if (daysToAdd < 0) {
    daysToAdd += 7;
  }

  daysToAdd += weekOffset * 7;

  const targetDate = new Date(referenceDate);
  targetDate.setHours(0, 0, 0, 0);
  targetDate.setDate(referenceDate.getDate() + daysToAdd);

  return targetDate;
}

/**
 * Zkontroluje, zda pro daný den existuje aktivní special notice
 */
function getSpecialNoticeForDate(targetDate: Date): SpecialNotice | null {
  const notice = specialNoticeData as SpecialNotice;

  if (!notice.active) return null;

  if (!isDateInRange(targetDate, notice.validFrom, notice.validTo)) {
    return null;
  }

  return notice;
}

interface NoticeResolution {
  finalHours: string | null;
  isClosed: boolean;
  isModified: boolean;
  matchesRegularHours: boolean;
  hasSpecialNotice: boolean;
  notice?: string;
  noticeType?: NoticeType;
}

function resolveNoticeOutcome(
  date: Date,
  regularHours: string | null
): NoticeResolution {
  const notice = getSpecialNoticeForDate(date);

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

// ============================================================================
// UTILITY FUNKCE PRO DATUM
// ============================================================================

function formatShortDate(targetDate: Date): string {
  const day = targetDate.getDate();
  const month = targetDate.getMonth() + 1;

  return `${day}.${month}.`;
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
 */
export function getWeekScheduleWithNotices(): WeekDaySchedule[] {
  const today = new Date();
  const currentDay = today.getDay() as DayOfWeekValue;

  const schedule: WeekDaySchedule[] = WORKING_DAYS.map((dayOfWeek) => {
    const targetDate = getDateForDayInWeek(dayOfWeek, 0, today);
    const regularHours = openingHoursByDay[dayOfWeek];
    const resolution = resolveNoticeOutcome(targetDate, regularHours);
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
