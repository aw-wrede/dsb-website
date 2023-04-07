export default function  HomeLanLandingComponent() {

    return (
        <section className="landing-section">
            <div className="img-container">
                <video className="lan-video" src="/videos/dsb-lan.mp4" width={1920} height={1080} autoPlay={true} muted={true} loop={true} playsInline={true}>
                </video>
            </div>
        </section>
    )
}