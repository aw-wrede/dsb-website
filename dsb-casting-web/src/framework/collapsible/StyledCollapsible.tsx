import CollapsibleElement from "./CollapsibleElement.ts";
import React, {useState} from "react";

type HeaderProps = {
    children: React.ReactNode
    id:number
    setId:(id:number) => void
}

function StyledCollapsibleHeader(props:HeaderProps) {
    return <div className={"collapsible-header"} onClick={() => props.setId(props.id)}>
        {props.children}
    </div>
}


type BodyProps = {
    children: React.ReactNode
}

function StyledCollapsibleBody(props:BodyProps) {
    return <div className={"collapsible-body-wrapper"}>
        <div className={"body-content"}>
            {props.children}
        </div>
    </div>
}


type CollapsibleProps = {
    elements: CollapsibleElement[]
}
export default function StyledCollapsible(props:CollapsibleProps) {

    const [focus, setFocus] = useState<number>(null)

    function onClick(i:number) {
        // if focus is already on element, remove focus
        // else set focus to clicked element
        setFocus(i === focus ? null : i)
    }

    return <ul className={"ui-collapsible"}>
        {props.elements.map((element:CollapsibleElement, index:number) =>
            <li key={index} className={`ui-panel ${focus != null && focus === index ? 'opened' : ''}`}>
                <StyledCollapsibleHeader id={index} setId={onClick} children={element.header} />
                <StyledCollapsibleBody children={element.body} />
            </li>
        )}
    </ul>
}