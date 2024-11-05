import TourneyMatch from "../../../interfaces/tourney/TourneyMatch.ts";
import Localization from "../../../interfaces/Localization.tsx";
import TourneyMap from "../../../interfaces/tourney/TourneyMap.ts";

import "./liveMapViewComponent.sass"
import TourneyModeType from "../../../interfaces/tourney/TourneyModeType.ts";
import {getModeIcon} from "../../../functions/overlayFunctions.ts";

type Props = {
    match:TourneyMatch
    map:TourneyMap
    localization:Localization
}

export default function LiveMapViewComponent(props:Props) {
    return <div className={"live-match"}>
        <img className={"match-map-img"} src={props.map?.image} alt=""/>
        {props.match.modeType !== TourneyModeType.Unknown ? <img className={"match-map-mode"} src={getModeIcon(props.match.modeType)}/> : null}
    </div>
}