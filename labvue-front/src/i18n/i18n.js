import { createI18n } from "vue-i18n";
import zh from "./zh.json";
import en from "./en.json";
import de from "./de.json";

export default createI18n({
    legacy: false,
    locale: "zh",
    fallbackLocale: "en",
    messages: {
        en,
        zh,
        de
    }
});
