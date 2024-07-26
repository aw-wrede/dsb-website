import InputSelectElement from "./InputSelectElement.ts";

export default function StyledInputSelect({elements}:{elements:InputSelectElement[]}) {
    return (
        <div className={"ui-checkbox-list center"}>
            {elements.map(elem => (
                <div key={elem.id} className={"ui-checkbox"}>
                    <input id={elem.id} type="checkbox" value={elem.id} />
                        <label htmlFor={elem.id}>
                            <i className={"text"}></i>
                        </label>
                </div>
            ))}
        </div>
    )
}