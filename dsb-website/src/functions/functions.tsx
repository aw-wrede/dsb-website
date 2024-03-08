import {Localization} from "../interfaces/StaffData";
import {
    BASE_TITLE,
    SITE_ARCHIVE_URL, SITE_CALENDAR_URL,
    SITE_HOME_URL,
    SITE_IMPRINT_URL,
    SITE_PRIVACY_URL,
    SITE_SEASON_URL,
    SITE_TEAM_URL
} from "../definitions/vars";

export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}

export function getSiteName(url:string, locale:Localization = Localization.German):string {
    switch (locale) {
        default:
            switch (url) {
                case SITE_HOME_URL: return "Home"
                case SITE_TEAM_URL: return "Team"
                case SITE_SEASON_URL: return "Aktuelle Season"
                case SITE_ARCHIVE_URL: return "Turnier-Archiv"
                case SITE_CALENDAR_URL: return "Event-Kalender"
                case SITE_IMPRINT_URL: return "Impressum"
                case SITE_PRIVACY_URL: return "Datenschutz"
                default: return ""
            }
    }
}

export function getSiteTitle(url:string, locale:Localization = Localization.German) {

    const title = `${BASE_TITLE} - `

    switch (locale) {
        default:
            switch (url) {
                case SITE_TEAM_URL: return `${title}Team`
                case SITE_SEASON_URL: return `${title}Aktuelle Season`
                case SITE_ARCHIVE_URL: return `${title}Turnier-Archiv`
                case SITE_CALENDAR_URL: return `${title}Event-Kalender`
                case SITE_IMPRINT_URL: return `${title}Impressum`
                case SITE_PRIVACY_URL: return `${title}Datenschutz`

                case SITE_HOME_URL:
                default: return "Deutsche Splat Bundesliga e.V."
            }
    }
}