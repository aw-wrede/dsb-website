import axios, {CancelToken} from "axios";
import {TournamentData} from "./interfaces/tournament/TournamentData";
import CalendarData from "./interfaces/CalendarData";
import {SunnyTwitchData} from "./interfaces/SunnyTwitchData";

const API_URL = "https://splatbundesliga.de/api" //PRODUCTION
//const API_URL = "http://localhost:5000/api" //TESTING
const SUNNY_API_URL = "https://dsb.inkelberg.de"

export const axiosInstance = axios.create({
    baseURL: API_URL
})

export const sunnyAxiosInstance = axios.create({
    baseURL: SUNNY_API_URL
})

export const venatusAxiosInstance = axios.create({
    baseURL: "https://venatus247.de"
})

export const fetchTournamentData = async (uuid:string, cancelToken:CancelToken):Promise<TournamentData|null> => {
    try {
        const result = await axiosInstance.get(`/tournament/get/${uuid}`, {cancelToken:cancelToken})
        if(result.status !== 200)
            return null
        const data:TournamentData = result.data
        return data
    } catch (e) {}

    return null;
}

export const fetchCalendarData = async (cancelToken:CancelToken):Promise<CalendarData|null> => {
    try {
        const result = await axiosInstance.get("/calendar/getall", {cancelToken:cancelToken})
        if(result.status !== 200)
            return null

        const data:CalendarData = result.data
        return data
    } catch (e) {}

    return null
}

export async function fetchTwitchLiveData(cancelToken:CancelToken):Promise<SunnyTwitchData|null> {
    try {
        const result = await sunnyAxiosInstance.get("/streaminfo", {cancelToken:cancelToken})
        if(result.status !== 200)
            return null

        const data:SunnyTwitchData = result.data
        return data
    } catch (e) {}

    return null
}

export async function fetchVenatusData(cancelToken:CancelToken):Promise<boolean|null> {
    try {
        const result = await venatusAxiosInstance.get("/dsb-check.json", {cancelToken:cancelToken})
        if(result.status !== 200) {
            return null
        }
        return result.data.enabled
    } catch (e) {}
    return null
}