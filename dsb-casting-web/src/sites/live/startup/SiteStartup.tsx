import {useContext, useEffect, useState} from "react";
import UserInfo from "../../../interfaces/user/UserInfo.ts";
import {UserContext} from "../../../App.tsx";
import Overlay from "../../../interfaces/overlay/Overlay.ts";

import "./siteStartup.sass"
import MatchPreviewComponent from "../../../components/live/match/MatchPreviewComponent.tsx";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {getOverlay, WEBSOCKET_URL} from "../../../axios/AxiosApi.ts";
import axios from "axios";

export default function SiteStartup() {
    const user = useContext<UserInfo>(UserContext)

    const [overlay, setOverlay] = useState<Overlay>(null)
    const [successors, setSuccessors] = useState<Overlay[]>([])

    function addSuccessor(overlay: Overlay) {
        let newSuccessors:Overlay[] = Object.assign([], successors)
        if(successors.filter(o => o.uuid === overlay.uuid).length > 0) {
            console.error("Already exists")
            newSuccessors = []
        }

        newSuccessors.push(overlay)
        setSuccessors(newSuccessors)
    }

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

    useEffect(() => {
        if(overlay == null) {
            return () => {}
        }

        const cancelToken = axios.CancelToken.source()
        //clear list
        setSuccessors([])

        setTimeout(() => {
            overlay.successorOverlays.forEach((successorUuid:string) => getOverlay(cancelToken.token, successorUuid).then(addSuccessor))
        }, 1000)

        return () => {
            cancelToken.cancel()
        }
    }, [overlay]);

    return <div className={"live-content"}>
        {overlay == null ? null : 
        <div className={"overlay-wrapper"}>
            <div className={"matches-list"}>
                <MatchPreviewComponent overlay={overlay} timeFormat={"relative"} />
                {successors.map(successor =>
                    <div key={successor.uuid}>
                        <MatchPreviewComponent overlay={successor} timeFormat={"absolute"} />
                    </div>
                )}
            </div>
            <div className={"stream-info"}>
                <div className="brand-wrapper">
                    <img className={"brand-logo"} src="/images/dsb-logo.webp" alt=""/>
                    <p className={"brand-name"}>Deutsche Splat Bundesliga</p>
                </div>
                <div className={"staff-info"}>
                    {overlay.commentators.find(r => r.reference.uuid === user.user.uuid) != null ? null :
                        <p className={"staff-streamer"}>{user.user.displayName}</p>}

                    <div className={"staff-comm-wrapper"}>
                        {overlay.commentators.map((commentator) =>
                            <p key={commentator.reference.uuid} className={"staff-comm"}>{commentator.reference.displayName}</p>)
                        }
                    </div>
                </div>
            </div>

        </div>
        }
    </div>
}