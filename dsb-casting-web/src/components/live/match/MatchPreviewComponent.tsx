import Overlay from "../../../interfaces/overlay/Overlay"
import {useEffect, useState} from "react";
import {dateToCountdown, dateToTimeString} from "../../../functions/dateFunctions.ts";

import "./matchPreviewComponent.sass"
import {teamGetLogo, teamGetName} from "../../../functions/teamFunctions.ts";

type Props = {
    overlay: Overlay
    timeFormat: "result"|"relative"|"absolute"
    className?: string
}

export default function MatchPreviewComponent(props:Props) {

    const [time, setTime] = useState<Date|null>(null)
    const [timeDisplay, setTimeDisplay] = useState<string>("")

    useEffect(() => {
        setTime(new Date(props.overlay.scheduledTime))
    }, [props.overlay]);

    useEffect(() => {
        if(time == null) {
            return () => {}
        }
        let interval = null

        switch (props.timeFormat) {
            case "result":
                break
            case "relative":
                interval = setInterval(() => {
                    setTimeDisplay(dateToCountdown(time))
                }, 1000)
                break
            case "absolute":
                setTimeDisplay(dateToTimeString(time))
        }

        return () => {
            if(interval != null) {
                clearInterval(interval)
            }
        }
    }, [time]);


    return <div className={`match-preview ${props.className}`}>
        <div className={"preview-header"}>
            <p>{props.overlay.title}</p>
        </div>
        <div className={"preview-content"}>
            <img className={"preview-team-logo"} src={teamGetLogo(props.overlay.teamAlpha)} alt=""/>
            <p className={"preview-content-info"}>{timeDisplay}</p>
            <img className={"preview-team-logo"} src={teamGetLogo(props.overlay.teamBeta)} alt=""/>
        </div>
        <div className={"preview-teams"}>
            <p>{teamGetName(props.overlay.teamAlpha)} vs. {teamGetName(props.overlay.teamBeta)}</p>
        </div>
    </div>
}