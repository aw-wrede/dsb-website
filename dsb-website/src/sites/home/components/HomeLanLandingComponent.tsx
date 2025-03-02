export default function  HomeLanLandingComponent() {

    return (
        <section className="landing-section">
            <div className="img-container">
                <video className="lan-video" src="/videos/dsb-lan.mp4" width={"100%"} height={"100%"} autoPlay={true} muted={true} loop={true} playsInline={true}>
                </video>
            </div>
        </section>
    )
}