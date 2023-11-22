import {Localization} from "../../interfaces/StaffData";
import CalendarComponent, {CalendarListComponent} from "../../components/calendar/CalendarComponent";
import CalendarData from "../../interfaces/CalendarData";
import {useEffect, useState} from "react";
import axios from "axios";
import {fetchCalendarData} from "../../AxiosApi";
import "./calendarStyle.sass"

export default function SiteCalendar() {
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
        <section className="main-content arrow-background fill-site site-calendar">
            <CalendarComponent calendarData={calendar} locale={Localization.German} markToday={true} />
            <CalendarListComponent calendarData={calendar} locale={Localization.German} markToday={true} />
        </section>
    )
}