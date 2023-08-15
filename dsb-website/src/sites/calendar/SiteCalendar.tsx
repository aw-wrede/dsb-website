import {Localization} from "../../interfaces/StaffData";
import CalendarStandaloneComponent from "../../components/calendar/CalendarStandaloneComponent";

export default function SiteCalendar() {
    return (
        <section className="main-content arrow-background fill-site">
            <CalendarStandaloneComponent locale={Localization.German} />
        </section>
    )
}