import CalendarData from "../../interfaces/CalendarData";
import {useEffect, useState} from "react";
import axios from "axios";
import {fetchCalendarData} from "../../AxiosApi";
import CalendarComponent from "./CalendarComponent";

export default function CalendarStandaloneComponent({locale}) {
    const [calendar, setCalendar]:[CalendarData[]|null, any] = useState([])

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        const fetchData = async () => {
            const data = await fetchCalendarData(cancelToken.token)
            if(data != null) setCalendar(data)
        }

        fetchData()

        return () => {
            cancelToken.cancel()
        }
    }, [])

    return (
        <CalendarComponent calendarData={calendar} locale={locale} markToday={true} />
    )
}