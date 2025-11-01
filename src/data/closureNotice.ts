import type { SpecialNoticeClosureInfo } from "../utils/openingHours";

const specialNoticeClosure: SpecialNoticeClosureInfo = {
  introText: "Zastupuje nás",
  doctorName: "paní dr. Alena Lošťáková",
  addressLabel: "Optická ulice",
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Alena Lošťáková Optická, Přerov"
  )}`,
  phoneDisplay: "581 20 11 41",
  phoneHref: "tel:581201141",
  phoneNote: "Objednávejte se, prosím na tel. 581 20 11 41.",
};

export default specialNoticeClosure;
