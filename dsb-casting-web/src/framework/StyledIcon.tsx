import FrameworkIcon from "./FrameworkIcon.ts";

export default function StyledIcon({icon, onClick}: {icon: FrameworkIcon, onClick?: (e) => void}) {
    return (
        <span className="material-icons" onClick={onClick}>{icon}</span>
    )
}