import "./footerStyle.sass"
import {COPYRIGHT} from "../../definitions/constants";
import {SITE_IMPRINT, SITE_PRIVACY} from "../../definitions/vars";

export default function FooterComponent() {
    return (
        <footer className="footer">
            <div className="copyright-container">
                <p>{COPYRIGHT()}</p>
            </div>
            <div className="about-container">
                <a href={SITE_IMPRINT}>Impressum</a>
                <a href={SITE_PRIVACY}>Datenschutzerklärung</a>
            </div>
        </footer>
    )
}