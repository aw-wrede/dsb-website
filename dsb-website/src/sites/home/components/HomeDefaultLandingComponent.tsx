export default function HomeDefaultLandingComponent() {
    return (
        <section className="landing-section">
            <div className="img-container">
                <picture>
                    <source media="(min-width: 740px)" srcSet="/images/main-banner.webp"/>
                    <img src="/images/main-banner-mobile.webp" alt=""/>
                </picture>

            </div>
            {/**
             <div className="landing-content">
                <img className="dsb-logo" src="/dsb-logo.jpg" alt=""/>
            <h1 className="headline">{HEADER_TITLE}</h1>
            </div>**/}

        </section>
    )
}