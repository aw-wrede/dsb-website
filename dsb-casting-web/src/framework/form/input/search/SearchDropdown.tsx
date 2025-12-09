import InputAttributes from "../InputAttributes.ts";
import SearchElement from "./SearchElement.ts";
import {useState} from "react";

export default function SearchDropdown({input, setInput, setVal, attributes, filter}: {input?:string, setInput?:(s:string) => void, setVal: (val:any) => void, attributes:InputAttributes, filter:(s:string) => SearchElement[]}) {

    const [localInput, setLocalInput] = useState('');

    function onChange(e) {
        const value = e.target.value
        setInput != null ? setInput(value) : setLocalInput(value)
    }

    function onClick(elem:SearchElement) {
        setInput != null ? setInput(elem.displayName) : setLocalInput(elem.displayName)
        setVal(elem.value)
    }

    return <div className={"ui-input ui-search-dropdown"}>
        <input type="text" name={attributes.name} placeholder={attributes.placeholder} value={input ?? localInput} onChange={onChange} autoComplete={attributes.autoComplete} />
        <div className={"dropdown-elements"}>
            {filter(input ?? localInput).map(elem => (
                <a key={elem.id} className={"elem"} onClick={() => onClick(elem)}>
                    {elem.displayName}
                </a>
            ))}
        </div>
    </div>
}