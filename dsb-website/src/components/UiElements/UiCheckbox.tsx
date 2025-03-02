import './UiCheckboxStyle.sass'

export default function UiCheckbox({name, text, callback, defaultValue = false}) {

    const handleChange = (event) => {
        callback(event.target.checked, name)
    }

    return (
        <label className="ui-check">
            <input type="checkbox" name={name} onChange={handleChange}/>
            <span className="checkmark"></span>
            <p>{text}</p>
        </label>
    )
}