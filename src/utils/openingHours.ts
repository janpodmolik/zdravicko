interface OpeningHoursInfo {
  title: string;
  hours: string;
}

const openingHoursByDay: Record<number, string | null> = {
  0: null, // Sunday - closed
  1: '8:00 - 16:00', // Monday
  2: '8:00 - 16:00', // Tuesday
  3: '8:00 - 16:00', // Wednesday
  4: '8:00 - 16:00', // Thursday
  5: '8:00 - 16:00', // Friday
  6: null, // Saturday - closed
};

export function getTodayOpeningHours(): OpeningHoursInfo {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const hours = openingHoursByDay[dayOfWeek];

  if (hours) {
    return {
      title: 'Dnes otevřeno',
      hours: hours
    };
  } else {
    return {
      title: 'Dnes neordinujeme',
      hours: ''
    };
  }
}
