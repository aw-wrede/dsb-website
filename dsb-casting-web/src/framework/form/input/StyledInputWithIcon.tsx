import FrameworkIcon from "../../FrameworkIcon.ts";
import StyledInput from "./StyledInput.tsx";

/**
 * @deprecated
 */
export default function StyledInputWithIcon ({name, type, value, onChange, placeholder, required, valid, icon}: {name:string, type: string, value:string, onChange: (e) => void, placeholder:string, required: boolean, valid?:boolean, icon:FrameworkIcon}) {
    return (
        <StyledInput name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} valid={valid} icon={icon} />
    )
}