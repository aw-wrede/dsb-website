import {useContext, useEffect, useState} from "react";
import UserInfo from "../../../interfaces/user/UserInfo.ts";
import {UserContext} from "../../../App.tsx";
import Overlay from "../../../interfaces/overlay/Overlay.ts";

import "./siteStartup.sass"
import MatchPreviewComponent from "../../../components/live/match/MatchPreviewComponent.tsx";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {getManyOverlays, WEBSOCKET_URL} from "../../../axios/AxiosApi.ts";
import axios from "axios";

export default function SiteStartup() {
    const user = useContext<UserInfo>(UserContext)

    const [overlay, setOverlay] = useState<Overlay>(null)
    const [successors, setSuccessors] = useState<Overlay[]>([])

    function addSuccessors(overlays: Overlay[]) {
        let newSuccessors:Overlay[] = Object.assign([], successors.filter((o) => {
            return overlays.find(x => x.uuid === o.uuid) == null
        }))

        console.log(overlays)

        newSuccessors = newSuccessors.concat(overlays)

        setSuccessors(newSuccessors.sort((a, b) => {
            const aDate = new Date(a.scheduledTime)
            const bDate = new  Date(b.scheduledTime)
            return aDate - bDate //TODO
        }))

        console.log(newSuccessors)
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

        console.log("Successors:")
        console.log(overlay.successorOverlays)

        setTimeout(() => {
            getManyOverlays(cancelToken.token, overlay.successorOverlays).then(addSuccessors)
        }, 500)

        return () => {
            cancelToken.cancel()
        }
    }, [overlay]);

    return <div className={"live-content"}>
        {overlay == null ? null : 
        <div className={"overlay-wrapper"}>
            <div className={"matches-list"}>
                <MatchPreviewComponent overlay={overlay} timeFormat={"relative"} className={"current"} />
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