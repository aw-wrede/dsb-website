import FrameworkIcon from "./FrameworkIcon.ts";

type Props = {
    icon: FrameworkIcon
    onClick?: (e) => void
}

export default function StyledIcon(props:Props) {
    return (
        <span className="material-icons" onClick={props.onClick}>{props.icon}</span>
    )
}