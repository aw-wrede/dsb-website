import {ChangeEvent} from "react";

export default function StyledFileInput({name, accept, required, file, setFile}:{name:string, accept:string, required:boolean, file:File, setFile:(f:File) => void}) {

    function onChange(e:ChangeEvent<HTMLInputElement>) {
        setFile(e.target.files[0])
    }

    return <div className={"ui-input"}>
        <input name={name} type={"file"} accept={accept} onChange={onChange} required={required} />
    </div>
}