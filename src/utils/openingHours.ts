export interface OpeningHoursInfo {
  title: string;
  hours: string;
}

export interface SpecialNotice {
  active: boolean;
  date: string; // YYYY-MM-DD format
  message: string;
  hours?: string; // Optional modified hours
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

// This will be managed via GitHub/Netlify in the future
const specialNotice: SpecialNotice = {
  active: false,
  date: "2025-10-25",
  message: "Dnes ordinujeme pouze do 14:00 z důvodu školení personálu",
  hours: "8:00 - 14:00",
};

function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getSpecialNotice(): SpecialNotice | null {
  if (!specialNotice.active) return null;

  const todayDate = getTodayDateString();
  if (specialNotice.date !== todayDate) return null;

  return specialNotice;
}

export function getTodayOpeningHours(): OpeningHoursInfo {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // Check for special notice first (higher priority)
  const notice = getSpecialNotice();
  if (notice && notice.hours) {
    return {
      title: "Dnes otevřeno",
      hours: notice.hours,
    };
  }

  // Regular hours
  const hours = openingHoursByDay[dayOfWeek];

  if (hours) {
    return {
      title: "Dnes otevřeno",
      hours: hours,
    };
  } else {
    return {
      title: "Dnes neordinujeme",
      hours: "",
    };
  }
}
