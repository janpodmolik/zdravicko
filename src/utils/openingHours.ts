import specialNoticeData from '../data/special-notice.json';

export interface OpeningHoursInfo {
  title: string;
  hours: string;
  isModified?: boolean; // Příznak, že jsou hodiny upravené speciálním oznámením
  notice?: string; // Text oznámení, pokud existuje
  noticeType?: 'warning' | 'info' | 'urgent'; // Typ oznámení pro barvy
}

interface SpecialNotice {
  active: boolean;
  message: string;
  closed?: boolean;
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

function isDateInRange(dateStr: string, fromStr?: string, toStr?: string): boolean {
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

export function getActiveSpecialNotice(): SpecialNotice | null {
  const notice = specialNoticeData as SpecialNotice;
  
  if (!notice.active) return null;
  
  // Kontrola platnosti podle rozsahu dat
  const today = getTodayDateString();
  if (!isDateInRange(today, notice.validFrom, notice.validTo)) {
    return null;
  }
  
  return notice;
}

/**
 * Helper funkce pro získání hodin z special notice
 * Jeden zdroj pravdy pro logiku closed/hours
 */
function getSpecialNoticeHours(notice: SpecialNotice): string | null {
  // Pokud je zavřeno, vždy vrať "Zavřeno" (ignoruj pole hours)
  if (notice.closed) {
    return "Zavřeno";
  }
  
  // Pokud nejsou upravené hodiny, vrať null (použije se běžná doba)
  if (!notice.hours) {
    return null;
  }
  
  // Vrať upravené hodiny
  return notice.hours;
}

export function getTodayOpeningHours(): OpeningHoursInfo {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // Check for special notice first (higher priority)
  const notice = getActiveSpecialNotice();
  if (notice) {
    const specialHours = getSpecialNoticeHours(notice);
    
    // Pokud máme special hours (včetně "Zavřeno")
    if (specialHours !== null) {
      const isClosed = specialHours === "Zavřeno";
      return {
        title: isClosed ? "Dnes zavřeno" : "Dnes otevřeno",
        hours: specialHours,
        isModified: true,
        notice: notice.message,
        noticeType: notice.type,
      };
    }
    
    // Special notice existuje, ale nemá ani closed ani hours
    // Zobrazíme normální hodiny s upozorněním
    const regularHours = openingHoursByDay[dayOfWeek];
    if (regularHours) {
      return {
        title: "Dnes otevřeno",
        hours: regularHours,
        isModified: true,
        notice: notice.message,
        noticeType: notice.type,
      };
    } else {
      return {
        title: "Dnes neordinujeme",
        hours: "",
        isModified: true,
        notice: notice.message,
        noticeType: notice.type,
      };
    }
  }

  // Regular hours (žádné special notice)
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
  if (notice) {
    // Pokud je dnes ten den, použij helper funkci
    const today = new Date().getDay();
    if (today === dayOfWeek) {
      const specialHours = getSpecialNoticeHours(notice);
      if (specialHours !== null) {
        return specialHours;
      }
    }
  }
  
  return openingHoursByDay[dayOfWeek];
}
