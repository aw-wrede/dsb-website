import FrameworkIcon from "../../FrameworkIcon.ts";
import {HTMLInputAutoCompleteAttribute} from "react";
import StyledIcon from "../../StyledIcon.tsx";

export default function StyledInput ({name, type, value, onChange, placeholder, required, valid, icon, autoComplete}: {name:string, type: string, value:string|number, onChange: (e) => void, placeholder:string, required: boolean, valid?:boolean, icon?:FrameworkIcon, autoComplete?: HTMLInputAutoCompleteAttribute}) {
    const validClass = valid != null ? valid ? "valid" : "invalid" : ""
    return (
        <div className={`ui-input ${validClass} ${icon ? "ui-input-pre-icon" : ""}`}>
            {icon != null ? (
                <label htmlFor={name} className={"ui-input-label"}>
                    <StyledIcon icon={icon} />
                </label>
            ) : null}
            <input id={name} name={name} type={type} placeholder={placeholder} value={value}
                   onChange={(e) => onChange(e)} autoComplete={autoComplete ?? ""} required={required}/>
        </div>
    )
}