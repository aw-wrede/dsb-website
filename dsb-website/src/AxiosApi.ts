import axios, {CancelToken} from "axios";
import {TournamentData} from "./interfaces/tournament/TournamentData";
import CalendarData from "./interfaces/CalendarData";

//const API_URL = "https://castingapi.venatus247.de" //PRODUCTION
const API_URL = "http://localhost:5000" //TESTING

export const axiosInstance = axios.create({
    baseURL: API_URL
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