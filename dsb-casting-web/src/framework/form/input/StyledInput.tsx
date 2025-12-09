import FrameworkIcon from "../../FrameworkIcon.ts";
import {HTMLInputAutoCompleteAttribute} from "react";
import StyledIcon from "../../StyledIcon.tsx";

type Props = {
    name:string
    type: string
    value:string|number
    onChange: (e) => void
    placeholder:string
    required: boolean
    readonly?: boolean
    valid?:boolean
    icon?:FrameworkIcon
    autoComplete?: HTMLInputAutoCompleteAttribute
}

export default function StyledInput (props: Props) {
    const validClass = props.valid != null ? props.valid ? "valid" : "invalid" : ""
    return (
        <div className={`ui-input ${validClass} ${props.icon ? "ui-input-pre-icon" : ""}`}>
            {props.icon != null ? (
                <label htmlFor={props.name} className={"ui-input-label"}>
                    <StyledIcon icon={props.icon} />
                </label>
            ) : null}
            <input id={props.name}
                   name={props.name}
                   type={props.type}
                   placeholder={props.placeholder}
                   value={props.value}
                   onChange={(e) => props.onChange(e)}
                   autoComplete={props.autoComplete ?? ""}
                   required={props.required}
                   readOnly={props.readonly ?? false}/>
        </div>
    )
}