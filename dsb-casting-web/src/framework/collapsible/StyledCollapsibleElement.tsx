import {ReactElement} from "react";

export default function StyledCollapsibleElement({header, body}:{header:ReactElement, body:ReactElement}) {
    return <li>
        {header}
        {body}
    </li>
}