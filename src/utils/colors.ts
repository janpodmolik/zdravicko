export type ColorName =
  | "blue"
  | "cyan"
  | "purple"
  | "pink"
  | "green"
  | "orange"
  | "red"
  | "yellow"
  | "indigo"
  | "teal";

export interface ColorClasses {
  bg: string;
  bgLight: string;
  text: string;
  border?: string;
  hoverBorder?: string;
  gradient?: string;
}

export const colorClasses: Record<ColorName, ColorClasses> = {
  blue: {
    bg: "bg-blue-600",
    bgLight: "bg-blue-50",
    border: "border-blue-100",
    hoverBorder: "hover:border-blue-500",
    text: "text-blue-600",
    gradient: "from-blue-50 via-cyan-50 to-blue-100",
  },
  cyan: {
    bg: "bg-cyan-600",
    bgLight: "bg-cyan-50",
    border: "border-cyan-100",
    hoverBorder: "hover:border-cyan-500",
    text: "text-cyan-600",
    gradient: "from-cyan-50 via-blue-50 to-cyan-100",
  },
  purple: {
    bg: "bg-purple-600",
    bgLight: "bg-purple-50",
    border: "border-purple-100",
    hoverBorder: "hover:border-purple-500",
    text: "text-purple-600",
    gradient: "from-purple-50 via-pink-50 to-purple-100",
  },
  pink: {
    bg: "bg-pink-600",
    bgLight: "bg-pink-50",
    border: "border-pink-100",
    hoverBorder: "hover:border-pink-500",
    text: "text-pink-600",
    gradient: "from-pink-50 via-purple-50 to-pink-100",
  },
  green: {
    bg: "bg-green-600",
    bgLight: "bg-green-50",
    border: "border-green-100",
    hoverBorder: "hover:border-green-500",
    text: "text-green-600",
    gradient: "from-green-50 via-emerald-50 to-green-100",
  },
  orange: {
    bg: "bg-orange-600",
    bgLight: "bg-orange-50",
    border: "border-orange-100",
    hoverBorder: "hover:border-orange-500",
    text: "text-orange-600",
    gradient: "from-orange-50 via-amber-50 to-orange-100",
  },
  red: {
    bg: "bg-red-600",
    bgLight: "bg-red-50",
    border: "border-red-100",
    hoverBorder: "hover:border-red-500",
    text: "text-red-600",
    gradient: "from-red-50 via-rose-50 to-red-100",
  },
  yellow: {
    bg: "bg-yellow-600",
    bgLight: "bg-yellow-50",
    border: "border-yellow-100",
    hoverBorder: "hover:border-yellow-500",
    text: "text-yellow-600",
    gradient: "from-yellow-50 via-amber-50 to-yellow-100",
  },
  indigo: {
    bg: "bg-indigo-600",
    bgLight: "bg-indigo-50",
    border: "border-indigo-100",
    hoverBorder: "hover:border-indigo-500",
    text: "text-indigo-600",
    gradient: "from-indigo-50 via-blue-50 to-indigo-100",
  },
  teal: {
    bg: "bg-teal-600",
    bgLight: "bg-teal-50",
    border: "border-teal-100",
    hoverBorder: "hover:border-teal-500",
    text: "text-teal-600",
    gradient: "from-teal-50 via-cyan-50 to-teal-100",
  },
};
