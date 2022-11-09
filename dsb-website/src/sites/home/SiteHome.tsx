import "./homeStyle.sass"
import HomeSocialsComponent from "./components/HomeSocialsComponent";
import FooterComponent from "../../components/footer/FooterComponent";

export default function SiteHome() {
    return(
        <div className="home">
            <div className="sections">
                <section className="landing-section">
                    <div className="img-container">
                        <img src="/backgrounds/background-01-blur.jpg" alt=""/>
                    </div>
                    <div className="landing-content">
                        <img className="dsb-logo" src="/dsb-logo.jpg" alt=""/>
                        <h1 className="headline">Deutsche Splatoon Bundesliga</h1>
                    </div>
                </section>
                <section className="section-socials arrow-background">
                    <HomeSocialsComponent />
                    <FooterComponent />
                </section>
            </div>

        </div>
    )
}