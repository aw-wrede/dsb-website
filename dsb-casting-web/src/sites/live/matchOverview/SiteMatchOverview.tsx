import {useContext, useEffect, useState} from "react";
import UserInfo from "../../../interfaces/user/UserInfo.ts";
import {UserContext} from "../../../App.tsx";
import Overlay from "../../../interfaces/overlay/Overlay.ts";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {getMapData, WEBSOCKET_URL} from "../../../axios/AxiosApi.ts";
import {hasTeamLogo, teamGetLogo, teamGetName} from "../../../functions/teamFunctions.ts";

import "./siteMatchOverview.sass"
import {overlayGetTeamAlphaWins, overlayGetTeamBetaWins} from "../../../functions/overlayFunctions.ts";
import TourneyMapType from "../../../interfaces/tourney/TourneyMapType.ts";
import TourneyMap from "../../../interfaces/tourney/TourneyMap.ts";
import axios from "axios";
import LiveMapViewComponent from "../../../components/live/match/LiveMapViewComponent.tsx";
import {getMapFromType, getUnknownMap, getUnknownMatch} from "../../../functions/mapFunctions.ts";
import OverlayType from "../../../interfaces/overlay/OverlayType.ts";
import {usersToString} from "../../../functions/userFunctions.ts";

export default function SiteMatchOverview() {

    const user = useContext<UserInfo>(UserContext)

    const [overlay, setOverlay] = useState<Overlay>(null)
    const [mapData, setMapData] = useState<Record<TourneyMapType, TourneyMap>>({} as Record<TourneyMapType, TourneyMap>)

    const [fillerMatches, setFillerMatches] = useState<number[]>([])

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        getMapData(cancelToken.token).then(setMapData)

        return () => {
            cancelToken.cancel()
        }
    }, [])

    //#region WEBSOCKET

    // { sendJsonMessage, lastJsonMessage, readyState } : {sendJsonMessage:(msg:string) => void, lastJsonMessage:object, readyState:ReadyState}
    const { lastJsonMessage, readyState } : {lastJsonMessage:object, readyState:ReadyState} = useWebSocket(WEBSOCKET_URL,
        {
            share: false,
            shouldReconnect: () => true
        })

    useEffect(() => {
        console.debug("Websocket state changed")
        if(readyState === ReadyState.OPEN) {
            console.debug("Websocket connected.")
        }
    }, [readyState]);

    useEffect(() => {
        console.debug(`Websocket: ${JSON.stringify(lastJsonMessage)}`)
        setOverlay(lastJsonMessage as Overlay)
    }, [lastJsonMessage]);

    //#endregion websocket

    // remaining maps to fill list for static overlays
    useEffect(() => {
        if(overlay == null) {
            return
        }

        const fillerMatches:number[] = []
        for(let i = overlay.matches.length; i < overlay.maxMatches; i++) {
            fillerMatches.push(i)
        }
        setFillerMatches(fillerMatches)
    }, [overlay])



    return <div className={"live-content live-overview"} style={{
        "--teamAlphaColor": overlay?.teamAlphaColor,
        "--teamBetaColor": overlay?.teamBetaColor
    }}>
        {overlay == null ? null : <>
            <div className="live-header">
                <div className="header-teams live-container-style">
                    <div className="team-alpha">
                        {!hasTeamLogo(overlay.teamAlpha) ? null :
                            <img src={teamGetLogo(overlay.teamAlpha)} alt="" className="team-logo"/>}
                        <p className="team-name text-right">{teamGetName(overlay.teamAlpha)}</p>
                    </div>

                    <p className={"header-score"}>{overlayGetTeamAlphaWins(overlay)}-{overlayGetTeamBetaWins(overlay)}</p>

                    <div className="team-beta">
                        <p className="team-name text-left">{teamGetName(overlay.teamBeta)}</p>
                        {!hasTeamLogo(overlay.teamBeta) ? null :
                            <img src={teamGetLogo(overlay.teamBeta)} alt="" className="team-logo"/>}
                    </div>


                </div>
                <div className={"header-info live-container-style"}>
                    <img src="/images/dsb-logo.webp" alt="" className="brand-logo"/>
                    <p className={"header-match-title"}>{overlay.title}</p>
                </div>
            </div>
            <div className="live-maps">
                {overlay.matches.map((match, index) => <LiveMapViewComponent key={index} match={match} map={getMapFromType(mapData, match.mapType)} localization={overlay.localization} />)}
                {overlay.type === OverlayType.Static ? <>
                    {fillerMatches.map(i => <LiveMapViewComponent key={i} match={getUnknownMatch()} localization={overlay.localization} map={getUnknownMap()} />)}
                </> : null }
            </div>
            <div className="live-footer live-container-style">
                {overlay.commentators.find(r => r.reference.uuid === user.user.uuid) != null ? null :
                    <p>Streamer: {user.user.displayName}</p>}
                <p>{overlay.commentators.length === 1 ? "Kommentator:" : "Kommentatoren:"} {usersToString(overlay.commentators)}</p>
            </div>
        </>}
    </div>
}