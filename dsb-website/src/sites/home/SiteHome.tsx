import "./homeStyle.sass"
import HomeSocialsComponent from "./components/HomeSocialsComponent";
import FooterComponent from "../../components/footer/FooterComponent";
import HomeSliderComponent from "./components/HomeSliderComponent";
import HomeDefaultLandingComponent from "./components/HomeDefaultLandingComponent";

export default function SiteHome() {
    return(
        <div className="home">
            <div className="sections">
                <HomeSliderComponent />

                <section className="section-socials arrow-background">
                    <HomeSocialsComponent />
                    <FooterComponent />
                </section>
            </div>

        </div>
    )
}