import {dateGetDayEuropean, dateToInputString, getDaysInMonth} from "../../../../functions/dateFunctions.ts";
import {pad} from "../../../../functions/functions.ts";
import StyledIcon from "../../../StyledIcon.tsx";
import FrameworkIcon from "../../../FrameworkIcon.ts";

export default function StyledDateInput({date, setDate}: {date: Date; setDate: (date: Date) => void}) {

    function changeMonth(m:number):void {
        const newDate = new Date(date)
        newDate.setMonth(m)
        newDate.setMonth(m)
        setDate(newDate)
    }

    function changeYear(y:number):void {
        const newDate = new Date(date)
        newDate.setFullYear(y)
        newDate.setFullYear(y)
        setDate(newDate)
    }

    function changeDate(d:number):void {
        const newDate = new Date(date)
        newDate.setDate(d)
        setDate(newDate)
    }

    function generateTable():string[][] {
        const table:string[][] = []

        const daysInMonth = getDaysInMonth(date)
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1)

        const offset = dateGetDayEuropean(startDate)

        let row:string[] = []
        for(let i = 0; i < daysInMonth + offset; i++) {
            if(i < offset) {
                row.push("")
                continue
            }

            const day = i-offset+1
            row.push(day.toString())

            if(row.length > 6 || (i+1) === daysInMonth+offset) {
                table.push(row)
                row = []
            }

        }

        return table
    }

    function getStylingClass(day:string):string {
        if(day == null || day == "") {
            return ""
        }

        const d = parseInt(day)
        return d === date.getDate() ? "selected" : ""
    }

    return <div className={"ui-date-picker"}>
        <input className="input-field-date" type="date" value={dateToInputString(date)} readOnly={true} />

        <div className={"picker-wrapper"}>
            <div className="section date-month-year">
                <div className="date-month ui-selector">
                    <StyledIcon icon={FrameworkIcon.Left} onClick={() => {changeMonth(date.getMonth() - 1)}} />
                    <p className="date-month-display selector-display">{pad(date.getMonth() + 1, 2)}</p>
                    <StyledIcon icon={FrameworkIcon.Right} onClick={() => {changeMonth(date.getMonth() + 1)}} />
                </div>
                <div className="date-year ui-selector">
                    <StyledIcon icon={FrameworkIcon.Left} onClick={() => {changeYear(date.getFullYear() - 1)}} />
                    <p className="date-year-display selector-display">{pad(date.getFullYear(), 4)}</p>
                    <StyledIcon icon={FrameworkIcon.Right} onClick={() => {changeYear(date.getFullYear() + 1)}} />
                </div>
            </div>

            <div className="date-day">
                <table className="date-day-table">
                    <thead className="table-head">
                    <tr>
                        <td>Mo</td>
                        <td>Di</td>
                        <td>Mi</td>
                        <td>Do</td>
                        <td>Fr</td>
                        <td>Sa</td>
                        <td>So</td>
                    </tr>
                    </thead>
                    <tbody className="table-body date-days">
                    {generateTable().map((row:string[], i:number) =>
                        <tr key={i}>
                            {row.map((day:string, j:number) =>
                                <td key={j} onClick={() => changeDate(parseInt(day))} className={getStylingClass(day)}>{day}</td>)}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}