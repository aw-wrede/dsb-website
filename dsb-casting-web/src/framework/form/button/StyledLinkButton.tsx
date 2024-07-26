import StyledButton from "./StyledButton.tsx";
import {useNavigate} from "react-router-dom";

export default function StyledLinkButton({children, href}: {children?: any, href: string}) {

    const navigate = useNavigate()

    function onClick() {
        navigate(href)
    }

    return (
        <StyledButton type={"button"} children={children} onClick={onClick} />
    )
}