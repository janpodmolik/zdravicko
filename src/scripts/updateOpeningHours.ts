// Client-side script pro aktualizaci otevíracích hodin
// Veškerý "today" highlighting se dělá až tady v browseru

import {
  getTodayActualHours,
  getSpecialNoticeDisplay,
} from "../utils/openingHours";
import { getLocalDate } from "../utils/date-utils";
import { getNoticeColors } from "../utils/noticeColors";
import { updateTextContent } from "../utils/dom-helpers";
import {
  updateTodayHoursCardUI,
  updateQuickInfoCardUI,
  updateWeeklyScheduleUI,
} from "../utils/ui-updaters";

export function getCurrentDayOfWeek(): number {
  return getLocalDate().getDay(); // 0 = Neděle, 1 = Pondělí, ..., 6 = Sobota
}

export function updateOpeningHours(): void {
  if (typeof document === "undefined") return;

  const todayInfo = getTodayActualHours();
  const colors =
    todayInfo.isModified && todayInfo.noticeType
      ? getNoticeColors(todayInfo.noticeType)
      : null;

  // Aktualizujeme textový obsah (title, hours, date)
  updateTextContent("[data-opening-title]", todayInfo.title);
  updateTextContent("[data-opening-hours]", todayInfo.hours ?? "Zavřeno");

  const formattedDate = getLocalDate().toLocaleDateString("cs-CZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  updateTextContent("[data-opening-date]", formattedDate);

  // Update komponent pomocí dedikovaných updaterů
  updateTodayHoursCardUI(todayInfo, colors);
  updateQuickInfoCardUI(todayInfo, colors);
  updateWeeklyScheduleUI(getCurrentDayOfWeek(), getLocalDate());
}

