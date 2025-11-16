// ============================================================================
// TIME FORMATTING UTILITIES
// ============================================================================

const HOURS_SEPARATOR = "-";

/**
 * Normalizuje časovou hodnotu do formátu H:MM nebo HH:MM
 * @param time - Čas ve formátu "H:mm" nebo "HH:mm"
 * @returns Normalizovaný čas (např. "7:30", "16:00")
 */
export function normalizeTimeValue(time: string): string {
  const [hours = "0", minutes = "0"] = time.trim().split(":");
  const normalizedHours = hours.trim();
  const normalizedMinutes = minutes.trim();
  const parsedHours = Number.parseInt(normalizedHours, 10);
  const minutePart = normalizedMinutes.padStart(2, "0");

  return `${
    Number.isNaN(parsedHours) ? normalizedHours : parsedHours
  }:${minutePart}`;
}

/**
 * Vytvoří časové rozpětí ve formátu "HH:MM - HH:MM"
 * @param hoursFrom - Čas začátku (např. "7:30")
 * @param hoursTo - Čas konce (např. "16:00")
 * @returns Časové rozpětí (např. "7:30 - 16:00")
 */
export function buildHoursRange(hoursFrom: string, hoursTo: string): string {
  return `${normalizeTimeValue(
    hoursFrom
  )} ${HOURS_SEPARATOR} ${normalizeTimeValue(hoursTo)}`;
}

/**
 * Zkombinuje hoursFrom a hoursTo do standardního formátu "HH:MM - HH:MM"
 * @param hoursFrom - Čas začátku (volitelný)
 * @param hoursTo - Čas konce (volitelný)
 * @returns Časové rozpětí nebo null pokud chybí některý údaj
 */
export function formatHoursRange(
  hoursFrom?: string,
  hoursTo?: string
): string | null {
  if (!hoursFrom || !hoursTo) return null;
  return buildHoursRange(hoursFrom, hoursTo);
}

/**
 * Normalizuje časové rozpětí pro porovnávání (ignoruje rozdíly ve formátování)
 * @param range - Časové rozpětí (např. "7:30 - 16:00" nebo "07:30-16:00")
 * @returns Normalizované rozpětí
 */
export function normalizeHoursRangeValue(range: string | null): string | null {
  if (!range) return null;

  const [fromRaw, toRaw] = range
    .split(HOURS_SEPARATOR)
    .map((part) => part.trim());
  if (!fromRaw || !toRaw) {
    return range.trim();
  }

  return buildHoursRange(fromRaw, toRaw);
}

/**
 * Porovná dvě časová rozpětí a vrátí true, pokud jsou stejné
 * Ignoruje rozdíly ve formátování (7:30 vs 07:30)
 * @param hours1 - První časové rozpětí
 * @param hours2 - Druhé časové rozpětí
 * @returns True pokud jsou hodiny stejné
 */
export function areHoursEqual(
  hours1: string | null,
  hours2: string | null
): boolean {
  return normalizeHoursRangeValue(hours1) === normalizeHoursRangeValue(hours2);
}
