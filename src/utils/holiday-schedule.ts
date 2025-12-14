import holidayScheduleData from "../data/holiday-schedule.json";
import { getLocalDate, isDateInRange } from "./date-utils";

// ============================================================================
// TYPY
// ============================================================================

export interface HolidayScheduleDay {
  date: string;
  hours: string | null;
  note: string | null;
}

export interface HolidaySchedule {
  active: boolean;
  title: string;
  validFrom: string;
  validTo: string;
  showSubstituteDoctor: boolean;
  substituteInfo?: {
    hours: string;
  };
  schedule: HolidayScheduleDay[];
}

// ============================================================================
// HOLIDAY SCHEDULE FUNCTIONS
// ============================================================================

/**
 * Vrátí celý holiday schedule pokud je aktivní
 */
export function getHolidaySchedule(): HolidaySchedule | null {
  const schedule = holidayScheduleData as HolidaySchedule;
  if (!schedule.active) return null;
  return schedule;
}

/**
 * Kontroluje zda je holiday schedule aktivní a jsme v rozsahu jeho platnosti
 * @param showEarly - pokud true, zobrazí schedule i před validFrom (pro upozornění dopředu)
 */
export function isHolidayScheduleActive(showEarly: boolean = false): boolean {
  const schedule = holidayScheduleData as HolidaySchedule;
  if (!schedule.active) return false;

  const today = getLocalDate();

  if (showEarly) {
    // Pouze kontrolujeme validTo
    if (schedule.validTo) {
      const validToDate = new Date(schedule.validTo);
      validToDate.setHours(23, 59, 59, 999);
      if (today > validToDate) return false;
    }
    return true;
  }

  return isDateInRange(today, schedule.validFrom, schedule.validTo);
}

/**
 * Vrátí záznam z holiday schedule pro konkrétní datum
 * @param date - datum pro které hledáme záznam
 */
export function getHolidayScheduleForDate(
  date: Date
): HolidayScheduleDay | null {
  const schedule = holidayScheduleData as HolidaySchedule;
  if (!schedule.active) return null;

  // Normalizujeme datum na YYYY-MM-DD formát (lokální čas, ne UTC)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;

  const dayEntry = schedule.schedule.find((entry) => entry.date === dateStr);
  return dayEntry || null;
}

/**
 * Formátuje datum pro zobrazení (např. "15.12. Po")
 */
export function formatHolidayDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const dayNames = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];
  const dayName = dayNames[date.getDay()];

  return `${day}.${month}. ${dayName}`;
}

/**
 * Vrátí všechny položky holiday schedule pro zobrazení v tabulce
 */
export function getHolidayScheduleItems(): Array<{
  dateFormatted: string;
  hours: string | null;
  note: string | null;
  isClosed: boolean;
}> {
  const schedule = holidayScheduleData as HolidaySchedule;
  if (!schedule.active) return [];

  return schedule.schedule.map((day) => ({
    dateFormatted: formatHolidayDate(day.date),
    hours: day.hours,
    note: day.note,
    isClosed: !day.hours,
  }));
}
