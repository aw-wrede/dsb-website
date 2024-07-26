import TourneyMatch from "../../interfaces/tourney/TourneyMatch.ts";
import TourneyMap from "../../interfaces/tourney/TourneyMap.ts";
import Localization from "../../interfaces/Localization.tsx";
import {getMapNameLocalized} from "../../functions/mapFunctions.ts";
import {getTourneyModeNameLocalized} from "../../interfaces/tourney/TourneyModeType.ts";
import StyledIcon from "../../framework/StyledIcon.tsx";
import FrameworkIcon from "../../framework/FrameworkIcon.ts";

export default function MatchListElement({match, index, map, localization, allowEdit, onEdit}:{match:TourneyMatch, index:number, map:TourneyMap, localization:Localization, allowEdit:boolean, onEdit?:(match:TourneyMatch, index:number) => void}) {
    if(map == null) {
        return null
    }

    return <div className={`match ${allowEdit ? "editable" : ""}`}>
        <img className={"match-map-img"} src={map.image} alt=""/>
        <p className={"match-map-name"}>{getMapNameLocalized(map, localization)}</p>
        <p className={"match-mode"}>{getTourneyModeNameLocalized(match.modeType, localization)}</p>
        {allowEdit ?
            <div className={"edit-match-wrapper"}>
                <StyledIcon icon={FrameworkIcon.Settings} onClick={() => {
                    if(onEdit == null) return
                    onEdit(match, index)
                }} />
            </div>  : null}
    </div>
}