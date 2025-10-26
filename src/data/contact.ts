/**
 * Centrální kontaktní informace
 * Použití: import { contactInfo } from '@/data/contact'
 */

export const contactInfo = {
  phones: {
    doctor: {
      number: "+420731232333",
      display: "+420 731 232 333",
      label: "Doktorka",
    },
    nurse: {
      number: "+420603290939",
      display: "+420 603 290 939",
      label: "Sestřička",
    },
  },
  email: "doktorka.jana@zdravicko.org",
  address: {
    street: "Svisle 2/785",
    city: "Přerov",
    zip: "750 02",
    full: "Svisle 2/785, 750 02 Přerov",
  },
} as const;
