import Localization from "../../interfaces/Localization.tsx";

enum FileUploadResult {
    Success = 0,
    Failure = 1
}

export default FileUploadResult

export function getFileUploadResultMessage(result: FileUploadResult, localization:Localization): string {
    switch (result) {
        case FileUploadResult.Success:
            switch (localization) {
                case Localization.German:
                    return "Upload erfolgreich."
                case Localization.English:
                default:
                    return "Upload successfully."
            }
        case FileUploadResult.Failure:
            switch (localization) {
                case Localization.German:
                    return "Upload fehlgeschlagen."
                case Localization.English:
                default:
                    return "Upload failed."
            }
    }
}