import StyledForm from "../../framework/form/StyledForm.tsx";
import StyledFormHeader from "../../framework/form/header/StyledFormHeader.tsx";
import SearchDropdown from "../../framework/form/input/search/SearchDropdown.tsx";
import {useEffect, useState} from "react";
import TourneyMapType from "../../interfaces/tourney/TourneyMapType.ts";
import TourneyMatch from "../../interfaces/tourney/TourneyMatch.ts";
import TourneyMap from "../../interfaces/tourney/TourneyMap.ts";
import TourneyGameVersion from "../../interfaces/tourney/TourneyGameVersion.ts";
import SearchElement from "../../framework/form/input/search/SearchElement.ts";
import {getMapFromType, getMapNameLocalized} from "../../functions/mapFunctions.ts";
import Localization from "../../interfaces/Localization.tsx";
import StyledModal from "../../framework/StyledModal.tsx";

import "./matchCreateModal.sass"
import StyledInputRadio from "../../framework/form/input/StyledInputRadio.tsx";
import TourneyModeType, {
    getAllTourneyModes,
    getTourneyModeNameLocalized
} from "../../interfaces/tourney/TourneyModeType.ts";
import InputSelectElement from "../../framework/form/input/InputSelectElement.ts";
import StyledButton from "../../framework/form/button/StyledButton.tsx";
import TourneyTeam from "../../interfaces/tourney/team/TourneyTeam.ts";
import TourneyTeamType from "../../interfaces/tourney/team/TourneyTeamType.ts";

type Props = {
    visible: boolean
    setVisible: (visible:boolean) => void
    gameVersion: TourneyGameVersion
    match: TourneyMatch
    setMatch: (match:TourneyMatch, index:number|null) => void
    index: number|null
    mapData: Record<TourneyMapType, TourneyMap>
    teams?:TourneyTeam[]
    localization: Localization
}

export default function MatchCreateModal(props: Props) {

    const [mapSearchInput, setMapSearchInput] = useState("")

    const [mapType, setMapType] = useState<TourneyMapType>(props.match.mapType)
    const [modeType, setModeType] = useState<TourneyModeType>(props.match.modeType)
    const [winnerTeam, setWinnerTeam] = useState<TourneyTeamType>(props.match.winnerTeam)

    const [searchElems, setSearchElems] = useState<SearchElement[]>([])
    const [modeElems, setModeElems] = useState<InputSelectElement[]>([])
    const [teamElems, setTeamElems] = useState<InputSelectElement[]>([])

    useEffect(() => {
        setMapType(props.match.mapType)
        setModeType(props.match.modeType)
        setWinnerTeam(props.match.winnerTeam)
        setMapSearchInput(getMapNameLocalized(getMapFromType(props.mapData, props.match.mapType), props.localization) ?? "")
    }, [props.match]);

    useEffect(() => {
        const elems:SearchElement[] = []
        for (const key in props.mapData) {
            const map = props.mapData[key] as TourneyMap
            elems.push({
                id: map.mapIdentifier,
                name: map.name,
                value: map.mapIdentifier,
                displayName: getMapNameLocalized(map, props.localization)
            })
        }

        setSearchElems(elems)
    }, [props.mapData, props.localization]);

    useEffect(() => {
        if(props.teams == null || props.teams.length != 2) {
            setTeamElems([])
            return
        }

        const elems:InputSelectElement[] = []

        // no one
        elems.push({
            id: "unknown",
            value: TourneyTeamType.Unknown,
            selected: props.match.winnerTeam == TourneyTeamType.Unknown,
            display: "Unentschieden" //TODO localize
        })

        // team alpha
        elems.push({
            id: props.teams[0].uuid,
            value: TourneyTeamType.Alpha,
            selected: props.match.winnerTeam == TourneyTeamType.Alpha,
            display: props.teams[0].name
        })

        // team beta
        elems.push({
            id: props.teams[1].uuid,
            value: TourneyTeamType.Beta,
            selected: props.match.winnerTeam == TourneyTeamType.Beta,
            display: props.teams[1].name
        })

        setTeamElems(elems)
    }, [props.teams, winnerTeam]);

    useEffect(() => {
        const elems:InputSelectElement[] = []
        getAllTourneyModes().forEach(mode => {
            elems.push({
                id: mode.toString(),
                value: mode,
                selected: modeType === mode,
                display: getTourneyModeNameLocalized(mode, props.localization)
            })
        })

        setModeElems(elems)
    }, [props.localization]);

    useEffect(() => {
        if(props.visible === false) {
            reset()
        }
    }, [props.visible]);

    async function onSubmit(e) {
        e.preventDefault()
        const newMatch = Object.assign({}, props.match)
        newMatch.mapType = mapType
        newMatch.modeType = modeType
        newMatch.winnerTeam = winnerTeam

        props.setMatch(newMatch, props.index)

        props.setVisible(false)
        return true
    }

    function reset() {
        setModeType(TourneyModeType.Unknown)
        setMapType(TourneyMapType.Unknown)
        setWinnerTeam(TourneyTeamType.Unknown)
        setMapSearchInput("")
    }

    function filter(s:string) {
        return searchElems.filter(elem => {
            const value = elem.value as TourneyMapType
            const map = props.mapData[value]

            if(map.gameVersion !== props.gameVersion) {
                return false
            }

            if(s == null || s == "") {
                return true
            }

            const name = elem.displayName
            return name.toLowerCase().includes(s.toLowerCase())
        })
    }

    return (
        <StyledModal visible={props.visible} setVisible={props.setVisible}>
            <StyledForm onSubmit={onSubmit}>
                <StyledFormHeader headline={"Gespielte Map"} />
                <SearchDropdown input={mapSearchInput} setInput={setMapSearchInput} setVal={setMapType} attributes={{id: "new-map", name: "map", placeholder: "Karte suchen", autoComplete: "off"}} filter={filter} />
                <StyledFormHeader headline={"Gespielter Modus"} />
                <StyledInputRadio name={"map-mode"} elements={modeElems} selected={modeType} setSelected={setModeType} />
                <StyledInputRadio name={"winner-team"} elements={teamElems} selected={winnerTeam} setSelected={setWinnerTeam} />
                <StyledButton type={"submit"}>
                    {props.index == null ? 'Match hinzufügen' : 'Match aktualisieren'}
                </StyledButton>
            </StyledForm>
        </StyledModal>
    )
}