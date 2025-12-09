type Props = {
    children:any
    onSubmit:(e) => Promise<boolean>
}

export default function StyledForm(props:Props) {
    return (
        <form className={"ui-form"} onSubmit={props.onSubmit}>
            {props.children}
        </form>
    )
}