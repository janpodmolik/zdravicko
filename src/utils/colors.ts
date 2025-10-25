export type ColorName = 'blue' | 'cyan' | 'purple' | 'pink';

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
    bg: 'bg-blue-600',
    bgLight: 'bg-blue-50',
    border: 'border-blue-100',
    hoverBorder: 'hover:border-blue-500',
    text: 'text-blue-600',
    gradient: 'from-blue-50 via-cyan-50 to-blue-100'
  },
  cyan: {
    bg: 'bg-cyan-600',
    bgLight: 'bg-cyan-50',
    border: 'border-cyan-100',
    hoverBorder: 'hover:border-cyan-500',
    text: 'text-cyan-600',
    gradient: 'from-cyan-50 via-blue-50 to-cyan-100'
  },
  purple: {
    bg: 'bg-purple-600',
    bgLight: 'bg-purple-50',
    border: 'border-purple-100',
    hoverBorder: 'hover:border-purple-500',
    text: 'text-purple-600',
    gradient: 'from-purple-50 via-pink-50 to-purple-100'
  },
  pink: {
    bg: 'bg-pink-600',
    bgLight: 'bg-pink-50',
    border: 'border-pink-100',
    hoverBorder: 'hover:border-pink-500',
    text: 'text-pink-600',
    gradient: 'from-pink-50 via-purple-50 to-pink-100'
  }
};
