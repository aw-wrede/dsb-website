import {ReactNode} from "react";
import StyledButton from "./form/button/StyledButton.tsx";
import StyledIcon from "./StyledIcon.tsx";
import FrameworkIcon from "./FrameworkIcon.ts";

export default function StyledModal({children, visible, setVisible}: {children: ReactNode, visible:boolean, setVisible:(visible:boolean) => void}) {
    return (
        <div className={`modal ${visible ? "visible" : ""}`}>
            <StyledButton type={"button"} onClick={() => setVisible(!visible)}>
                <StyledIcon icon={FrameworkIcon.Close} />
            </StyledButton>
            <div className={"modal-content"}>
                {children}
            </div>
        </div>
    )
}