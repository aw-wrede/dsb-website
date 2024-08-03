import {pad} from "./functions.ts";

export function dateToInputString(date: Date): string {
    return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}`
}

export function timeToInputString(date:Date):string {
    return `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}`
}

export function applyTimeInput(date:Date, time:string):boolean {
    const match = time.match(/^([0-2][0-9]):([0-5][0-9])$/)
    if(match.length !== 3) {
        return false
    }

    const hours = parseInt(match[1])
    const minutes = parseInt(match[2])
    if(isNaN(hours) || isNaN(minutes)) {
        return false
    }

    if(hours < 0 || hours > 23 || minutes < 0 ||minutes > 59) {
        return false
    }

    date.setHours(hours)
    date.setMinutes(minutes)
    return true
}

export function getDaysInMonth(date: Date): number {
    return  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export function dateGetDayEuropean(date:Date):number {
    // monday is 1, sunday is 0
    const day = date.getDay() - 1
    return day === -1 ? 6 : day
}