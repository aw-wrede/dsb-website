import InputSelectElement from "../framework/form/input/InputSelectElement.ts";

enum Localization {
    English = 1,
    German = 2,
    Japanese = 3,
    Dutch = 4,
    French = 5,
    Italian = 6,
    Russian = 7,
    Spanish = 8,
    Chinese = 9,
    Korean = 10,
    Portuguese = 11
}

function getLocalizationLocalized(localization:Localization):string {
    switch (localization) {
        case Localization.English:
            return "English"
        case Localization.German:
            return "Deutsch"
        case Localization.Japanese:
            return "日本の"
        case Localization.Dutch:
            return "Nederlands"
        case Localization.French:
            return "Français"
        case Localization.Italian:
            return "Italiano"
        case Localization.Russian:
            return "Русский"
        case Localization.Spanish:
            return "Español"
        case Localization.Chinese:
            return "中国人"
        case Localization.Korean:
            return "한국인"
        case Localization.Portuguese:
            return "Português"
        default:
            return "Unknown language"
    }
}

export function getMeaningfulLocalizations():Localization[] {
    return [
        Localization.German,
        Localization.English,
    ]
}

export function getLocalizationsNativeLocalized(list:Localization[] = getAllLocalizations()):Record<Localization, string> {
    const data = {} as Record<Localization, string>

    list.forEach((localization) => {
        data[localization] = getLocalizationLocalized(localization)
    })

    return data
}

export function getAllLocalizations():Localization[] {
    return [
        Localization.English,
        Localization.German,
        Localization.Japanese,
        Localization.Dutch,
        Localization.French,
        Localization.Italian,
        Localization.Russian,
        Localization.Spanish,
        Localization.Chinese,
        Localization.Korean,
        Localization.Portuguese
    ]
}

export function localizationsToSelectElements(defaultType:Localization = Localization.German, list:Localization[] = getAllLocalizations()):InputSelectElement[] {
    const elems:InputSelectElement[] = []

    const data = getLocalizationsNativeLocalized(list)
    for (const key in data) {
        const localization = parseInt(key) as Localization
        elems.push({
            id: key,
            value: localization,
            selected: localization === defaultType,
            display: data[key]
        })
    }

    return elems
}

export default Localization