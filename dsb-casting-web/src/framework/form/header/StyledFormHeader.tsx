export default function StyledFormHeader({children, headline}: {children?:any, headline?:string}) {
    return (
        <div className={"ui-form-header"}>
            {headline ? (
                <h2 className="ui-form-headline">{headline}</h2>
            ) : null}
            {children ? children : null}
        </div>
    )
}