/**
 * UI Updaters pro special notice komponenty
 * Každá funkce aktualizuje konkrétní komponentu na základě current date a special notices
 */

import type { OpeningHoursInfo } from "./openingHours";
import type { NoticeColorScheme } from "./noticeColors";
import { getDateForDayInWeek, isDateInRange } from "./date-utils";
import { resolveNoticeOutcome } from "./notice-resolver";
import {
  applyConditionalClasses,
  toggleIcons,
  toggleVisibility,
  updateElementWithDefaults,
} from "./dom-helpers";

/**
 * Update TodayHoursCard komponentu (na stránce ordinacni-hodiny)
 */
export function updateTodayHoursCardUI(
  todayInfo: OpeningHoursInfo,
  colors: NoticeColorScheme | null
): void {
  // Update card background and border
  updateElementWithDefaults(
    "[data-opening-today-card]",
    "rounded-2xl shadow-lg p-8 border-2",
    colors ? `${colors.bg} ${colors.border}` : null,
    "bg-white border-[#5085c6]/30"
  );

  // Update icon styling
  const iconEl = document.querySelector<HTMLElement>(
    "[data-opening-node='today-icon']"
  );
  if (iconEl) {
    updateElementWithDefaults(
      "[data-opening-node='today-icon']",
      "w-12 h-12 rounded-full flex items-center justify-center relative",
      colors?.icon || null,
      "bg-[#5085c6]"
    );

    toggleIcons(iconEl, todayInfo.isModified || false);
  }

  // Update hours text color
  updateElementWithDefaults(
    "[data-opening-node='today-hours']",
    "text-3xl font-bold mb-2",
    colors?.text || null,
    "text-primary"
  );

  // Update notice visibility and styling
  const noticeEl = document.querySelector<HTMLElement>(
    "[data-opening-node='today-notice']"
  );
  if (noticeEl) {
    const shouldShow = todayInfo.isModified && todayInfo.notice;

    if (shouldShow && colors) {
      toggleVisibility(noticeEl, true);

      // Update notice background/border
      const bannerClasses = (colors.infoBanner || "").split(" ");
      const borderClasses = (colors.infoBannerBorder || "").split(" ");

      noticeEl.className = "mt-4 p-4 border-l-4 rounded";
      noticeEl.classList.add(...bannerClasses, ...borderClasses);

      // Update notice text content
      const noticeTextEl = noticeEl.querySelector<HTMLElement>(
        "[data-opening-notice-text]"
      );
      if (noticeTextEl) {
        noticeTextEl.textContent = todayInfo.notice || "";
      }

      // Update text color
      const noticeTextContainerEl = noticeEl.querySelector<HTMLElement>(
        "[data-opening-node='today-notice-text']"
      );
      if (noticeTextContainerEl) {
        const textClasses = (colors.description || "").split(" ");
        noticeTextContainerEl.className = "text-sm font-medium";
        noticeTextContainerEl.classList.add(...textClasses);
      }
    } else {
      toggleVisibility(noticeEl, false);
    }
  }
}

/**
 * Update QuickInfo komponentu (na homepage)
 */
export function updateQuickInfoCardUI(
  todayInfo: OpeningHoursInfo,
  colors: NoticeColorScheme | null
): void {
  // Update quick info card container
  const quickCardEl = document.querySelector<HTMLElement>(
    "[data-opening-quick-card]"
  );
  if (quickCardEl) {
    const baseClasses =
      "flex items-center gap-3 p-4 bg-white rounded-xl border-2 transition-all hover:shadow-lg h-full";
    const defaultClasses =
      quickCardEl.getAttribute("data-opening-default-classes") || "";

    applyConditionalClasses(
      quickCardEl,
      baseClasses,
      colors ? `${colors.border} ${colors.bg}` : null,
      defaultClasses
    );
  }

  // Update quick info icon
  const quickIconEl = document.querySelector<HTMLElement>(
    "[data-opening-node='quick-icon']"
  );
  if (quickIconEl) {
    const baseClasses =
      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 relative group-hover:scale-110 transition-transform";
    const defaultClasses =
      quickIconEl.getAttribute("data-opening-default-classes") || "";

    applyConditionalClasses(
      quickIconEl,
      baseClasses,
      colors?.icon || null,
      defaultClasses
    );

    toggleIcons(quickIconEl, todayInfo.isModified || false);
  }

  // Update quick info hours text color
  const quickHoursEl = document.querySelector<HTMLElement>(
    "[data-opening-node='quick-hours']"
  );
  if (quickHoursEl) {
    const baseClasses = "text-xs font-medium";
    const defaultClasses =
      quickHoursEl.getAttribute("data-opening-default-classes") || "";

    applyConditionalClasses(
      quickHoursEl,
      baseClasses,
      colors ? `${colors.text} font-bold` : null,
      defaultClasses
    );
  }
}

