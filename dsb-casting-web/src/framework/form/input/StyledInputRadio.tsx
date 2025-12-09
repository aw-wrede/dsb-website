import InputSelectElement from "./InputSelectElement.ts";

type Props = {
    name:string
    elements:InputSelectElement[]
    selected:any
    setSelected:(elem:any) => void
}

export default function StyledInputRadio(props:Props) {

    function onChange(elem:InputSelectElement) {
        props.setSelected(elem.value)
    }

    return (
        <div className={"ui-checkbox-list center"}>
            {props.elements.map(elem => (
                <div key={`${props.name}-${elem.id}`} className={"ui-checkbox"}>
                    <input id={`${props.name}-${elem.id}`} type="radio" checked={props.selected === elem.value} name={props.name} onChange={() => onChange(elem)} />
                    <label htmlFor={`${props.name}-${elem.id}`}>
                        <i className={"text"}>{elem.display}</i>
                    </label>
                </div>
            ))}
        </div>
    )
}