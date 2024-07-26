import UserInfo from "../../../interfaces/user/UserInfo.ts";
import StyledForm from "../../../framework/form/StyledForm.tsx";
import StyledFormHeader from "../../../framework/form/header/StyledFormHeader.tsx";
import StyledInput from "../../../framework/form/input/StyledInput.tsx";
import {useContext, useEffect, useState} from "react";
import OverlayTemplate from "../../../interfaces/overlay/OverlayTemplate.ts";
import StyledInputRadio from "../../../framework/form/input/StyledInputRadio.tsx";
import OverlayType, {overlayTypesToSelectElements} from "../../../interfaces/overlay/OverlayType.ts";
import StyledButton from "../../../framework/form/button/StyledButton.tsx";
import TourneyMapType from "../../../interfaces/tourney/TourneyMapType.ts";
import TourneyMap from "../../../interfaces/tourney/TourneyMap.ts";
import {getMapData, saveNewOverlayTemplate} from "../../../axios/AxiosApi.ts";
import axios from "axios";
import MatchList from "../../../components/match/MatchList.tsx";
import Localization, {
    getMeaningfulLocalizations,
    localizationsToSelectElements
} from "../../../interfaces/Localization.tsx";
import TourneyGameVersion from "../../../interfaces/tourney/TourneyGameVersion.ts";
import MatchCreateModal from "../../../components/match/MatchCreateModal.tsx";
import TourneyMatch from "../../../interfaces/tourney/TourneyMatch.ts";
import TourneyModeType from "../../../interfaces/tourney/TourneyModeType.ts";
import TourneyTeamType from "../../../interfaces/tourney/team/TourneyTeamType.ts";
import {UserContext} from "../../../App.tsx";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SiteCreateOverlayTemplate() {
    const user = useContext<UserInfo>(UserContext)

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [mapData, setMapData] = useState<Record<TourneyMapType, TourneyMap>>({} as Record<TourneyMapType, TourneyMap>);

    const [template, setTemplate] = useState<OverlayTemplate>({
        title: "",
        uuid: "",
        matches: [],
        type: OverlayType.Static,
        gameVersion: TourneyGameVersion.Splatoon3,
        maxMatches: 9,
        localization:Localization.German
    });

    const [maxMatchesInput, setMaxMatchesInput] = useState("9")
    const [type, setType] = useState<OverlayType>(OverlayType.Static);
    const [templateLocalization, setTemplateLocalization] = useState<Localization>(Localization.German)

    const [currentMatch, setCurrentMatch] = useState<TourneyMatch>({
        mapType: TourneyMapType.Unknown,
        modeType: TourneyModeType.Unknown,
        winnerTeam: TourneyTeamType.Unknown
    })
    const [currentMatchIndex, setCurrentMatchIndex] = useState<number|null>(null)

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        getMapData(cancelToken.token).then(setMapData)

        return () => {
            cancelToken.cancel()
        }
    }, []);

    useEffect(() => {
        setOverlayType(type)
    }, [type]);

    useEffect(() => {
        setOverlayLocalization(templateLocalization)
    }, [templateLocalization])

    useEffect(() => {
        if(maxMatchesInput.length === 0) {
            setMaxMatches(0)
            return
        }

        let value = parseInt(maxMatchesInput)

        if(!isNaN(value) && value.toString() !== maxMatchesInput) {
            value = NaN
        }

        setMaxMatches(value)
    }, [maxMatchesInput])

    function setOverlayType(type:OverlayType) {
        const newTemplate = Object.assign({}, template)
        newTemplate.type = type

        setTemplate(newTemplate)
    }

    function setOverlayLocalization(localization:Localization) {
        const newTemplate = Object.assign({}, template)
        newTemplate.localization = localization

        setTemplate(newTemplate)
    }

    function setMaxMatches(maxMatches:number) {
        const newTemplate = Object.assign({}, template)
        newTemplate.maxMatches = maxMatches
        setTemplate(newTemplate)
    }

    async function onChange(e:any) {
        const value = e.target.value
        const newTemplate = Object.assign({}, template)

        switch (e.target.name) {
            case "title":
                newTemplate.title = value
                break
            default:
                break
        }

        setTemplate(newTemplate)
        return true
    }

    function onSetMatch(match:TourneyMatch) {
        const newTemplate = Object.assign({}, template)
        newTemplate.matches.push(match)

        console.log(newTemplate)

        setTemplate(newTemplate)
    }

    function onAddMatchClicked() {
        setCurrentMatchIndex(null)
        setCurrentMatch({
            mapType: TourneyMapType.Unknown,
            modeType: TourneyModeType.Unknown,
            winnerTeam: TourneyTeamType.Unknown
        })
    }

    function onEditMatchClicked(match:TourneyMatch, index:number) {
        setCurrentMatchIndex(index)
        setCurrentMatch(match)
    }

    async function onSubmit(e:SubmitEvent) {
        e.preventDefault()

        console.log(template)

        const cancelToken = axios.CancelToken.source()
        const result = await saveNewOverlayTemplate(cancelToken.token, template)

        console.log(`Created status: ${result}`)

        return result
    }

    return <div className={"content create-template"}>
        <StyledForm onSubmit={onSubmit}>
            <StyledFormHeader headline={"Vorlage erstellen"} />
            <StyledInput name={"title"} type={"text"} value={template.title} onChange={onChange} placeholder={"Titel"} autoComplete={"off"} required={true} />

            <StyledFormHeader headline={template.type === OverlayType.Static ? "Anzahl Matches" : "Maximale Anzahl Matches"} />
            <StyledInput name={"max-matches"} type={"number"} value={maxMatchesInput} onChange={(e) => setMaxMatchesInput(e.target.value)} placeholder={template.type === OverlayType.Static ? "Anzahl Matches" : "Maximale Anzahl Matches"} required={true} autoComplete={"off"} />
            <i className={"max-matches-info"}>{isNaN(template.maxMatches) ? `Eingabe ist fehlerhaft.` : ""}</i>

            <StyledFormHeader headline={"Mapliste bearbeiten"} />
            <MatchList matches={template.matches} mapData={mapData} localization={user.localization}  setModalVisible={setModalVisible} allowAdd={true} onAdd={onAddMatchClicked} allowEdit={true} onEdit={onEditMatchClicked}/>

            <StyledFormHeader headline={"Typ festlegen"} />
            <StyledInputRadio name={"type"} elements={overlayTypesToSelectElements(template.type)} selected={type} setSelected={setType}/>

            <StyledFormHeader headline={"Sprache auswählen"} />
            <StyledInputRadio name={"template-localization"} elements={localizationsToSelectElements(template.localization, getMeaningfulLocalizations())} selected={templateLocalization} setSelected={setTemplateLocalization} />

            <StyledButton type={"submit"}>Vorlage erstellen</StyledButton>
        </StyledForm>
        <MatchCreateModal visible={modalVisible} setVisible={setModalVisible} gameVersion={template.gameVersion} match={currentMatch} setMatch={onSetMatch} index={currentMatchIndex} mapData={mapData} localization={user.localization} />
    </div>
}