import InputSelectElement from "./InputSelectElement.ts";

export default function StyledInputRadio({name, elements, selected, setSelected}:{name:string, elements:InputSelectElement[], selected:any, setSelected:(elem:any) => void}) {

    function onChange(elem:InputSelectElement) {
        setSelected(elem.value)
    }

    return (
        <div className={"ui-checkbox-list center"}>
            {elements.map(elem => (
                <div key={`${name}-${elem.id}`} className={"ui-checkbox"}>
                    <input id={`${name}-${elem.id}`} type="radio" checked={selected === elem.value} name={name} onChange={() => onChange(elem)} />
                    <label htmlFor={`${name}-${elem.id}`}>
                        <i className={"text"}>{elem.display}</i>
                    </label>
                </div>
            ))}
        </div>
    )
}