import FrameworkIcon from "../../../FrameworkIcon.ts";
import StyledIcon from "../../../StyledIcon.tsx";
import {applyTimeInput, timeToInputString} from "../../../../functions/dateFunctions.ts";

export default function StyledTimeInput({name, date, setDate, icon, placeholder, required, valid}:{name:string, date:Date, setDate:(date:Date) => void, icon?:FrameworkIcon, placeholder:string, required:boolean, valid?:boolean}) {
    const validClass = valid != null ? valid ? "valid" : "invalid" : ""

    function onChange(val:string) {
        const newDate = new Date(date)
        applyTimeInput(newDate, val)
        setDate(newDate)
    }

    return <div className={`ui-input ${validClass} ${icon ? "ui-input-pre-icon" : ""}`}>
        <input type="time" value={timeToInputString(date)} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}/>
        {icon != null ? (
            <label htmlFor={name} className={"ui-input-label"}>
                <StyledIcon icon={icon} />
            </label>
        ) : null}
    </div>
}