export default interface CalendarData {
    uuid:string
    name:string
    colorHex:string
    calendarEntries:CalendarEntry[]
}
export interface CalendarEntry {
    name:string
    startTime:string
    endTime:string
    location:string
    locationUrl:string
    colorHex:string|null
}