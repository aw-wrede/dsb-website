import CollapsibleElement from "./CollapsibleElement.ts";
import React, {useState} from "react";

function StyledCollapsibleHeader({children, id, setId}: {children: React.ReactNode, id:number, setId:(id:number) => void}) {
    return <div className={"collapsible-header"} onClick={() => setId(id)}>
        {children}
    </div>
}

function StyledCollapsibleBody({children}: {children: React.ReactNode}) {
    return <div className={"collapsible-body-wrapper"}>
        <div className={"body-content"}>
            {children}
        </div>
    </div>
}

export default function StyledCollapsible({elements}: { elements: CollapsibleElement[]}) {

    const [focus, setFocus] = useState<number>(null)

    function onClick(i:number) {
        // if focus is already on element, remove focus
        // else set focus to clicked element
        setFocus(i === focus ? null : i)
    }

    return <ul className={"ui-collapsible"}>
        {elements.map((element:CollapsibleElement, index:number) =>
            <li key={index} className={`ui-panel ${focus != null && focus === index ? 'opened' : ''}`}>
                <StyledCollapsibleHeader id={index} setId={onClick} children={element.header} />
                <StyledCollapsibleBody children={element.body} />
            </li>
        )}
    </ul>
}