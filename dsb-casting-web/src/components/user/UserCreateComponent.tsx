import AppUser from "../../interfaces/user/AppUser.ts";
import StyledForm from "../../framework/form/StyledForm.tsx";
import StyledFormHeader from "../../framework/form/header/StyledFormHeader.tsx";

import "./user.sass"

export default function UserCreateComponent({user}: {user:AppUser}) {

    async function onSubmit(e) {
        e.preventDefault()
        console.log(user.uuid)
        return true
    }

    return (
        <div className={"user-component"}>
            <StyledForm onSubmit={e => onSubmit(e)}>
                <StyledFormHeader headline={"Neuen Account erstellen"}>

                </StyledFormHeader>
            </StyledForm>
        </div>
    )
}