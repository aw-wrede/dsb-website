import {HEADER_TITLE} from "../../../definitions/constants";

export default function HomeDefaultLandingComponent() {
    return (
        <section className="landing-section">
            <div className="img-container">
                <img src="/backgrounds/background-01-blur.jpg" alt=""/>
            </div>
            <div className="landing-content">
                <img className="dsb-logo" src="/dsb-logo.jpg" alt=""/>
                <h1 className="headline">{HEADER_TITLE}</h1>
            </div>
        </section>
    )
}