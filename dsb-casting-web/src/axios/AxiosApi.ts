import axios, {AxiosResponse, CancelToken} from "axios";
import AppUser from "../interfaces/user/AppUser.ts";
import LoginData from "../interfaces/LoginData.ts";
import UserUpdateRequest from "./requests/UserUpdateRequest.ts";
import TourneyMap from "../interfaces/tourney/TourneyMap.ts";
import TourneyMapType from "../interfaces/tourney/TourneyMapType.ts";
import OverlayTemplate from "../interfaces/overlay/OverlayTemplate.ts";
import DictionaryKeyLocalization, {localizationKeyToLocalization} from "../interfaces/DictionaryKeyLocalization.ts";
import Localization from "../interfaces/Localization.tsx";
import UserInfo from "../interfaces/user/UserInfo.ts";
import LoginStatus from "../interfaces/LoginStatus.ts";
import TourneyTeam from "../interfaces/tourney/team/TourneyTeam.ts";
import CreateOverlayRequest from "./requests/CreateOverlayRequest.ts";
import TeamCreateResult from "./results/TeamCreateResult.ts";
import Overlay from "../interfaces/overlay/Overlay.ts";
import {getBrowserLocalization} from "../functions/localizationFunctions.ts";
import FileUploadResult from "./results/FileUploadResult.ts";
import AppUserCreateData from "../interfaces/user/AppUserCreateData.ts";
import InkColorPair from "../interfaces/inkColor/InkColorPair.ts";

const API_URL:string = "http://localhost:5000/api"
export const WEBSOCKET_URL:string = "ws://localhost:5000/api/overlay/ws"

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export async function fetchUserData(cancelToken:CancelToken, apiToken?:string): Promise<UserInfo> {
    let result: AxiosResponse<any, any>

    console.debug("Token: " + apiToken)

    try {
        result = await axiosInstance.get(`/user/get${apiToken != null ? "?apiToken=" + apiToken : ""}`, {
            cancelToken: cancelToken
        })

        if(result.status === 200) {
            return {
                user: result.data as AppUser,
                localization: getBrowserLocalization(),
                loginStatus: LoginStatus.Authorized
            }
        }

        console.error(`Could not fetch user data. Error ${result.status}: ${result.statusText}`)
    } catch (e) {
        // do not display error if request was canceled
        if(axios.isCancel(e)) {
            return {
                user: null,
                localization: getBrowserLocalization(),
                loginStatus: LoginStatus.Pending
            }
        }

        console.error(`Could not fetch user data. Error ${e.name}: ${e.message}`)
    }

    return {
        user: null,
        localization: getBrowserLocalization(),
        loginStatus: LoginStatus.InternalError
    }
}

export async function getUserData(uuid:string, cancelToken:CancelToken): Promise<AppUser> {
    let result: AxiosResponse<any, any>

try {
    result = await axiosInstance.get(`/user/get/${uuid}`, {
        cancelToken: cancelToken
    })

    if(result.status === 200) {
        return result.data as AppUser
    }

    console.error(`Could not fetch users data. Error ${result.status}: ${result.statusText}`)
    return null
} catch (e) {
    // do not display error if request was canceled
    if(axios.isCancel(e)) {
        return null
    }
    //console.error(e)
    console.error(`Could not fetch users data. Error ${e.name}: ${e.message}`)
    return null
}
}

export async function getAllUsers(cancelToken:CancelToken): Promise<AppUser[]|null> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.get("/user/getall", {
            cancelToken: cancelToken
        })

        if(result.status === 200) {
            return result.data as AppUser[]
        }

        console.error(`Could not fetch users data. Error ${result.status}: ${result.statusText}`)
        return null
    } catch (e) {
        // do not display error if request was canceled
        if(axios.isCancel(e)) {
            return null
        }
        //console.error(e)
        console.error(`Could not fetch users data. Error ${e.name}: ${e.message}`)
        return null
    }
}

export async function createNewUser(newUserData:AppUserCreateData, cancelToken:CancelToken): Promise<boolean> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.put("/user/create", newUserData, {
            cancelToken: cancelToken
        })

        if(result.status === 200) {
            return true
        }
    } catch (e) {
        // do not display error if request was canceled
        if(!axios.isCancel(e)) {
            console.error(`Could not save user data. Error ${e.name}: ${e.message}`)
        }
        return false
    }
    return false
}

export async function deleteUser(uuid:string, cancelToken:CancelToken):Promise<boolean> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.delete(`/user/delete/${uuid}`, {
            cancelToken: cancelToken
        })

        if(result.status === 200) {
            return true
        }
    } catch (e) {
        // do not display error if request was canceled
        if(!axios.isCancel(e)) {
            console.error(`Could not save user data. Error ${e.name}: ${e.message}`)
        }
        return false
    }
    return false
}

