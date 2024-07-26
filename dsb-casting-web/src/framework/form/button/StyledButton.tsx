import ButtonActionStatus from "./ButtonActionStatus.ts";

export default function StyledButton({type, children, onClick, success}: {type: "submit"|"reset"|"button", children:any, onClick?: (e) => void, success?:ButtonActionStatus}) {

    function getSuccessClass(success:ButtonActionStatus):string {
        switch(success) {
            case ButtonActionStatus.Success:
                return "btn-success"
            case ButtonActionStatus.Error:
                return "btn-error"
            case ButtonActionStatus.Loading:
                return "btn-loading"
            default:
                return ""
        }
    }

    return (
        <div className={`ui-btn ${success != null ? getSuccessClass(success) : '' }`}>
            <button type={type} onClick={onClick ? onClick : () => {
            }}>{children}</button>
        </div>

    )
}