// Client-side script pro aktualizaci otevíracích hodin
// Veškerý "today" highlighting se dělá až tady v browseru

import { getTodayActualHours } from "../utils/openingHours";
import { getLocalDate } from "../utils/date-utils";

export function getCurrentDayOfWeek(): number {
  return getLocalDate().getDay(); // 0 = Neděle, 1 = Pondělí, ..., 6 = Sobota
}

function updateWeeklyScheduleHighlight(): void {
  const currentDay = getCurrentDayOfWeek();

  document.querySelectorAll<HTMLElement>("[data-day-of-week]").forEach((el) => {
    const day = parseInt(el.getAttribute("data-day-of-week") || "-2");
    const isToday =
      day === currentDay || (day === -1 && [0, 6].includes(currentDay));

    if (isToday) {
      // Přidáme today styling - border už je v HTML, jen změníme barvu
      el.classList.add("bg-primary-50", "!border-primary");

      const nameSpan = el.querySelector("[data-day-name]");
      if (nameSpan) {
        nameSpan.classList.remove("text-gray-900");
        nameSpan.classList.add("text-primary-700");
      }

      const badge = el.querySelector("[data-today-badge]");
      if (badge) {
        badge.classList.remove("hidden");
      }
    }
  });
}

export function updateOpeningHours(): void {
  if (typeof document === "undefined") return;

  const todayInfo = getTodayActualHours();

  // Aktualizujeme titulky "Dnes otevřeno" / "Dnes neordinujeme"
  document
    .querySelectorAll<HTMLElement>("[data-opening-title]")
    .forEach((el) => {
      el.textContent = todayInfo.title;
    });

  // Aktualizujeme hodiny
  document
    .querySelectorAll<HTMLElement>("[data-opening-hours]")
    .forEach((el) => {
      el.textContent = todayInfo.hours ?? "Zavřeno";
    });

  // Aktualizujeme datum (např. "pátek 15. listopadu 2025")
  document
    .querySelectorAll<HTMLElement>("[data-opening-date]")
    .forEach((el) => {
      const formatted = getLocalDate().toLocaleDateString("cs-CZ", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      el.textContent = formatted;
    });

  // Aktualizujeme weekly schedule highlighting
  updateWeeklyScheduleHighlight();
}
