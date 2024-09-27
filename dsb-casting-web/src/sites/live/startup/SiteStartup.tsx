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
        const newSuccessors:Overlay[] = Object.assign([], successors)
        newSuccessors.push(overlay)
        setSuccessors(newSuccessors)
    }

    //#region WEBSOCKET

    const { sendJsonMessage, lastJsonMessage, readyState } : {sendJsonMessage:(msg:string) => void, lastJsonMessage:object, readyState:ReadyState} = useWebSocket(WEBSOCKET_URL,
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

        overlay.successorOverlays.forEach((successorUuid:string) => getOverlay(cancelToken.token, successorUuid).then(addSuccessor))

        return () => {
            cancelToken.cancel()
        }
    }, [overlay]);

    /*useEffect(() => {
        if(user.user.selectedOverlay == null || user.user.selectedOverlay === "") {
            return () => {}
        }

        const cancelToken = axios.CancelToken.source()

        getOverlay(cancelToken.token, user.user.selectedOverlay).then((overlay:Overlay) => {
            if(overlay == null) {
                return
            }
            console.log(overlay)
            setOverlay(overlay)
            overlay.successorOverlays.forEach((successorUuid:string) => getOverlay(cancelToken.token, successorUuid).then(addSuccessor))
        })

        return () => {
            cancelToken.cancel()
        }
    }, []);*/

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
                <img className={"brand-logo"} src="/images/dsb-logo.webp" alt=""/>
                <div className={"staff-info"}>
                    <p className={"staff-streamer"}>{user.user.displayName}</p>
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