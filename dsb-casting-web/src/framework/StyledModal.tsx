import {ReactNode} from "react";
import StyledButton from "./form/button/StyledButton.tsx";
import StyledIcon from "./StyledIcon.tsx";
import FrameworkIcon from "./FrameworkIcon.ts";

type Props = {
    children: ReactNode
    visible:boolean
    setVisible:(visible:boolean) => void
}

export default function StyledModal(props:Props) {
    return (
        <div className={`modal ${props.visible ? "visible" : ""}`}>
            <StyledButton type={"button"} onClick={() => props.setVisible(!props.visible)}>
                <StyledIcon icon={FrameworkIcon.Close} />
            </StyledButton>
            <div className={"modal-content"}>
                {props.children}
            </div>
        </div>
    )
}