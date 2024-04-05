import {Localization} from "../../interfaces/StaffData";
import CalendarComponent, {CalendarListComponent} from "../../components/calendar/CalendarComponent";
import CalendarData from "../../interfaces/CalendarData";
import {useEffect, useState} from "react";
import axios from "axios";
import {fetchCalendarData} from "../../AxiosApi";
import "./calendarStyle.sass"
import {isMobileDevice} from "../../functions/functions";

export default function SiteCalendar() {
    const [calendar, setCalendar]:[CalendarData[]|null, any] = useState(null)

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

    function CalendarOnlyOnDesktop() {
        if(isMobileDevice()) {
            return null
        }

        return <CalendarComponent calendarData={calendar} locale={Localization.German} markToday={true} />
    }

    return (
        <section className="main-content arrow-background fill-site site-calendar">
            <CalendarOnlyOnDesktop />
            <CalendarListComponent calendarData={calendar} locale={Localization.German} markToday={true} />
        </section>
    )
}