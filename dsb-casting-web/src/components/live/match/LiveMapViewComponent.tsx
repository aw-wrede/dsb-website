import TourneyMatch from "../../../interfaces/tourney/TourneyMatch.ts";
import Localization from "../../../interfaces/Localization.tsx";
import TourneyMap from "../../../interfaces/tourney/TourneyMap.ts";

import "./liveMapViewComponent.sass"
import TourneyModeType from "../../../interfaces/tourney/TourneyModeType.ts";
import {getModeIcon} from "../../../functions/overlayFunctions.ts";
import TourneyTeamType from "../../../interfaces/tourney/team/TourneyTeamType.ts";
import BasicLogoVector from "../../BasicLogoVector.tsx";

type Props = {
    match:TourneyMatch
    map:TourneyMap
    localization:Localization
    winnerColor:string
}

export default function LiveMapViewComponent(props:Props) {
    return <div className={"live-match"} style={{
        "--winnerColor": props.winnerColor,
    }}>
        <img className={"match-map-img"} src={props.map?.image} alt=""/>

        {props.match.modeType !== TourneyModeType.Unknown ?
            <img className={"match-map-mode"} src={getModeIcon(props.match.modeType)}/> : null
        }

        {props.match.winnerTeam === TourneyTeamType.Alpha || props.match.winnerTeam === TourneyTeamType.Beta ?
            <BasicLogoVector className={"match-map-winner-deco"} fill={props.winnerColor} fillRule={"evenodd"} stroke={"none"} /> : null
        }
    </div>
}