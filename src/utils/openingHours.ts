import specialNoticeData from "../data/special-notice.json";

// ============================================================================
// TYPY A KONSTANTY
// ============================================================================

export type NoticeType = "warning" | "info" | "urgent";

export interface OpeningHoursInfo {
  title: string;
  hours: string | null;
  isModified?: boolean;
  notice?: string;
  noticeType?: NoticeType;
}

export interface SpecialNotice {
  active: boolean;
  message: string;
  closed?: boolean;
  hoursFrom?: string; // Formát "HH:mm" např. "08:00"
  hoursTo?: string; // Formát "HH:mm" např. "14:00"
  type: NoticeType;
  validFrom?: string;
  validTo?: string;
}

export interface WeekDaySchedule {
  dayName: string;
  dayOfWeek: number;
  regularHours: string | null;
  actualHours: string | null;
  isToday: boolean;
  isClosed: boolean;
  isModified: boolean;
  notice?: string;
  noticeType?: NoticeType;
}

/** Dny v týdnu - ISO standard (1 = pondělí, 7 = neděle) */
export const DayOfWeek = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 0,
} as const;

/** Názvy dnů v češtině */
export const DAY_NAMES: Record<number, string> = {
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
  },
  warning: {
    text: "text-amber-700",
    badge: "text-amber-600",
  },
  info: {
    text: "text-blue-700",
    badge: "text-blue-600",
  },
} as const;

const openingHoursByDay: Record<number, string | null> = {
  0: null, // Sunday - closed
  1: "7:30 - 16:00", // Monday
  2: "7:30 - 13:00", // Tuesday
  3: "7:30 - 13:00", // Wednesday
  4: "7:30 - 13:30", // Thursday
  5: "7:30 - 12:00", // Friday
  6: null, // Saturday - closed
};

// ============================================================================
// POMOCNÉ FUNKCE
// ============================================================================

/**
 * Zkombinuje hoursFrom a hoursTo do standardního formátu "HH:MM - HH:MM"
 */
function formatHoursRange(hoursFrom?: string, hoursTo?: string): string | null {
  if (!hoursFrom || !hoursTo) return null;

  // Normalizace formátu (7:30 → 7:30, 07:30 → 7:30)
  const normalizeTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    return `${parseInt(hours, 10)}:${minutes.padStart(2, "0")}`;
  };

  return `${normalizeTime(hoursFrom)} - ${normalizeTime(hoursTo)}`;
}

/**
 * Porovná dvě časová rozpětí a vrátí true, pokud jsou stejné
 * Ignoruje rozdíly ve formátování (7:30 vs 07:30)
 */
function areHoursEqual(hours1: string | null, hours2: string | null): boolean {
  if (hours1 === null && hours2 === null) return true;
  if (hours1 === null || hours2 === null) return false;

  // Normalizace obou hodnot
  const normalize = (time: string): string => {
    return time
      .replace(/\s+/g, " ") // Normalizace mezer
      .split(" - ")
      .map((t) => {
        const [h, m] = t.split(":");
        return `${parseInt(h, 10)}:${m.padStart(2, "0")}`;
      })
      .join(" - ");
  };

  return normalize(hours1) === normalize(hours2);
}

function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isDateInRange(
  dateStr: string,
  fromStr?: string,
  toStr?: string
): boolean {
  if (!fromStr && !toStr) return true; // Žádné datum = platí vždy

  const date = new Date(dateStr);

  if (fromStr) {
    const from = new Date(fromStr);
    if (date < from) return false;
  }

  if (toStr) {
    const to = new Date(toStr);
    if (date > to) return false;
  }

  return true;
}

/**
 * Vrátí aktivní special notice pokud existuje a je platné
 */
export function getActiveSpecialNotice(): SpecialNotice | null {
  const notice = specialNoticeData as SpecialNotice;

  if (!notice.active) return null;

  const today = getTodayDateString();
  if (!isDateInRange(today, notice.validFrom, notice.validTo)) {
    return null;
  }

  return notice;
}

/**
 * Získá informace o dnešních ordinačních hodinách
 * Logika (v pořadí priority):
 * 1. Special notice (zavřeno/upravené hodiny/informace)
 * 2. Standardní ordinační hodiny podle dne v týdnu
 */
export function getTodayOpeningHours(): OpeningHoursInfo {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const regularHours = openingHoursByDay[dayOfWeek];

  // Kontrola special notice
  const notice = getActiveSpecialNotice();

  if (notice) {
    // Případ 1: Zavřeno celý den
    if (notice.closed) {
      return {
        title: "Dnes zavřeno",
        hours: null,
        isModified: true,
        notice: notice.message,
        noticeType: notice.type,
      };
    }

    // Případ 2: Upravené hodiny
    const modifiedHours = formatHoursRange(notice.hoursFrom, notice.hoursTo);
    if (modifiedHours) {
      // Smart detekce: Pokud jsou upravené hodiny stejné jako běžné, neoznačujeme jako změnu
      const actuallyModified = !areHoursEqual(modifiedHours, regularHours);

      return {
        title: "Dnes otevřeno",
        hours: modifiedHours,
        isModified: actuallyModified,
        notice: actuallyModified ? notice.message : undefined,
        noticeType: actuallyModified ? notice.type : undefined,
      };
    }

    // Případ 3: Jen informace (bez změny hodin)
    // POZOR: isModified = false, protože hodiny se nemění!
    // Toto je jen informační banner, ne změna otevírací doby
    return {
      title: regularHours ? "Dnes otevřeno" : "Dnes neordinujeme",
      hours: regularHours,
      isModified: false,
      notice: notice.message,
      noticeType: notice.type,
    };
  }

  // Žádné special notice - standardní hodiny
  return {
    title: regularHours ? "Dnes otevřeno" : "Dnes neordinujeme",
    hours: regularHours,
    isModified: false,
  };
}

