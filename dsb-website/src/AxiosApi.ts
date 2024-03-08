import axios, {CancelToken} from "axios";
import {TournamentData} from "./interfaces/tournament/TournamentData";
import CalendarData from "./interfaces/CalendarData";
import {SunnyTwitchData} from "./interfaces/SunnyTwitchData";

//const API_URL = "https://splatbundesliga.de/api" //PRODUCTION
const API_URL = "http://localhost:5000/api" //TESTING
const SUNNY_API_URL = "https://sunny.eucliwood.eu"

export const axiosInstance = axios.create({
    baseURL: API_URL
})

export const sunnyAxiosInstance = axios.create({
    baseURL: SUNNY_API_URL
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