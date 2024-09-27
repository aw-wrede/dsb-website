import Overlay from "../../../interfaces/overlay/Overlay"
import {useEffect, useState} from "react";
import {dateToCountdown, dateToTimeString} from "../../../functions/dateFunctions.ts";

type Props = {
    overlay: Overlay
    timeFormat: "result"|"relative"|"absolute"
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



    return <div className={"match-preview"}>
        <div className={"preview-header"}>
            <p>{props.overlay.title}</p>
        </div>
        <div className={"preview-content"}>
            <p>{timeDisplay}</p>
        </div>
    </div>
}