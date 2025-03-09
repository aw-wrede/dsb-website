import "./siteIngame.sass"
import UserInfo from "../../../interfaces/user/UserInfo.ts";
import {UserContext} from "../../../App.tsx";
import Overlay from "../../../interfaces/overlay/Overlay.ts";
import { useContext, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { teamGetName } from "../../../functions/teamFunctions.ts";
import {overlayGetTeamAlphaWins, overlayGetTeamBetaWins} from "../../../functions/overlayFunctions.ts";
import { WEBSOCKET_URL } from "../../../axios/AxiosApi.ts";

export default function SiteIngame() {

    const user = useContext<UserInfo>(UserContext)

    const [overlay, setOverlay] = useState<Overlay>(null)

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

    return <>
        {overlay == null ? null :
            <div className={"content-ingame"} style={{
                "--teamAlphaColor": overlay.teamAlphaColor,
                "--teamBetaColor": overlay.teamBetaColor
            }}>
                <div className="ingame-container bg-01 ingame-container-01">
                    <div className="ingame-header">
                        <p>{overlay.title}</p>
                    </div>
                    <div className="ingame-body">
                        <div className="ingame-box ingame-team">
                            <div className={"ingame-team-stats corner-top"}>
                                <div className={"stats-animation-wrapper team-alpha"}>
                                    <p className={"team-name"}>{teamGetName(overlay.teamAlpha)}</p>
                                    <p className={"bold score"}>{overlayGetTeamAlphaWins(overlay)}</p>
                                </div>

                            </div>
                            <div className={"ingame-team-stats corner-bottom"}>
                                <div className={"stats-animation-wrapper team-beta"}>
                                    <p className={"team-name"}>{teamGetName(overlay.teamBeta)}</p>
                                    <p className={"bold score"}>{overlayGetTeamBetaWins(overlay)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"ingame-container bg-02 ingame-container-02"}>
                    <div className="ingame-body">
                        <div className="ingame-box ingame-commentators">
                            {overlay.commentators.map((commentator) => (
                                <p key={commentator.reference.uuid}>{commentator.reference.displayName}</p>
                            ))}
                        </div>
                    </div>
                </div>

                {overlay.commentators.find(r => r.reference.uuid === user.user.uuid) != null ? null :
                    <div className={"ingame-container bg-02 ingame-container-03"}>
                        <div className="ingame-body">
                            <div className="ingame-box ingame-commentators">
                                <p>{user.user.displayName}</p>
                            </div>
                        </div>
                    </div>
                }

            </div>
        }
    </>
}