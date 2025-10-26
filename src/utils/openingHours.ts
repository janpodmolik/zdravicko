import specialNoticeData from '../data/special-notice.json';

export interface OpeningHoursInfo {
  title: string;
  hours: string;
  isModified?: boolean; // Příznak, že jsou hodiny upravené speciálním oznámením
  notice?: string; // Text oznámení, pokud existuje
}

export interface SpecialNotice {
  active: boolean;
  message: string;
  hours?: string;
  type: 'warning' | 'info' | 'urgent';
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

function isDateInRange(validFrom?: string, validTo?: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (validFrom) {
    const fromDate = new Date(validFrom);
    fromDate.setHours(0, 0, 0, 0);
    if (today < fromDate) return false;
  }
  
  if (validTo) {
    const toDate = new Date(validTo);
    toDate.setHours(23, 59, 59, 999);
    if (today > toDate) return false;
  }
  
  return true;
}

export function getActiveSpecialNotice(): SpecialNotice | null {
  const notice = specialNoticeData as SpecialNotice;
  
  if (!notice.active) return null;
  if (!isDateInRange(notice.validFrom, notice.validTo)) return null;
  
  return notice;
}

export function getTodayOpeningHours(): OpeningHoursInfo {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // Check for special notice first (higher priority)
  const notice = getActiveSpecialNotice();
  if (notice && notice.hours) {
    return {
      title: "Dnes otevřeno",
      hours: notice.hours,
      isModified: true,
      notice: notice.message,
    };
  }

  // Regular hours
  const hours = openingHoursByDay[dayOfWeek];

  if (hours) {
    return {
      title: "Dnes otevřeno",
      hours: hours,
      isModified: false,
    };
  } else {
    return {
      title: "Dnes neordinujeme",
      hours: "",
      isModified: false,
    };
  }
}

// Vrátí ordinační hodiny pro konkrétní den v týdnu (0 = neděle, 1 = pondělí, ...)
export function getOpeningHoursForDay(dayOfWeek: number): string | null {
  // Nejdříve zkontroluj special notice
  const notice = getActiveSpecialNotice();
  if (notice && notice.hours) {
    // Pokud je dnes ten den, vrať upravené hodiny
    const today = new Date().getDay();
    if (today === dayOfWeek) {
      return notice.hours;
    }
  }
  
  return openingHoursByDay[dayOfWeek];
}
