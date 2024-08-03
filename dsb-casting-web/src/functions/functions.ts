export function pad(num:number, length:number):string {
    let s = num.toString()
    while (s.length < length) {
        s = "0" + s
    }

    return s
}