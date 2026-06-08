import {DISCORD_LINK, INSTAGRAM_LINK, TIKTOK_LINK, X_LINK, YOUTUBE_LINK} from "../../definitions/constants";
import './styleAbout.sass'
import FooterComponent from "../../components/footer/FooterComponent";
import {HeadProvider, Meta} from "react-head";
export default function SiteImprint() {
    return (
        <div className={`main-content arrow-background fill-site`}>
            <HeadProvider>
                <Meta name={'robots'} content={'noindex'} />
            </HeadProvider>
            <div className="site-about site-imprint">
                <h1>Impressum</h1>
                <div>
                    <h3>Website</h3>
                    <p>Dieses Impressum gilt für alle Angebote unter der Domain splatbundesliga.de inklusive aller Subdomains (Unterseiten).</p>
                </div>

                <div>
                    <h3>Soziale Medien</h3>
                    <p>Dieses Impressum gilt auch für unsere Auftritte in den folgenden sozialen Medien:</p>
                    <div>
                        <p>Discord: {DISCORD_LINK}</p>
                        <p>X: {X_LINK}</p>
                        <p>Twitch: {X_LINK}</p>
                        <p>YouTube: {YOUTUBE_LINK}</p>
                        <p>Instagram: {INSTAGRAM_LINK}</p>
                        <p>TikTok: {TIKTOK_LINK}</p>
                    </div>
                </div>

                <div>
                    <h3>Angaben gemäß § 5 TMG</h3>
                    <div>
                        <p>Deutsche Splat Bundesliga e.V.</p>
                        <p>Wacholderweg 8</p>
                        <p>38440, Wolfsburg</p>
                        <p>Telefon: +49 162 33 54 859</p>
                        <p>E-Mail: kontakt@splatbundesliga.de</p>
                    </div>
                </div>

                <div>
                    <h3>Eintragung</h3>
                    <p>Register: Amtsgericht Braunschweig</p>
                    <p>Registernummer: 202281</p>
                </div>

                <div>
                    <h3>Vorsitz</h3>
                    <p>1. Vorsitzender: Tim Fröbe</p>
                    <p>Telefon: +49 162 33 54 859</p>
                    <p>E-Mail: nindotimrs@splatbundesliga.de</p>
                </div>

            </div>
            <FooterComponent />
        </div>
    )
}