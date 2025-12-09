import {ReactElement} from "react";

type ElementProps = {
    header:ReactElement
    body:ReactElement
}

export default function StyledCollapsibleElement(props:ElementProps) {
    return <li>
        {props.header}
        {props.body}
    </li>
}