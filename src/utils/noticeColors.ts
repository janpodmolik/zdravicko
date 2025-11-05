import type { NoticeType } from "./openingHours";

export interface NoticeColorScheme {
  bg: string;
  border: string;
  icon: string;
  text: string;
  badge: string;
  description: string;
  infoBanner: string; // Pro informační box v hero
  infoBannerBorder: string;
}

export interface SpecialNoticeVisualConfig {
  gradient: string;
  border: string;
  iconGradient: string;
  iconName: string;
  badgeBg: string;
  badgeText: string;
}

/**
 * Vrací kompletní barevné schéma pro daný typ oznámení
 * Používá se hlavně pro QuickInfo komponentu a hero sekce
 */
export function getNoticeColors(type?: NoticeType): NoticeColorScheme {
  if (!type || type === "warning") {
    return {
      bg: "bg-amber-50",
      border: "border-amber-300",
      icon: "bg-amber-600",
      text: "text-amber-700",
      badge: "bg-amber-100 text-amber-800",
      description: "text-amber-600",
      infoBanner: "bg-amber-100",
      infoBannerBorder: "border-amber-500",
    };
  } else if (type === "urgent") {
    return {
      bg: "bg-red-50",
      border: "border-red-300",
      icon: "bg-red-600",
      text: "text-red-700",
      badge: "bg-red-100 text-red-800",
      description: "text-red-600",
      infoBanner: "bg-red-100",
      infoBannerBorder: "border-red-500",
    };
  } else {
    // info
    return {
      bg: "bg-[#5085c6]/5",
      border: "border-[#5085c6]/30",
      icon: "bg-[#5085c6]",
      text: "text-[#5085c6]",
      badge: "bg-[#5085c6]/10 text-[#5085c6]",
      description: "text-[#5085c6]",
      infoBanner: "bg-[#5085c6]/10",
      infoBannerBorder: "border-[#5085c6]",
    };
  }
}

export function getSpecialNoticeVisualConfig(
  type?: NoticeType
): SpecialNoticeVisualConfig {
  if (!type || type === "warning") {
    return {
      gradient: "from-amber-50 to-orange-50",
      border: "border-amber-300",
      iconGradient: "from-amber-500 to-orange-500",
      iconName: "mdi:alert-circle",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-700",
    };
  }

  if (type === "urgent") {
    return {
      gradient: "from-red-50 to-pink-50",
      border: "border-red-300",
      iconGradient: "from-red-500 to-pink-500",
      iconName: "mdi:alert-octagon",
      badgeBg: "bg-red-50",
      badgeText: "text-red-700",
    };
  }

  return {
    gradient: "from-[#5085c6]/5 to-cyan-50",
    border: "border-[#5085c6]/30",
    iconGradient: "from-[#5085c6] to-cyan-500",
    iconName: "mdi:information",
    badgeBg: "bg-[#5085c6]/5",
    badgeText: "text-[#5085c6]",
  };
}
