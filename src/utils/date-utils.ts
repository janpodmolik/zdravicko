// ============================================================================
// DATE UTILITIES
// ============================================================================

const PRAGUE_TIMEZONE = "Europe/Prague";

/**
 * Vrací aktuální datum a čas v lokální časové zóně (Europe/Prague)
 * Používá se pro zajištění správného dne v týdnu bez ohledu na časovou zónu serveru
 */
export function getLocalDate(): Date {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: PRAGUE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "shortOffset",
  });

  const parts = formatter.formatToParts(now);
  const partValue = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "00";

  const isoDate = `${partValue("year")}-${partValue("month")}-${partValue(
    "day"
  )}T${partValue("hour")}:${partValue("minute")}:${partValue(
    "second"
  )}${normalizeTimeZoneOffset(partValue("timeZoneName"))}`;

  return new Date(isoDate);
}

/**
 * Normalizuje časovou zónu do ISO formátu (+HH:mm)
 */
export function normalizeTimeZoneOffset(label?: string): string {
  if (!label) return "+00:00";
  const match = label.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/i);
  if (!match) return "+00:00";
  const sign = match[1].startsWith("-") ? "-" : "+";
  const hours = match[1].replace(/^[+-]/, "").padStart(2, "0");
  const minutes = (match[2] ?? "00").padStart(2, "0");
  return `${sign}${hours}:${minutes}`;
}

/**
 * Zkontroluje, jestli datum spadá do daného rozsahu (validFrom - validTo)
 * @param date - datum k testování
 * @param fromStr - datum začátku rozsahu (volitelné)
 * @param toStr - datum konce rozsahu (volitelné)
 */
export function isDateInRange(
  date: Date,
  fromStr?: string,
  toStr?: string
): boolean {
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
 * Vrátí datum pro konkrétní den v týdnu (např. příští pátek)
 * @param dayOfWeek - Den v týdnu (0 = neděle, 1 = pondělí, atd.)
 * @param weekOffset - Posun týdne (0 = tento týden, 1 = příští týden, -1 = minulý týden)
 * @param referenceDate - Referenční datum (výchozí = dnes)
 */
export function getDateForDayInWeek(
  dayOfWeek: number,
  weekOffset: number = 0,
  referenceDate: Date = getLocalDate()
): Date {
  const currentDay = referenceDate.getDay();

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
 * Vrátí datum ve formátu DD.MM. (např. "17.11.")
 * @param targetDate - Datum k naformátování
 */
export function formatShortDate(targetDate: Date): string {
  const day = targetDate.getDate();
  const month = targetDate.getMonth() + 1;

  return `${day}.${month}.`;
}
