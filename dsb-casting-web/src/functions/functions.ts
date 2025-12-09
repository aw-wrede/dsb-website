export function pad(num:number, length:number):string {
    let s = num.toString()
    while (s.length < length) {
        s = "0" + s
    }

    return s
}

export function stringIsNullOrEmpty(s:string|null|undefined):boolean {
    if(s == null) {
        return true
    }
    return s === ""
}

export function getBaseUrl():string {
    return window.location.origin
}