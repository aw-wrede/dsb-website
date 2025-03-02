import {
    calendarEntryIsBeginning, calendarEntryIsEnding,
    calendarEntryShouldDisplayName,
    dateIsInRangeNoTime, dateRangeToString,
    getCalendarDaysOfMonth, getMonthLocalized,
    getWeekdaysShortLocalized, mapCalendarsToEntryList, sameDatesNoTime
} from "./calendarFunctions";

import './calendarComponentStyle.sass'
import React, {Component, useEffect, useState} from "react";
import CalendarData, {CalendarEntry} from "../../interfaces/CalendarData";
import {Localization} from "../../interfaces/StaffData";

export default function CalendarComponent({calendarData, locale, markToday}) {

    const [calendarScopeDate, setCalendarScopeDate]:[Date, any] = useState(new Date())
    const [calendarTable, setCalendarTable]:[Date[][], any] = useState([])

    // if calendar data not yet loaded, it is null
    if(calendarData == null) {
        calendarData = []
    }

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

function getCurrentEvents(calendarData:CalendarData[]) {
    const date = new Date()

    let currentCalendarData:CalendarData[] = []

    calendarData.forEach((calendar => {
        let currentEntries:CalendarEntry[] = []
        calendar.calendarEntries.forEach(entry => {
            const start = new Date(entry.startTime)
            const end = new Date(entry.endTime)

            if(dateIsInRangeNoTime(start, end, date))
                currentEntries.push(entry)
        })

        if(currentEntries.length === 0) {
            return
        }

        currentCalendarData.push({
            name: calendar.name,
            uuid: calendar.uuid,
            colorHex: calendar.colorHex,
            calendarEntries: currentEntries
        })

    }))

    return currentCalendarData
}

function getFutureEvents(calendarData:CalendarData[]) {
    const date = new Date()

    let currentCalendarData:CalendarData[] = []

    calendarData.forEach((calendar => {
        let currentEntries:CalendarEntry[] = []
        calendar.calendarEntries.forEach(entry => {
            const start = new Date(entry.startTime)
            const end = new Date(entry.endTime)

            //entry is in future and not today
            if(start > date && !sameDatesNoTime(start, date))
                currentEntries.push(entry)
        })

        if(currentEntries.length === 0) {
            return
        }

        currentCalendarData.push({
            name: calendar.name,
            uuid: calendar.uuid,
            colorHex: calendar.colorHex,
            calendarEntries: currentEntries
        })

    }))

    return currentCalendarData
}

function getPastEvents(calendarData:CalendarData[]) {
    const date = new Date()

    let currentCalendarData:CalendarData[] = []

    calendarData.forEach((calendar => {
        let currentEntries:CalendarEntry[] = []
        calendar.calendarEntries.forEach(entry => {
            const start = new Date(entry.startTime)
            const end = new Date(entry.endTime)

            //entry is in past and not ended today
            if(end < date && !sameDatesNoTime(end, date))
                currentEntries.push(entry)
        })

        if(currentEntries.length === 0) {
            return
        }

        currentCalendarData.push({
            name: calendar.name,
            uuid: calendar.uuid,
            colorHex: calendar.colorHex,
            calendarEntries: currentEntries
        })

    }))

    return currentCalendarData
}

export class CalendarListComponent extends Component<{ calendarData: CalendarData[]|null, locale: Localization, markToday: boolean }> {

    render() {
        let {calendarData, locale, markToday} = this.props;

        const calendarLoaded = calendarData != null
        if(calendarData == null) {
            calendarData = []
        }

        function cssEntryStyle(entry:CalendarEntry):React.CSSProperties {
            return {"--entry-color": entry.colorHex} as React.CSSProperties
        }

        const displayData = [
            {
                title: "Aktuelle Events",
                placeholder: "Aktuell finden keine Events statt.",
                content: mapCalendarsToEntryList(getCurrentEvents(calendarData))
            },
            {
                title: "Zukünftige Events",
                placeholder: "Aktuell sind keine Events geplant.",
                content: mapCalendarsToEntryList(getFutureEvents(calendarData))
            },
            {
                title: "Vergangene Events",
                placeholder: "",
                content: mapCalendarsToEntryList(getPastEvents(calendarData))
            }
        ]

        //sort entries
        displayData.forEach(d => {
            d.content.sort((e1, e2) => {
                const date1 = new Date(e1.startTime)
                const date2 = new Date(e2.startTime)
                // @ts-ignore
                return date2 - date1
            })
        })

        function CalendarListEntry(entry:CalendarEntry) {
            const content = (
                <><p>{entry.name}</p><p>{dateRangeToString(new Date(entry.startTime), new Date(entry.endTime))}</p></>
            )

            return (
                <div key={entry.name} className="calendar-entry" style={cssEntryStyle(entry)}>
                    {entry.locationUrl != null ? (<a href={entry.locationUrl} target="_blank" rel="noreferrer">{content}</a>) : content}
                </div>
            )
        }

        return (
            <div className="calendar-list-container">
                {displayData.map(data => (
                    <div key={data.title} className="calendar-list-elem">
                        <h1>{data.title}</h1>
                        {!calendarLoaded ? (<p className="calendar-list-placeholder">Wird geladen...</p>) : null}
                        {calendarLoaded && data.content.length === 0 ? (<p className="calendar-list-placeholder">{data.placeholder}</p>) : null}
                        {data.content.map((entry => 
                            CalendarListEntry(entry)))
                        }
                    </div>
                ))}


            </div>
        )
    }
}

class CalendarDateEntries extends Component<{ calendarTable: Date[][], calendarData: CalendarData[], date: Date }> {
    render() {
        let {calendarTable, calendarData, date} = this.props;
        if (calendarData.length === 0) return (<div></div>)

        let allEvents: CalendarEntry[] = []

        //go through each calendar and get all events
        calendarData.forEach((calendar) => {
            const events = calendar.calendarEntries.filter((elem) => {
                const start = new Date(elem.startTime)
                const end = new Date(elem.endTime)

                if (elem.colorHex == null) elem.colorHex = calendar.colorHex

                return dateIsInRangeNoTime(start, end, date)
            })

            allEvents = allEvents.concat(events)
        })

        if(allEvents.length === 0) return (<div></div>)
        
        function Entry(event:CalendarEntry, index:number) {
            const content = (
                <div key={index} className={
                    `date-entry ${calendarEntryIsBeginning(event, date) ? "entry-beginning" : ""} ${calendarEntryIsEnding(event, date) ? "entry-ending" : ""}`
                } style={{background: event.colorHex ?? "none"}}
                >
                    <p className={!calendarEntryShouldDisplayName(calendarTable, event, date) ? "hide-name" : ""}>{event.name}</p>
                </div>
            )
            return event.locationUrl != null ? (<a key={index} href={event.locationUrl} target="_blank" rel="noreferrer">{content}</a>) : content
        }

        return (
            <div className="date-entries">
                {allEvents.map((event, index) => Entry(event, index))}
            </div>
        )
    }
}
