import Localization from "../../interfaces/Localization.tsx";

enum TeamCreateResult {
    Success = 0,
    InternalError = 1,
    AlreadyExists = 2,
}

export function getTeamCreateResultMessage(result:TeamCreateResult, localization:Localization):string {
    switch (result) {
        case TeamCreateResult.Success:
            switch (localization) {
                case Localization.German:
                    return "Team erfolgreich erstellt."
                case Localization.English:
                default:
                    return "Team created successfully."
            }
        case TeamCreateResult.AlreadyExists:
            switch (localization) {
                case Localization.German:
                    return "Team mit gleichem Namen existiert bereits."
                case Localization.English:
                default:
                    return "Team with equal name already exists."
            }
        case TeamCreateResult.InternalError:
        default:
            switch (localization) {
                case Localization.German:
                    return "Fehler beim Erstellen des Teams."
                case Localization.English:
                default:
                    return "An error while creating team occurred."
            }
    }
}

export default TeamCreateResult