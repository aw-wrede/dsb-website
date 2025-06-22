import TourneyMatch from "../../interfaces/tourney/TourneyMatch.ts";
import TourneyMap from "../../interfaces/tourney/TourneyMap.ts";
import {getMapFromType} from "../../functions/mapFunctions.ts";
import Localization from "../../interfaces/Localization.tsx";
import TourneyMapType from "../../interfaces/tourney/TourneyMapType.ts";
import StyledButton from "../../framework/form/button/StyledButton.tsx";
import StyledIcon from "../../framework/StyledIcon.tsx";
import FrameworkIcon from "../../framework/FrameworkIcon.ts";
import MatchListElement from "./MatchListElement.tsx";

import "./matchList.sass"

type Props = {
    matches: TourneyMatch[]
    mapData: Record<TourneyMapType, TourneyMap>
    localization: Localization
    setModalVisible:(b:boolean) => void
    allowAdd: boolean
    onAdd: () => void
    allowEdit: boolean
    onEdit?: (match: TourneyMatch, index:number) => void
}

export default function MatchList(props:Props) {

    function onEditClick(match:TourneyMatch, index:number){
        props.setModalVisible(true)
        if(props.onEdit != null) {
            props.onEdit(match, index)
        }
    }

    function onAddClick() {
        props.setModalVisible(true)
        if(props.onAdd != null) {
            props.onAdd()
        }
    }

    return <div className={"match-list"}>
        {props.matches.map((match, index) => (
            <MatchListElement key={index} match={match} index={index} map={getMapFromType(props.mapData, match.mapType)}  localization={props.localization} allowEdit={props.allowEdit} onEdit={onEditClick} />
        ))}
        {props.allowAdd ?
            <StyledButton type={"button"} onClick={onAddClick}>
                <StyledIcon icon={FrameworkIcon.Add} />
            </StyledButton> : null}
    </div>
}