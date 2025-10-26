import specialNoticeData from "../data/special-notice.json";

export interface OpeningHoursInfo {
  title: string;
  hours: string | null;
  isModified?: boolean; // Příznak, že jsou hodiny upravené speciálním oznámením
  notice?: string; // Text oznámení, pokud existuje
  noticeType?: "warning" | "info" | "urgent"; // Typ oznámení pro barvy
}

interface SpecialNotice {
  active: boolean;
  message: string;
  closed?: boolean;
  hours?: string;
  type: "warning" | "info" | "urgent";
  validFrom?: string;
  validTo?: string;
}

const openingHoursByDay: Record<number, string | null> = {
  0: null, // Sunday - closed
  1: "7:30 - 16:00", // Monday
  2: "7:30 - 13:00", // Tuesday
  3: "7:30 - 13:00", // Wednesday
  4: "7:30 - 13:30", // Thursday
  5: "7:30 - 12:00", // Friday
  6: null, // Saturday - closed
};

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
    if (notice.hours) {
      return {
        title: "Dnes otevřeno",
        hours: notice.hours,
        isModified: true,
        notice: notice.message,
        noticeType: notice.type,
      };
    }

    // Případ 3: Jen informace (bez změny hodin)
    return {
      title: regularHours ? "Dnes otevřeno" : "Dnes neordinujeme",
      hours: regularHours,
      isModified: true,
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
