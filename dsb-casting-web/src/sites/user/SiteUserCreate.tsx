import UserInfo from "../../interfaces/user/UserInfo.ts";

export default function SiteUserCreate({user}:{user:UserInfo}) {
    // const user = useContext<UserInfo>(UserContext)

    return (
        <div className={"content"}>
            <p>{user.user.name}</p>
        </div>
    )
}