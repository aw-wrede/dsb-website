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

export default function MatchCreateModal({visible, setVisible, gameVersion, match, setMatch, index, mapData, localization}:{visible:boolean, setVisible:(visible:boolean) => void, gameVersion:TourneyGameVersion, match:TourneyMatch, setMatch:(match:TourneyMatch, index:number|null) => void, index:number|null, mapData:Record<TourneyMapType, TourneyMap>, localization:Localization}) {

    const [mapSearchInput, setMapSearchInput] = useState("")

    const [mapType, setMapType] = useState<TourneyMapType>(match.mapType)
    const [modeType, setModeType] = useState<TourneyModeType>(match.modeType)

    const [searchElems, setSearchElems] = useState<SearchElement[]>([])
    const [modeElems, setModeElems] = useState<InputSelectElement[]>([])

    useEffect(() => {
        setMapType(match.mapType)
        setModeType(match.modeType)
        setMapSearchInput(getMapNameLocalized(getMapFromType(mapData, match.mapType), localization) ?? "")
    }, [match]);

    useEffect(() => {
        const elems:SearchElement[] = []
        for (const key in mapData) {
            const map = mapData[key] as TourneyMap
            elems.push({
                id: map.mapIdentifier,
                name: map.name,
                value: map.mapIdentifier,
                displayName: getMapNameLocalized(map, localization)
            })
        }

        setSearchElems(elems)
    }, [mapData, localization]);

    useEffect(() => {
        const elems:InputSelectElement[] = []
        getAllTourneyModes().forEach(mode => {
            elems.push({
                id: mode.toString(),
                value: mode,
                selected: modeType === mode,
                display: getTourneyModeNameLocalized(mode, localization)
            })
        })

        setModeElems(elems)
    }, [localization]);

    useEffect(() => {
        if(visible === false) {
            reset()
        }
    }, [visible]);

    async function onSubmit(e) {
        e.preventDefault()
        const newMatch = Object.assign({}, match)
        newMatch.mapType = mapType
        newMatch.modeType = modeType

        setMatch(newMatch, index)

        setVisible(false)
        return true
    }

    function reset() {
        setModeType(TourneyModeType.Unknown)
        setMapType(TourneyMapType.Unknown)
        setMapSearchInput("")
    }

    function filter(s:string) {
        return searchElems.filter(elem => {
            const value = elem.value as TourneyMapType
            const map = mapData[value]

            if(map.gameVersion !== gameVersion) {
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
        <StyledModal visible={visible} setVisible={setVisible}>
            <StyledForm onSubmit={onSubmit}>
                <StyledFormHeader headline={"Gespielte Map"} />
                <SearchDropdown input={mapSearchInput} setInput={setMapSearchInput} setVal={setMapType} attributes={{id: "new-map", name: "map", placeholder: "Karte suchen", autoComplete: "off"}} filter={filter} />
                <StyledFormHeader headline={"Gespielter Modus"} />
                <StyledInputRadio name={"map-mode"} elements={modeElems} selected={modeType} setSelected={setModeType} />
                <StyledButton type={"submit"}>
                    Match hinzufügen
                </StyledButton>
            </StyledForm>
        </StyledModal>
    )
}