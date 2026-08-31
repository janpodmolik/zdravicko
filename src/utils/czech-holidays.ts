// ============================================================================
// ČESKÉ STÁTNÍ SVÁTKY
// ============================================================================
// Svátky se počítají přímo v kódu - pevná data + pohyblivé Velikonoce
// (Butcherův algoritmus). Není potřeba žádné externí API ani ruční údržba.

/**
 * Vypočítá datum Velikonoční neděle pro daný rok (Butcherův algoritmus).
 * Platí pro gregoriánský kalendář.
 */
function getEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = březen, 4 = duben
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

/** Pevné státní svátky ve formátu "M-D" -> název */
const FIXED_HOLIDAYS: Record<string, string> = {
  "1-1": "Nový rok",
  "5-1": "Svátek práce",
  "5-8": "Den vítězství",
  "7-5": "Den slovanských věrozvěstů Cyrila a Metoděje",
  "7-6": "Den upálení mistra Jana Husa",
  "9-28": "Den české státnosti",
  "10-28": "Den vzniku samostatného československého státu",
  "11-17": "Den boje za svobodu a demokracii",
  "12-24": "Štědrý den",
  "12-25": "1. svátek vánoční",
  "12-26": "2. svátek vánoční",
};

/** Porovnání dvou dat podle dne (ignoruje čas) */
function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Vrátí název českého státního svátku pro dané datum, nebo null.
 */
export function getCzechHolidayName(date: Date): string | null {
  const fixedKey = `${date.getMonth() + 1}-${date.getDate()}`;
  const fixed = FIXED_HOLIDAYS[fixedKey];
  if (fixed) return fixed;

  // Pohyblivé svátky odvozené od Velikonoční neděle
  const easterSunday = getEasterSunday(date.getFullYear());

  const goodFriday = new Date(easterSunday);
  goodFriday.setDate(easterSunday.getDate() - 2);
  if (isSameDay(date, goodFriday)) return "Velký pátek";

  const easterMonday = new Date(easterSunday);
  easterMonday.setDate(easterSunday.getDate() + 1);
  if (isSameDay(date, easterMonday)) return "Velikonoční pondělí";

  return null;
}

/**
 * Zkontroluje, jestli je dané datum český státní svátek.
 */
export function isCzechHoliday(date: Date): boolean {
  return getCzechHolidayName(date) !== null;
}
