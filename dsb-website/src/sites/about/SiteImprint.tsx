import {Helmet, HelmetProvider} from "react-helmet-async"
import {DISCORD_LINK, INSTAGRAM_LINK, TIKTOK_LINK, TWITTER_LINK, YOUTUBE_LINK} from "../../definitions/constants";
import './styleAbout.sass'
import FooterComponent from "../../components/footer/FooterComponent";
export default function SiteImprint() {
    return (
        <div className={`main-content arrow-background fill-site`}>
            <HelmetProvider>
                <Helmet>
                    <meta name={"robots"} content={"noindex"}/>
                </Helmet>
            </HelmetProvider>
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
                        <p>Twitter: {TWITTER_LINK}</p>
                        <p>Twitch: {TWITTER_LINK}</p>
                        <p>YouTube: {YOUTUBE_LINK}</p>
                        <p>Instagram: {INSTAGRAM_LINK}</p>
                        <p>TikTok: {TIKTOK_LINK}</p>
                    </div>
                </div>

                <div>
                    <h3>Angaben gemäß § 5 TMG</h3>
                    <div>
                        <p>Deutsche Splat Bundesliga e.V.</p>
                        <p>Heimgarten 14a</p>
                        <p>38112, Braunschweig</p>
                        <p>Telefon: +49 162 33 54 859</p>
                        <p>E-Mail: deutschesplatoonbundesliga@gmail.com</p>
                    </div>
                </div>

                <div>
                    <h3>Eintragung</h3>
                    <p>Register: Amtsgericht Braunschweig</p>
                    <p>Registernummer: 202281</p>
                </div>

            </div>
            <FooterComponent />
        </div>
    )
}