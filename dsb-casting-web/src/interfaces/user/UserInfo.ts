import AppUser from "./AppUser.ts";
import LoginStatus from "../LoginStatus.ts";
import Localization from "../Localization.tsx";

export default interface UserInfo {
    user: AppUser|null
    localization:Localization
    loginStatus: LoginStatus
}