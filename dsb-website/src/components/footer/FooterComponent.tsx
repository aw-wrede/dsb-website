import "./footerStyle.sass"
import {COPYRIGHT} from "../../definitions/constants";
import {SITE_IMPRINT_URL, SITE_PRIVACY_URL} from "../../definitions/vars";
import {getSiteName} from "../../functions/functions";

export default function FooterComponent() {
    return (
        <footer className="footer">
            <div className="copyright-container">
                <p>{COPYRIGHT()}</p>
            </div>
            <div className="about-container">
                <a href={SITE_IMPRINT_URL}>{getSiteName(SITE_IMPRINT_URL)}</a>
                <a href={SITE_PRIVACY_URL}>{getSiteName(SITE_PRIVACY_URL)}</a>
            </div>
        </footer>
    )
}