import TourneyMatch from "../../interfaces/tourney/TourneyMatch.ts";
import TourneyMap from "../../interfaces/tourney/TourneyMap.ts";
import Localization from "../../interfaces/Localization.tsx";
import {getMapNameLocalized, getUnknownMap} from "../../functions/mapFunctions.ts";
import {getTourneyModeNameLocalized} from "../../interfaces/tourney/TourneyModeType.ts";
import StyledIcon from "../../framework/StyledIcon.tsx";
import FrameworkIcon from "../../framework/FrameworkIcon.ts";

type Props = {
    match: TourneyMatch
    index: number
    map: TourneyMap
    localization: Localization
    allowEdit: boolean
    onEdit?: (match:TourneyMatch, index:number) => void
}

export default function MatchListElement(props:Props) {

    const placeholderMap = getUnknownMap()

    return <div className={`match ${props.allowEdit ? "editable" : ""}`}>
        <img className={"match-map-img"} src={props.map?.image ?? placeholderMap.image} alt=""/>
        <p className={"match-map-name"}>{getMapNameLocalized(props.map, props.localization)}</p>
        <p className={"match-mode"}>{getTourneyModeNameLocalized(props.match.modeType, props.localization)}</p>
        {props.allowEdit ?
            <div className={"edit-match-wrapper"}>
                <StyledIcon icon={FrameworkIcon.Settings} onClick={() => {
                    if(props.onEdit == null) return
                    props.onEdit(props.match, props.index)
                }} />
            </div>  : null}
    </div>
}