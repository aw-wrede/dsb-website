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

export default function MatchList({matches, mapData, localization, setModalVisible, allowAdd, onAdd, allowEdit, onEdit}:{matches:TourneyMatch[], mapData:Record<TourneyMapType, TourneyMap>, localization:Localization, setModalVisible:(b:boolean) => void, allowAdd:boolean, onAdd?:() => void, allowEdit:boolean, onEdit?:(match: TourneyMatch, index:number) => void}) {

    function onEditClick(match:TourneyMatch, index:number){
        setModalVisible(true)
        if(onEdit != null) {
            onEdit(match, index)
        }
    }

    function onAddClick() {
        setModalVisible(true)
        if(onAdd != null) {
            onAdd()
        }
    }

    return <div className={"match-list"}>
        {matches.map((match, index) => (
            <MatchListElement key={index} match={match} index={index} map={getMapFromType(mapData, match.mapType)}  localization={localization} allowEdit={allowEdit} onEdit={onEditClick} />
        ))}
        {allowAdd ?
            <StyledButton type={"button"} onClick={onAddClick}>
                <StyledIcon icon={FrameworkIcon.Add} />
            </StyledButton> : null}
    </div>
}