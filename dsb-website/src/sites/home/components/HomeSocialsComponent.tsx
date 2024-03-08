import {
    DISCORD_LINK,
    INSTAGRAM_LINK,
    TIKTOK_LINK,
    TWITCH_LINK,
    X_LINK,
    YOUTUBE_LINK
} from "../../../definitions/constants";
import {
    DISCORD_LOOKING_FOR_CHANNEL_PLAYER,
    DISCORD_LOOKING_FOR_CHANNEL_TEAM,
    DISCORD_NAME,
    TEAMS_LAST_SEASON
} from "../../../definitions/vars";

export default function HomeSocialsComponent() {
    return (
        <div className="socials-wrapper">
            <div className="social-discord-server-container">
                <div className="info-text">
                    <h1>Willkommen in Splatsville!</h1>
                    <p>Tritt jetzt unserem Discord-Server bei, um keine Events mehr zu verpassen und an Turnieren teilzunehmen.</p>
                    <p>Falls du noch kein Team hast oder Spieler für deines benötigst, kannst du einfach unter <i>{DISCORD_LOOKING_FOR_CHANNEL_TEAM}</i> ein Team bzw. unter <i>{DISCORD_LOOKING_FOR_CHANNEL_PLAYER}</i> Spieler finden.</p>
                </div>
                <DiscordObject href={DISCORD_LINK} />
            </div>
            <div>
                <div className="info-text">
                    <h1>Die DSB auf Social Media</h1>
                    <p>Egal ob Livestreams auf Twitch, vergangene Matches auf YouTube oder die heißesten News auf Twitter, die DSB versorgt euch vielseitig mit Content rund um Turniere und so einiges mehr.</p>
                </div>
                <div className="socials-list">
                    <SocialObject href={TWITCH_LINK} logo={"/logos/twitch-white.svg"} className="twitch" ariaLabel="Besuche die DSB auf Twitch"/>
                    <SocialObject href={YOUTUBE_LINK} logo={"/logos/youtube-white.png"} className="youtube" ariaLabel="Besuche die DSB auf YouTube"/>
                    <SocialObject href={X_LINK} logo={"/logos/x-white.svg"} className="x" ariaLabel="Besuche die DSB auf X"/>
                    <SocialObject href={INSTAGRAM_LINK} logo={"/logos/instagram-white.svg"} className="instagram" ariaLabel="Besuche die DSB auf Instagram"/>
                    <SocialObject href={TIKTOK_LINK} logo={"/logos/tiktok-white.svg"} className="tiktok" ariaLabel="Besuche die DSB auf TikTok"/>
                </div>
            </div>
        </div>

    )
}

function DiscordObject({href}) {
    return (
        <div className="social-discord-box">
            <div className="discord-server-info">
                <img className="discord-server-logo" src="/images/dsb-logo-256.webp" alt=""/>
                <div className="discord-info-text">
                    <p className="dc-main">{DISCORD_NAME}</p>
                    <p className="dc-weak">{`${TEAMS_LAST_SEASON} Teams letzte Season`}</p>
                </div>
            </div>
            <div className="discord-join-button">
                <a href={href} target="_blank">Join</a>
            </div>
        </div>
    )
}

function SocialObject({href, logo, className, ariaLabel}) {
    return (
        <a className={`socials-container ${className}`} href={href} target="_blank" rel="noreferrer" aria-label={ariaLabel}>
            <img className="socials-img" src={logo} alt=""/>
        </a>
    )
}