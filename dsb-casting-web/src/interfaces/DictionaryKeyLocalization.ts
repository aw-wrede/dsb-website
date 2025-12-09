import Localization from "./Localization.tsx";

enum DictionaryKeyLocalization {
    English = "English",
    German = "German",
    Japanese = "Japanese",
    Dutch = "Dutch",
    French = "French",
    Italian = "Italian",
    Russian = "Russian",
    Spanish = "Spanish",
    Chinese = "Chinese",
    Korean = "Korean",
    Portuguese = "Portuguese"
}

export function localizationKeyToLocalization(key:DictionaryKeyLocalization):Localization {
    switch (key) {
        default:
        case DictionaryKeyLocalization.English:
            return Localization.English
        case DictionaryKeyLocalization.German:
            return Localization.German
        case DictionaryKeyLocalization.Japanese:
            return Localization.Japanese
        case DictionaryKeyLocalization.Dutch:
            return Localization.Dutch
        case DictionaryKeyLocalization.French:
            return Localization.French
        case DictionaryKeyLocalization.Italian:
            return Localization.Italian
        case DictionaryKeyLocalization.Russian:
            return Localization.Russian
        case DictionaryKeyLocalization.Spanish:
            return Localization.Spanish
        case DictionaryKeyLocalization.Chinese:
            return Localization.Chinese
        case DictionaryKeyLocalization.Korean:
            return Localization.Korean
        case DictionaryKeyLocalization.Portuguese:
            return Localization.Portuguese
    }
}

export default DictionaryKeyLocalization