import StyledInput from "./StyledInput.tsx";
import FrameworkIcon from "../../FrameworkIcon.ts";
import {HTMLInputAutoCompleteAttribute, ReactNode} from "react";
import StyledButton from "../button/StyledButton.tsx";

export default function StyledInputWithButton({name, type, value, buttonChildren, onChange, onClick, placeholder, required, valid, icon, autoComplete}: {name:string, type: string, value:string|number, buttonChildren:ReactNode, onChange: (e) => void, onClick: (e) => void, placeholder:string, required: boolean, valid?:boolean, icon?:FrameworkIcon, autoComplete?: HTMLInputAutoCompleteAttribute}) {
    return <div className={"flex-row ui-input-button-wrapper"}>
        <StyledInput name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} valid={valid} icon={icon} autoComplete={autoComplete} />
        <StyledButton type={"button"} onClick={onClick} children={buttonChildren} />
    </div>
}