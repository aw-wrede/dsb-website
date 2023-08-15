import {
    calendarEntryIsBeginning, calendarEntryIsEnding,
    calendarEntryShouldDisplayName,
    dateIsInRange,
    dateIsInRangeNoTime,
    getCalendarDaysOfMonth, getMonthLocalized,
    getWeekdaysShortLocalized, sameDatesNoTime
} from "./calendarFunctions";

import './calendarComponentStyle.sass'
import {Component, useEffect, useState} from "react";
import CalendarData, {CalendarEntry} from "../../interfaces/CalendarData";

export default function CalendarComponent({calendarData, locale, markToday}) {

    const [calendarScopeDate, setCalendarScopeDate]:[Date, any] = useState(new Date())
    const [calendarTable, setCalendarTable]:[Date[][], any] = useState([])

    useEffect(() => {
        setCalendarTable(getCalendarDaysOfMonth(calendarScopeDate))
    }, [calendarScopeDate])

    const today = new Date()

    function changeScopeDate(amountOfMonths) {
        const newDate = new Date(calendarScopeDate)
        newDate.setDate(1)
        newDate.setMonth(newDate.getMonth() + amountOfMonths)
        setCalendarScopeDate(newDate)
    }

    function monthUpClick() {
        changeScopeDate(1)
    }

    function monthDownClick() {
        changeScopeDate(-1)
    }

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <div className="header-month">
                    {/* Calendar Month and Year */}
                    <p>{getMonthLocalized(calendarScopeDate, locale)} {calendarScopeDate.getFullYear()}</p>
                </div>
                <div className="header-switcher">
                    {/* Month Switch Buttons */}
                    <span className="material-icons" onClick={monthDownClick}>expand_less</span>
                    <span className="material-icons" onClick={monthUpClick}>expand_more</span>
                </div>
            </div>
            <table className="calendar-table">
                <thead>
                    <tr>
                        {/* Table Header */}
                        {getWeekdaysShortLocalized(locale).map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {calendarTable.map(((calendarRow, index) => (
                        <tr key={index}>
                            {calendarRow.map((calendarDate, index) => (
                                <td key={index} className={
                                    `${calendarScopeDate.getMonth() !== calendarDate.getMonth() ? "otherMonth " : ""}` +    //grey out days that are not the month to focus
                                    `${markToday && sameDatesNoTime(today, calendarDate) ? "today " : ""}`        //mark day as today (independent of month that should be displayed)
                                }>
                                    <div className="date-date-container">
                                        <p className="date-date">{calendarDate.getDate()}</p>
                                    </div>
                                    <div className="date-container">
                                        <CalendarDateEntries calendarTable={calendarTable} calendarData={calendarData} date={calendarDate} />
                                    </div>

                                </td>
                            ))}
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    )
}

class CalendarDateEntries extends Component<{ calendarTable:Date[][], calendarData: CalendarData[], date: Date }> {
    render() {
        let {calendarTable, calendarData, date} = this.props;
        if (calendarData.length === 0) return (<div></div>)

        let allEvents:CalendarEntry[] = []

        //go through each calendar and get all events
        calendarData.forEach((calendar) => {
            const events = calendar.calendarEntries.filter((elem) => {
                const start = new Date(elem.startTime)
                const end = new Date(elem.endTime)

                if(elem.colorHex == null) elem.colorHex = calendar.colorHex

                return dateIsInRangeNoTime(start, end, date)
            })

            allEvents = allEvents.concat(events)
        })

        if(allEvents.length === 0) return (<div></div>)

        return (
            <div className="date-entries">
                {allEvents.map((event, index) => (
                    <div key={index} className={
                        `date-entry ${calendarEntryIsBeginning(event, date) ? "entry-beginning" : ""} ${calendarEntryIsEnding(event, date) ? "entry-ending" : ""}`
                        } style={{background: event.colorHex?? "none"}}
                    >
                        <p className={!calendarEntryShouldDisplayName(calendarTable, event, date) ? "hide-name" : ""}>{event.name}</p>
                    </div>
                ))}
            </div>
        )
    }
}