/**
 * Vrátí ordinační hodiny pro konkrétní den v týdnu (0 = neděle, 6 = sobota)
 * Používá se pro zobrazení týdenního rozvrhu
 */
export function getOpeningHoursForDay(dayOfWeek: number): string | null {
  return openingHoursByDay[dayOfWeek];
}

/**
 * Vrátí datum ve formátu YYYY-MM-DD pro daný den v týdnu
 */
function getDateForDayInWeek(
  dayOfWeek: number,
  weekOffset: number = 0
): string {
  const today = new Date();
  const currentDay = today.getDay();

  // Vypočítáme rozdíl mezi aktuálním dnem a cílovým dnem
  let daysToAdd = dayOfWeek - currentDay;

  // Pokud je cílový den v minulosti tento týden, přidáme týden
  if (daysToAdd < 0) {
    daysToAdd += 7;
  }

  // Přidáme offset týdnů
  daysToAdd += weekOffset * 7;

  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + daysToAdd);

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, "0");
  const day = String(targetDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Zkontroluje, zda pro daný den existuje aktivní special notice
 */
function getSpecialNoticeForDate(dateStr: string): SpecialNotice | null {
  const notice = specialNoticeData as SpecialNotice;

  if (!notice.active) return null;

  if (!isDateInRange(dateStr, notice.validFrom, notice.validTo)) {
    return null;
  }

  return notice;
}

// ============================================================================
// UTILITY FUNKCE PRO DATUM
// ============================================================================

/**
 * Vrátí datum ve formátu DD.MM. pro daný den v týdnu
 * @param dayOfWeek Den v týdnu (0 = neděle, 1 = pondělí, atd.)
 * @returns Formátované datum např. "28.10."
 */
export function formatDateForDay(dayOfWeek: number): string {
  const today = new Date();
  const currentDay = today.getDay();
  let daysToAdd = dayOfWeek - currentDay;

  if (daysToAdd < 0) daysToAdd += 7;

  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + daysToAdd);

  const day = targetDate.getDate();
  const month = targetDate.getMonth() + 1;

  return `${day}.${month}.`;
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
  const currentDay = today.getDay();

  const schedule: WeekDaySchedule[] = [
    { dayOfWeek: DayOfWeek.MONDAY, dayName: DAY_NAMES[DayOfWeek.MONDAY] },
    { dayOfWeek: DayOfWeek.TUESDAY, dayName: DAY_NAMES[DayOfWeek.TUESDAY] },
    { dayOfWeek: DayOfWeek.WEDNESDAY, dayName: DAY_NAMES[DayOfWeek.WEDNESDAY] },
    { dayOfWeek: DayOfWeek.THURSDAY, dayName: DAY_NAMES[DayOfWeek.THURSDAY] },
    { dayOfWeek: DayOfWeek.FRIDAY, dayName: DAY_NAMES[DayOfWeek.FRIDAY] },
  ].map(({ dayOfWeek, dayName }) => {
    const dateStr = getDateForDayInWeek(dayOfWeek);
    const regularHours = openingHoursByDay[dayOfWeek];
    const isToday = currentDay === dayOfWeek;

    // Výchozí hodnoty
    let actualHours = regularHours;
    let isClosed = !regularHours;
    let isModified = false;
    let notice = null;

    // Aplikace special notice
    // Pro pracovní dny (Po-Pá) kontrolujeme special notices
    notice = getSpecialNoticeForDate(dateStr);

    if (notice) {
      if (notice.closed) {
        actualHours = null;
        isClosed = true;
        isModified = true;
      } else {
        const modifiedHours = formatHoursRange(
          notice.hoursFrom,
          notice.hoursTo
        );
        if (modifiedHours) {
          // Smart detekce: Pokud jsou upravené hodiny stejné jako běžné, neoznačujeme jako změnu
          if (!areHoursEqual(modifiedHours, regularHours)) {
            actualHours = modifiedHours;
            isClosed = false;
            isModified = true;
          }
          // Jinak necháme actualHours = regularHours a isModified = false
        }
      }
    }

    return {
      dayOfWeek,
      dayName,
      regularHours,
      actualHours,
      isToday,
      isClosed,
      isModified,
      notice: isModified ? notice?.message : undefined, // Zpráva jen pokud je změna
      noticeType: isModified ? notice?.type : undefined, // Typ jen pokud je změna
    };
  });

  // Přidáme víkend (kombinovaný řádek)
  schedule.push({
    dayOfWeek: -1, // Speciální hodnota pro víkend
    dayName: "Sobota - Neděle",
    regularHours: null,
    actualHours: null,
    isToday:
      currentDay === DayOfWeek.SUNDAY || currentDay === DayOfWeek.SATURDAY,
    isClosed: true,
    isModified: false,
  });

  return schedule;
}
