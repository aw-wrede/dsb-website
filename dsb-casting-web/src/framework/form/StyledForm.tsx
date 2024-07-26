export default function StyledForm({children, onSubmit} : {children: any, onSubmit: (e) => Promise<boolean>}) {
    return (
        <form className={"ui-form"} onSubmit={onSubmit}>
            {children}
        </form>
    )
}