import "./createOverlay.sass"
import UserInfo from "../../interfaces/user/UserInfo.ts";
import StyledForm from "../../framework/form/StyledForm.tsx";
import StyledFormHeader from "../../framework/form/header/StyledFormHeader.tsx";
import StyledInput from "../../framework/form/input/StyledInput.tsx";
import {useContext, useEffect, useState} from "react";
import StyledInputRadio from "../../framework/form/input/StyledInputRadio.tsx";
import OverlayType, {overlayTypesToSelectElements} from "../../interfaces/overlay/OverlayType.ts";
import StyledButton from "../../framework/form/button/StyledButton.tsx";
import TourneyMapType from "../../interfaces/tourney/TourneyMapType.ts";
import TourneyMap from "../../interfaces/tourney/TourneyMap.ts";
import {
    getAllOverlayTemplates,
    getAllTeams,
    getAllUsers, getInkColorsPairs,
    getMapData,
    saveNewOverlay,
    updateOverlay
} from "../../axios/AxiosApi.ts";
import axios from "axios";
import MatchList from "../../components/match/MatchList.tsx";
import Localization, {
    getMeaningfulLocalizations,
    localizationsToSelectElements
} from "../../interfaces/Localization.tsx";
import TourneyGameVersion from "../../interfaces/tourney/TourneyGameVersion.ts";
import MatchCreateModal from "../../components/match/MatchCreateModal.tsx";
import TourneyMatch from "../../interfaces/tourney/TourneyMatch.ts";
import TourneyModeType from "../../interfaces/tourney/TourneyModeType.ts";
import TourneyTeamType from "../../interfaces/tourney/team/TourneyTeamType.ts";
import AppUser from "../../interfaces/user/AppUser.ts";
import CreateOverlayRequest from "../../axios/requests/CreateOverlayRequest.ts";
import {getUserFromList} from "../../functions/userFunctions.ts";
import UserSearchList from "../../components/user/UserSearchList.tsx";
import StyledIcon from "../../framework/StyledIcon.tsx";
import FrameworkIcon from "../../framework/FrameworkIcon.ts";
import OverlayTemplate from "../../interfaces/overlay/OverlayTemplate.ts";
import SearchDropdown from "../../framework/form/input/search/SearchDropdown.tsx";
import SearchElement from "../../framework/form/input/search/SearchElement.ts";
import {
    applyOverlayTemplate,
    overlayGetTeamAlphaWins,
    overlayGetTeamBetaWins
} from "../../functions/overlayFunctions.ts";
import TourneyTeam from "../../interfaces/tourney/team/TourneyTeam.ts";
import ButtonActionStatus from "../../framework/form/button/ButtonActionStatus.ts";
import {UserContext} from "../../App.tsx";
import StyledInputWithButton from "../../framework/form/input/StyledInputWithButton.tsx";
import StyledDateInput from "../../framework/form/input/date/StyledDateInput.tsx";
import StyledTimeInput from "../../framework/form/input/date/StyledTimeInput.tsx";
import {getTeamByUuid} from "../../functions/teamFunctions.ts";
import InkColorPair from "../../interfaces/inkColor/InkColorPair.ts";
import InputSelectElement from "../../framework/form/input/InputSelectElement.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SiteCreateOverlay({overlayToUpdate}:{overlayToUpdate?:CreateOverlayRequest}) {
    const user = useContext<UserInfo>(UserContext)

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [usersData, setUsersData] = useState<AppUser[]>([])
    const [mapData, setMapData] = useState<Record<TourneyMapType, TourneyMap>>({} as Record<TourneyMapType, TourneyMap>);

    const [teams, setTeams] = useState<TourneyTeam[]>([])
    const [teamSearchElems, setTeamSearchElems] = useState<SearchElement[]>([])

    const [inkColors, setInkColors] = useState<InkColorPair[]>([])

    const [teamAlphaInput, setTeamAlphaInput] = useState<string>("")
    const [teamBetaInput, setTeamBetaInput] = useState<string>("")

    const [templates, setTemplates] = useState<OverlayTemplate[]>([]);
    const [templatesSearchElems, setTemplatesSearchElems] = useState<SearchElement[]>([]);

    const [date, setDate] = useState<Date>(new Date());

    const [overlay, setOverlay] = useState<CreateOverlayRequest>(overlayToUpdate ?? {
        title: "",
        scheduledTime: new Date().toString(),
        type: OverlayType.Static,
        gameVersion: TourneyGameVersion.Splatoon3,
        maxMatches:0,
        matches: [],
        teamAlpha:"",
        teamBeta:"",
        localization:Localization.German,
        commentators:[],
        successorOverlays: [],
        inkColorPair: {
            position: 0,
            alphaColor: "#D7C422",
            betaColor: "#4221D1"
        }
    });
    const [type, setType] = useState<OverlayType>(OverlayType.Static);

    const [currentMatch, setCurrentMatch] = useState<TourneyMatch>({
        mapType: TourneyMapType.Unknown,
        modeType: TourneyModeType.Unknown,
        winnerTeam: TourneyTeamType.Unknown
    })
    const [currentMatchIndex, setCurrentMatchIndex] = useState<number|null>(null)

    const [submitSuccess, setSubmitSuccess] = useState<ButtonActionStatus>(ButtonActionStatus.Nothing);

    const [successorInput, setSuccessorInput] = useState<string>("")

    /**
     * Load data from backend
     */
    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        getMapData(cancelToken.token).then(setMapData)
        getAllUsers(cancelToken.token).then(setUsersData)
        getAllOverlayTemplates(cancelToken.token).then(setTemplates)
        getAllTeams(cancelToken.token).then(setTeams)
        getInkColorsPairs(cancelToken.token).then(setInkColors)

        return () => {
            cancelToken.cancel()
        }
    }, []);

    useEffect(() => {
        setTeamsIntoInputFields()
        
        if(overlayToUpdate != null) {
            setDate(new Date(overlayToUpdate.scheduledTime))
        }
    }, [overlayToUpdate]);

    useEffect(() => {
        setOverlayType(type)
    }, [type]);

    useEffect(() => {
        const elems:SearchElement[] = []
        templates.forEach(template => {
            elems.push({
                id: template.uuid,
                name: template.uuid,
                value: template,
                displayName: template.title
            })
        })

        setTemplatesSearchElems(elems)
    }, [templates]);

    useEffect(() => {
        const elems:SearchElement[] = []
        teams.forEach(team => {
            elems.push({
                id: team.uuid,
                name: team.uuid,
                value: team,
                displayName: team.name
            })
        })

        setTeamSearchElems(elems)

        setTeamsIntoInputFields()
    }, [teams]);

    useEffect(() => {
        const newOverlay = Object.assign({}, overlay)
        newOverlay.scheduledTime = date.toISOString()
        setOverlay(newOverlay)
    }, [date])

    function setTeamsIntoInputFields() {
        if(overlayToUpdate != null) {
            setOverlay(overlayToUpdate)
            setTeamAlphaInput(teams?.find(t => t.uuid === overlayToUpdate.teamAlpha)?.name ?? "")
            setTeamBetaInput(teams?.find(t => t.uuid === overlayToUpdate.teamBeta)?.name ?? "")
        }
    }

    function setOverlayType(type:OverlayType) {
        const newOverlay = Object.assign({}, overlay)
        newOverlay.type = type

        setOverlay(newOverlay)
    }

    function getInkColorPairInputElements():InputSelectElement[] {
        return inkColors.sort((a,b) => a.position - b.position).map(pair => ({
            id: `${pair.position}`,
            value: pair,
            display: `${pair.position}`,
            selected: false
        }))
    }

    function setInkColorPair(colorPair:InkColorPair) {
        console.log(colorPair)

        const newOverlay = Object.assign({}, overlay)
        newOverlay.inkColorPair = colorPair
        setOverlay(newOverlay)

    }

    async function onChange(e:any) {
        const value = e.target.value
        const newOverlay = Object.assign({}, overlay)

        let parsed:number

        switch (e.target.name) {
            case "title":
                newOverlay.title = value
                break
            case "max-matches":
                parsed = parseInt(value)
                newOverlay.maxMatches = isNaN(parsed) ? 0 : parsed
                break
            default:
                break
        }

        setOverlay(newOverlay)
        return true
    }

    async function onSetMatch(match:TourneyMatch, index:number|null) {
        const newOverlay = Object.assign({}, overlay)

        const oldWins = overlayGetTeamAlphaWins(newOverlay) + overlayGetTeamBetaWins(newOverlay)

        console.log("onSetMatch")

        if(index == null) {
            newOverlay.matches.push(match)
        } else {
            newOverlay.matches[index] = match
        }

        const newWins = overlayGetTeamAlphaWins(newOverlay) + overlayGetTeamBetaWins(newOverlay)

        // check if a win was added -> go to next ink color
        if(newWins > oldWins) {
            console.log("Win added")
            const newPosition = (overlay.inkColorPair.position + 1) % inkColors.length
            newOverlay.inkColorPair = inkColors.find(c => c.position === newPosition) ?? overlay.inkColorPair
        } else {
            console.log(`old: ${oldWins} new: ${newWins}`)
        }

        console.log(newOverlay)

        if(overlayToUpdate != null) {
            // Push update
            setSubmitSuccess(ButtonActionStatus.Loading)

            const cancelToken = axios.CancelToken.source()

            let result = false
            result = await updateOverlay(cancelToken.token, newOverlay)

            console.log(result)

            setSubmitSuccess(result ? ButtonActionStatus.Success : ButtonActionStatus.Error)
            setTimeout(() => {
                setSubmitSuccess(ButtonActionStatus.Nothing)
            }, 2000)
            //return result
        }

        setOverlay(newOverlay)
    }

    function selectCommentator(user:AppUser) {
        if(overlay.commentators.includes(user.uuid)) {
            return
        }

        const newOverlay = Object.assign({}, overlay)
        newOverlay.commentators.push(user.uuid)

        setOverlay(newOverlay)
    }

    function removeCommentator(uuid:string) {
        if(!overlay.commentators.includes(uuid)) {
            return
        }

        const newOverlay = Object.assign({}, overlay)
        newOverlay.commentators = newOverlay.commentators.filter(s => s !== uuid)

        setOverlay(newOverlay)
    }

    function setOverlayLocalization(localization:Localization) {
        const newOverlay = Object.assign({}, overlay)
        newOverlay.localization = localization

        setOverlay(newOverlay)
    }

    function selectOverlayTemplate(template:OverlayTemplate) {
        setOverlay(applyOverlayTemplate(template))
    }

    function filterTemplates(s:string) {
        return templatesSearchElems.filter(elem => {
            const template = elem.value

            if(s == null || s == "") {
                return true
            }

            return template.title.toLowerCase().includes(s.toLowerCase())
        })
    }

    function setTeam(team:TourneyTeam, type:TourneyTeamType) {
        const newOverlay = Object.assign({}, overlay)
        if(type === TourneyTeamType.Alpha)
            newOverlay.teamAlpha = team.uuid
        else if(type === TourneyTeamType.Beta)
            newOverlay.teamBeta = team.uuid

        setOverlay(newOverlay)
    }

    function addSuccessor(uuid:string) {
        const newOverlay = Object.assign({}, overlay)
        newOverlay.successorOverlays.push(uuid)
        setOverlay(newOverlay)
        setSuccessorInput("")
    }

    function removeSuccessor(uuid:string) {
        const newOverlay = Object.assign({}, overlay)
        newOverlay.successorOverlays = newOverlay.successorOverlays.filter(s => s !== uuid)
        setOverlay(newOverlay)
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

    function filterTeams(s:string) {
        return teamSearchElems.filter(elem => {
            const team = elem.value

            if(s == null || s == "") {
                return true
            }

            return team.name.toLowerCase().includes(s.toLowerCase())
        })
    }

    async function onSubmit(e:SubmitEvent) {
        e.preventDefault()
        console.log(overlay)

        setSubmitSuccess(ButtonActionStatus.Loading)

        const cancelToken = axios.CancelToken.source()

        let result = false
        if(overlayToUpdate == null) {
            result = await saveNewOverlay(cancelToken.token, overlay)
        } else {
            result = await updateOverlay(cancelToken.token, overlay)
        }

        setSubmitSuccess(result ? ButtonActionStatus.Success : ButtonActionStatus.Error)
        setTimeout(() => {
            setSubmitSuccess(ButtonActionStatus.Nothing)
        }, 2000)
        return result
    }

    return <div className={"content create-overlay"}>
        <StyledForm onSubmit={onSubmit}>
            <StyledFormHeader headline={overlayToUpdate == null ? "Overlay erstellen" : "Overlay aktualisieren"}/>

            <StyledFormHeader headline={"Aus Vorlage laden"}/>
            <SearchDropdown setVal={selectOverlayTemplate} attributes={{
                id: "select-overlay-template",
                name: "select-overlay-template",
                placeholder: "Vorlage wählen",
                autoComplete: "off"
            }} filter={filterTemplates}/>

            <StyledFormHeader headline={"Titel anpassen"}/>
            <StyledInput name={"title"} type={"text"} value={overlay.title} onChange={onChange} placeholder={"Titel"}
                         autoComplete={"off"} required={true}/>

            <StyledFormHeader headline={"Mapliste bearbeiten"}/>
            <StyledInput name={"max-matches"} type={"number"} value={overlay.maxMatches} onChange={onChange}
                         placeholder={"Maximale Anzahl Runden"} required={true} autoComplete={"off"}/>
            <MatchList matches={overlay.matches} mapData={mapData} localization={user.localization}
                       setModalVisible={setModalVisible} allowAdd={true} onAdd={onAddMatchClicked} allowEdit={true}
                       onEdit={onEditMatchClicked}/>

            <StyledFormHeader headline={"Aktuelle Tintenfarbe"}/>
            <StyledInputRadio name={"ink-color"} elements={getInkColorPairInputElements()}
                              selected={inkColors.find(c => c.alphaColor === overlay.inkColorPair.alphaColor
                                  && c.betaColor === overlay.inkColorPair.betaColor)}
                              setSelected={setInkColorPair} />
            <div className={"overlay-custom-colors"} style={{
                "--teamAlphaColor": overlay?.inkColorPair?.alphaColor,
                "--teamBetaColor": overlay?.inkColorPair?.betaColor
            }}>
                <p>Gesetzte Farbe:</p>
                <div className={"custom-colors-display"}></div>
            </div>

            <StyledFormHeader headline={"Teams festlegen"}/>
            <SearchDropdown input={teamAlphaInput} setInput={setTeamAlphaInput}
                            setVal={(team) => setTeam(team, TourneyTeamType.Alpha)} attributes={{
                id: "overlay-select-team-alpha",
                name: "overlay-select-team-alpha",
                placeholder: "Team Alpha",
                autoComplete: "off"
            }} filter={filterTeams}/>
            <SearchDropdown input={teamBetaInput} setInput={setTeamBetaInput}
                            setVal={(team) => setTeam(team, TourneyTeamType.Beta)} attributes={{
                id: "overlay-select-team-beta",
                name: "overlay-select-team-beta",
                placeholder: "Team Beta",
                autoComplete: "off"
            }} filter={filterTeams}/>

            <StyledFormHeader headline={"Typ festlegen"}/>

            <StyledInputRadio name={"type"} elements={overlayTypesToSelectElements(overlay.type)} selected={type}
                              setSelected={setType}/>

            <StyledFormHeader headline={"Kommentatoren hinzufügen"}/>

            <UserSearchList placeholder={"Kommentator suchen"} id={"commentator-search"} users={usersData}
                            selectUser={selectCommentator}/>
            <div className={"chips-list"}>
                {overlay.commentators.map((commentator) => (
                    <div key={commentator} className={"chip"}>
                        <p>{getUserFromList(commentator, usersData)?.displayName}</p>
                        <StyledIcon icon={FrameworkIcon.Close} onClick={() => removeCommentator(commentator)}/>
                    </div>
                ))}
            </div>

            <StyledFormHeader headline={"Nachfolgende Matches (Overlays)"}/>
            <StyledInputWithButton name={"overlay-add-successor"} type={"text"} value={successorInput}
                                   buttonChildren={<StyledIcon icon={FrameworkIcon.Add}/>}
                                   onChange={e => setSuccessorInput(e.target.value)}
                                   onClick={() => addSuccessor(successorInput)}
                                   placeholder={"UUID des Overlays"} required={false} autoComplete={"off"}/>
            <div className={"chips-list"}>
                {overlay.successorOverlays.map((successor) => (
                    <div key={successor} className={"chip"}>
                        <p>{successor}</p>
                        <StyledIcon icon={FrameworkIcon.Close} onClick={() => removeSuccessor(successor)}/>
                    </div>
                ))}
            </div>

            <StyledFormHeader headline={"Zeit festlegen"}/>
            <StyledDateInput date={date} setDate={setDate} />
            <StyledTimeInput name={"overlay-scheduled-time"} date={date} setDate={setDate} placeholder={"Uhrzeit"} required={false} icon={FrameworkIcon.Schedule} />

            <StyledFormHeader headline={"Sprache auswählen"}/>
            <StyledInputRadio name={"template-localization"}
                              elements={localizationsToSelectElements(overlay.localization, getMeaningfulLocalizations())}
                              selected={overlay.localization} setSelected={setOverlayLocalization}/>

            <StyledButton type={"submit"}
                          success={submitSuccess}>{overlayToUpdate == null ? "Overlay erstellen" : "Overlay aktualisieren"}</StyledButton>
        </StyledForm>
        <MatchCreateModal visible={modalVisible} setVisible={setModalVisible} gameVersion={overlay.gameVersion}
                          match={currentMatch} setMatch={onSetMatch} index={currentMatchIndex} mapData={mapData}
                          teams={[getTeamByUuid(overlay.teamAlpha, teams), getTeamByUuid(overlay.teamBeta, teams)]} localization={user.localization}/>
    </div>
}