/**
 * Update WeeklySchedule highlighting (dnes + odstranění starých badges + reset hodin pro minulé dny)
 */
export function updateWeeklyScheduleUI(currentDay: number, today: Date): void {
  document.querySelectorAll<HTMLElement>("[data-day-of-week]").forEach((el) => {
    const day = parseInt(el.getAttribute("data-day-of-week") || "-2");
    const isToday =
      day === currentDay || (day === -1 && [0, 6].includes(currentDay));
    const regularHours = el.getAttribute("data-regular-hours") || "Zavřeno";

    // Získáme datum pro tento den v týdnu
    const dayDate = day >= 0 ? getDateForDayInWeek(day, 0, today) : null;
    const isPastDay = dayDate ? dayDate < today && !isToday : false;

    // Elementy pro update
    const actualHoursEl = el.querySelector<HTMLElement>("[data-actual-hours]");
    const noticeBadge = el.querySelector<HTMLElement>("[data-notice-badge]");
    const strikethroughEl = el.querySelector<HTMLElement>("[data-regular-hours-strikethrough]");
    const isModified = actualHoursEl?.getAttribute("data-is-modified") === "true";

    // Pokud je den v minulosti a měl special notice, resetujeme na regular hours
    if (isPastDay && isModified && dayDate) {
      // Zkontroluj jestli special notice ještě platí pro tento den
      const resolution = resolveNoticeOutcome(dayDate, regularHours === "Zavřeno" ? null : regularHours, false);
      
      if (!resolution.isModified) {
        // Notice už neplatí - resetuj na regular hours
        if (actualHoursEl) {
          actualHoursEl.textContent = regularHours;
          actualHoursEl.className = "font-medium text-gray-600";
          actualHoursEl.setAttribute("data-is-modified", "false");
        }
        
        // Skryj notice badge
        if (noticeBadge) {
          noticeBadge.classList.add("hidden");
        }
        
        // Skryj přeškrtnuté regular hours
        if (strikethroughEl) {
          strikethroughEl.classList.add("hidden");
        }
      }
    }

    // Today styling
    if (isToday) {
      // Přidáme today styling
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

    // Odstraň date badge pokud už datum proběhlo (fallback pro staré badges bez data-notice-badge)
    const noticeBadges = el.querySelectorAll(
      "span.text-xs.px-2.py-1.rounded-full:not([data-today-badge])"
    );
    noticeBadges.forEach((badge) => {
      const badgeText = badge.textContent?.trim();
      if (badgeText && badgeText.match(/^\d{1,2}\.\d{1,2}\.$/)) {
        // Je to datum formátu "17.11."
        const [dayStr, monthStr] = badgeText.split(".");
        const badgeDay = parseInt(dayStr);
        const badgeMonth = parseInt(monthStr);

        // Porovnej s dnešním datem
        if (
          badgeMonth < today.getMonth() + 1 ||
          (badgeMonth === today.getMonth() + 1 && badgeDay < today.getDate())
        ) {
          // Datum je v minulosti - skryj badge
          badge.classList.add("hidden");
        }
      }
    });
  });
}

/**
 * Update SpecialNotice banner visibility based on current date
 * Komponenta je defaultně skrytá a zobrazí se pouze pokud je notice aktuálně platná
 */
export function updateSpecialNoticeBannerUI(today: Date): void {
  const banner = document.getElementById("special-notice-banner");
  if (!banner) return;

  const validFrom = banner.getAttribute("data-valid-from");
  const validTo = banner.getAttribute("data-valid-to");

  // Zkontroluj jestli je dnešní datum v rozsahu platnosti
  const isValid = isDateInRange(today, validFrom || undefined, validTo || undefined);

  if (isValid) {
    banner.classList.remove("hidden");
  } else {
    banner.classList.add("hidden");
  }
}
