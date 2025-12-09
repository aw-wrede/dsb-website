import Localization from "../interfaces/Localization.tsx";

export function getBrowserLocalization() {
    const lang = navigator.language

    switch (lang.toLowerCase()) {
        case "de-de":
        case "de":
            return Localization.German
        case "en-us":
        default:
            return Localization.English
    }
}