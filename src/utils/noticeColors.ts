export type NoticeType = "warning" | "info" | "urgent";

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
      bg: "bg-blue-50",
      border: "border-blue-300",
      icon: "bg-blue-600",
      text: "text-blue-700",
      badge: "bg-blue-100 text-blue-800",
      description: "text-blue-600",
      infoBanner: "bg-blue-100",
      infoBannerBorder: "border-blue-500",
    };
  }
}
