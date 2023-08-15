import {Localization} from "../../interfaces/StaffData";
import {CalendarEntry} from "../../interfaces/CalendarData";

export function getWeekdaysShortLocalized(locale:Localization) {
    switch (locale) {
        case Localization.German:
            return ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
        case Localization.English:
        case Localization.Unknown:
        default:
            return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
}

export function getMonthLocalized(date:Date, locale:Localization) {
    switch (locale) {
        case Localization.German:
            switch (date.getMonth()) {
                case 0: return "Januar"
                case 1: return "Februar"
                case 2: return "März"
                case 3: return "April"
                case 4: return "Mai"
                case 5: return "Juni"
                case 6: return "Juli"
                case 7: return "August"
                case 8: return "September"
                case 9: return "Oktober"
                case 10: return "November"
                case 11: return "Dezember"
                default: return "Unbekannter Monat"
            }
        case Localization.English:
        case Localization.Unknown:
        default:
            switch (date.getMonth()) {
                case 0: return "January"
                case 1: return "February"
                case 2: return "March"
                case 3: return "April"
                case 4: return "May"
                case 5: return "June"
                case 6: return "July"
                case 7: return "August"
                case 8: return "September"
                case 9: return "October"
                case 10: return "November"
                case 11: return "December"
                default: return "Unknown month"
            }
    }
}

export function getDayOfWeekConverted(date:Date):number {
    switch (date.getDay()) {
        case 0: return 6;
        default: return date.getDay() - 1
    }
}

export function getDaysInMonth (month, year) {
    return new Date(year, month+1, 0).getDate();
}

export function getCalendarDaysOfMonth(today:Date):Date[][] {
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    let dates:Date[][] = []
    dates[0] = []

    const weekdayOfFirstDay = getDayOfWeekConverted(firstDayOfMonth)

    //add x days to list of month before to fill row
    for(let i = weekdayOfFirstDay; i > 0; i--) {

        //go x days backwards
        const helperDate:Date = new Date(firstDayOfMonth)
        helperDate.setDate(helperDate.getDate() - i)

        dates[0].push(helperDate)
    }


    //complete first row
    for(let i = weekdayOfFirstDay; i < 7; i++) {
        const helperDate = new Date(firstDayOfMonth)
        helperDate.setDate(helperDate.getDate() + i - weekdayOfFirstDay)

        dates[0].push(helperDate)
    }

    const daysInMonth = getDaysInMonth(firstDayOfMonth.getMonth(), firstDayOfMonth.getFullYear())
    const remainingDaysInMonth = daysInMonth - dates[0][6].getDate()

    //calculate amount of rows needed to display calendar
    for(let i = 0; i < Math.ceil(remainingDaysInMonth/7); i++) {
        dates[i+1] = [] //add empty array

        //go through each day of week
        for(let j = 0; j < 7; j++) {
            const helperDate = new Date(firstDayOfMonth)

            /*
                Add amount of days in first row
                Add amount i*7 amount of days already done in prev. rows
                Add amount j of days already done in this row
             */
            helperDate.setDate(helperDate.getDate() + (daysInMonth - remainingDaysInMonth) + 7*i + j)

            dates[i+1].push(helperDate)
        }
    }

    return dates
}

export function dateIsInRange(start:Date,end:Date, date:Date) {
    return date >= start && date <=end
}

export function dateIsInRangeNoTime(start:Date,end:Date, date:Date) {
    start.setHours(0,0,0,0)
    end.setHours(23,59,59,999)

    return date.valueOf() >= start.valueOf()
        && date.valueOf() <=end.valueOf()
}

export function sameDatesNoTime(date1:Date, date2:Date) {
    date1.setHours(0,0,0,0)
    date2.setHours(0,0,0,0)
    return date1.valueOf() === date2.valueOf()
}

export function calendarEntryIsBeginning(entry:CalendarEntry, date:Date) {
    return sameDatesNoTime(new Date(entry.startTime), date)
}

export function calendarEntryIsEnding(entry:CalendarEntry, date:Date) {
    return sameDatesNoTime(new Date(entry.endTime), date)
}

export function calendarEntryShouldDisplayName(calendarTable:Date[][], entry:CalendarEntry, date:Date) {
    if(calendarEntryIsBeginning(entry, date)) return true;
    if(sameDatesNoTime(calendarTable[0][0], date)) return true;
}