export async function saveUserData(userData:AppUser, cancelToken:CancelToken): Promise<boolean> {
    const request:UserUpdateRequest = {
        uuid: userData.uuid,
        name: userData.name,
        displayName: userData.displayName
    }

    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.post("/user/update", request, {
            cancelToken: cancelToken
        })

        if(result.status == 200) {
            return true
        }

    } catch (e) {
        // do not display error if request was canceled
        if(!axios.isCancel(e)) {
            console.error(`Could not save user data. Error ${e.name}: ${e.message}`)
        }
        return false
    }
    return false
}

export async function performLogin(data:LoginData, cancelToken:CancelToken):Promise<AppUser | null> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.post("/user/login", data, {
            cancelToken: cancelToken
        })
        if(result.status === 200) {
            return result.data as AppUser
        }

        return null
    }catch (e) {

        if(!axios.isCancel(e)) {
            console.error(`Could not login. Error ${e.name}: ${e.message}`)
        }

        return null
    }
}

export async function performLogout(cancelToken:CancelToken):Promise<boolean> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.post("/user/logout", "", {
            cancelToken: cancelToken
        })

        return result.status === 200;
    }catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not logout. Error ${e.name}: ${e.message}`)
        }

        return false
    }
}

export async function getMapData(cancelToken:CancelToken):Promise<Record<number, TourneyMap>> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.get("/map/getall", {
            cancelToken: cancelToken
        })

        if(result.status !== 200) {
            return null
        }

        const data = result.data as TourneyMap[]
        const formattedData = {} as Record<TourneyMapType, TourneyMap>

        data.forEach(map => {
            const transformedLocalization = {} as Record<Localization, string>
            for (const localizationKey in map.localizedNames) {
                transformedLocalization[localizationKeyToLocalization(localizationKey as DictionaryKeyLocalization)] = map.localizedNames[localizationKey]
            }

            map.localizedNames = transformedLocalization
            formattedData[map.mapIdentifier] = map
        })

        return formattedData
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not get map data. Error ${e.name}: ${e.message}`)
        }

        return null
    }
}

export async function getOverlayTemplate(cancelToken:CancelToken, uuid:string):Promise<OverlayTemplate> {
    let result: AxiosResponse<OverlayTemplate, any>

    try {
        result = await axiosInstance.get(`/overlay/template/${uuid}`, {
            cancelToken: cancelToken
        })

        if(result.status === 200) {
            return result.data as OverlayTemplate
        }

        console.error(`Could not get overlay templates.`)
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not get overlay template. Error ${e.name}: ${e.message}`)
        }
    }
    return null
}

export async function getAllOverlayTemplates(cancelToken:CancelToken):Promise<OverlayTemplate[]> {
    let result: AxiosResponse<OverlayTemplate[], any>

    try {
        result = await axiosInstance.get("/overlay/template/getall", {
            cancelToken: cancelToken
        })

        if(result.status === 200) {
            return result.data as OverlayTemplate[]
        }

        console.error(`Could not get overlay templates.`)
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not get overlay templates. Error ${e.name}: ${e.message}`)
        }
    }
    return []
}

export async function saveNewOverlayTemplate(cancelToken:CancelToken, template:OverlayTemplate):Promise<boolean> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.put("/overlay/template/add", template, {cancelToken:cancelToken})
        return result.status === 200
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not save overlay template. Error ${e.name}: ${e.message}`)
        }
    }
    return false
}

export async function updateOverlayTemplate(cancelToken:CancelToken, template:OverlayTemplate):Promise<boolean> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.post("/overlay/template/update", template, {cancelToken:cancelToken})
        return result.status === 200
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not update overlay template. Error ${e.name}: ${e.message}`)
        }
    }
    return false
}

export async function getOverlay(cancelToken:CancelToken, uuid:string):Promise<Overlay|null> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.get(`/overlay/${uuid}`, {cancelToken: cancelToken})
        if(result.status === 200) {
            return result.data as Overlay
        }
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not get overlay. Error ${e.name}: ${e.message}`)
        }
    }

    return null
}

export async function getAllOverlays(cancelToken:CancelToken):Promise<Overlay[]> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.get("/overlay/getall", {
            cancelToken: cancelToken
        })
        if(result.status === 200) {
            return result.data as Overlay[]
        }
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not get overlays. Error ${e.name}: ${e.message}`)
        }
    }

    return []
}

