
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./en";
import { hi } from "./hi";

export const languages = ["en", "hi"] as const;
export type Language = (typeof languages)[number];

const saved = localStorage.getItem("lang");
const initial: Language = saved === "hi" ? "hi" : "en";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        hi: { translation: hi },
    },
    lng: initial,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

document.documentElement.lang = initial;

i18n.on("languageChanged", (lng) => {
    localStorage.setItem("lang", lng);
    document.documentElement.lang = lng;
});

export default i18n;
