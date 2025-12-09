import InputSelectElement from "../../framework/form/input/InputSelectElement.ts";
import Localization from "../Localization.tsx";

enum OverlayType {
    Static = 1,
    Dynamic = 2
}

function getOverlayTypeName(type:OverlayType, localization:Localization = Localization.German):string {
    switch (type) {
        case OverlayType.Static:
            switch (localization) {
                case Localization.German:
                    return "Statisch"
                default:
                    return "Static"
            }
        case OverlayType.Dynamic:
            switch (localization) {
                case Localization.German:
                    return "Dynamisch"
                default:
                    return "Dynamic"
            }
    }
}

export function overlayTypeToInputSelectElement(type:OverlayType, selected:boolean = false):InputSelectElement {
    return {
        id: type.toString(),
        value: type,
        display: getOverlayTypeName(type),
        selected: selected
    }
}

export function overlayTypesToSelectElements(defaultType:OverlayType|null = null):InputSelectElement[] {
    return [
        overlayTypeToInputSelectElement(OverlayType.Static, defaultType === OverlayType.Static),
        overlayTypeToInputSelectElement(OverlayType.Dynamic, defaultType === OverlayType.Dynamic)
    ]
}

export default OverlayType