export async function getManyOverlays(cancelToken:CancelToken, uuids:string[]):Promise<Overlay[]> {
    let result: AxiosResponse<any, any>
    try {
        result = await axiosInstance.post("/overlay/getmany",
            {uuids: uuids},
            {cancelToken: cancelToken}
        )
        if(result.status === 200) {
            return result.data as Overlay[]
        }
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not get overlays. Error ${e.name}: ${e.message}`)
        }
    }

    return []
}

export async function saveNewOverlay(cancelToken:CancelToken, overlay:CreateOverlayRequest):Promise<boolean> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.put("/overlay/add", overlay, {cancelToken:cancelToken})
        return result.status === 200
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not save overlay template. Error ${e.name}: ${e.message}`)
        }
    }
    return false
}

export async function updateOverlay(cancelToken:CancelToken, overlay:CreateOverlayRequest):Promise<boolean> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.post("/overlay/update", overlay, {cancelToken:cancelToken})
        return result.status === 200
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not update overlay. Error ${e.name}: ${e.message}`)
        }
    }
    return false
}

export async function selectOverlay(cancelToken:CancelToken, uuid:string):Promise<boolean> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.get(`/overlay/select/${uuid}`, {cancelToken: cancelToken})

        return result.status === 200
    } catch (e) {
        if (!axios.isCancel(e)) {
            console.error(`Could not select overlay. Error ${e.name}: ${e.message}`)
        }
    }

    return false
}

export async function getTeam(cancelToken:CancelToken, uuid:string):Promise<TourneyTeam> {
    let result: AxiosResponse<TourneyTeam, any>

    try {
        result = await axiosInstance.get(`/team/${uuid}`, {
            cancelToken: cancelToken
        })

        if(result.status === 200) {
            return result.data as TourneyTeam
        }

        console.error(`Could not get team.`)
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not get team. Error ${e.name}: ${e.message}`)
        }
    }

    return null
}

export async function getAllTeams(cancelToken:CancelToken):Promise<TourneyTeam[]> {
    let result: AxiosResponse<TourneyTeam[], any>

    try {
        result = await axiosInstance.get("/team/getall", {
            cancelToken: cancelToken
        })

        if(result.status === 200) {
            return result.data as TourneyTeam[]
        }

        console.error(`Could not get teams.`)
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not get teams. Error ${e.name}: ${e.message}`)
        }
    }
    return []
}

export async function saveNewTeam(cancelToken:CancelToken, team:TourneyTeam):Promise<TeamCreateResult> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.put("/team/create", team, {cancelToken:cancelToken})

        console.log("Status " + result.status)

        return TeamCreateResult.Success
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not save team. Error ${e.name}: ${e.message}`)
        }

        switch(e.response.status) {
            case 409:
                return TeamCreateResult.AlreadyExists
        }
    }
    return TeamCreateResult.InternalError
}

export async function updateTeam(cancelToken:CancelToken, team:TourneyTeam):Promise<TeamCreateResult> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.post("/team/update", team, {cancelToken:cancelToken})

        if(result.status === 200) {
            return TeamCreateResult.Success
        }
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not save team. Error ${e.name}: ${e.message}`)
        }
    }
    return TeamCreateResult.InternalError
}

export async function updateTeamLogo(cancelToken:CancelToken, uuid:string, file:File):Promise<FileUploadResult> {
    let result: AxiosResponse<any, any>

    try {
        const formData = new FormData()
        formData.append("teamUuid", uuid)
        formData.append("formFile", file)

        result = await axiosInstance.post("/file/uploadTeamLogo", formData, {
            cancelToken: cancelToken,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return result.status === 200 ? FileUploadResult.Success : FileUploadResult.Failure

    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not save team logo. Error ${e.name}: ${e.message}`)
        }
    }

    return FileUploadResult.Failure
}

export async function getInkColorsPairs(cancelToken:CancelToken):Promise<InkColorPair[]|null> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.get("/color/getall", {cancelToken: cancelToken})

        if(result.status === 200) {
            return result.data as InkColorPair[]
        }
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not get ink color pairs. Error ${e.name}: ${e.message}`)
        }
    }

    return []
}

export async function getApiToken(cancelToken:CancelToken):Promise<string|null> {
    let result: AxiosResponse<any, any>

    try {
        result = await axiosInstance.get("/user/apiToken", {cancelToken: cancelToken})

        if(result.status === 200) {
            return result.data.token
        }
    } catch (e) {
        if(!axios.isCancel(e)) {
            console.error(`Could not get api token. Error ${e.name}: ${e.message}`)
        }
    }

    return null
}