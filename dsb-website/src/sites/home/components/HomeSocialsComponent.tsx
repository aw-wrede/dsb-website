import {
    DISCORD_LINK,
    INSTAGRAM_LINK,
    TIKTOK_LINK,
    TWITCH_LINK,
    TWITTER_LINK,
    YOUTUBE_LINK
} from "../../../definitions/constants";
import {
    DISCORD_LOOKING_FOR_CHANNEL_PLAYER,
    DISCORD_LOOKING_FOR_CHANNEL_TEAM,
    DISCORD_NAME,
    DISCORD_TEAMS_LAST_SEASON
} from "../../../definitions/vars";

export default function HomeSocialsComponent() {
    return (
        <div className="socials-wrapper">
            <div className="social-discord-server-container">
                <div className="info-text">
                    <h1>Willkommen in Splatsville!</h1>
                    <p>Tritt jetzt unseren Discord-Server bei, um kein Event mehr zu verpassen und um an Turnieren teilzunehmen.</p>
                    <p>Falls du noch kein Team hast oder Spieler für deines beötigst, kannst du einfach unter <i>{DISCORD_LOOKING_FOR_CHANNEL_TEAM}</i> ein Team bzw. unter <i>{DISCORD_LOOKING_FOR_CHANNEL_PLAYER}</i> Spieler finden.</p>
                </div>
                <DiscordObject href={DISCORD_LINK} />
            </div>
            <div>
                <div className="info-text">
                    <h1>Die DSB auf Social Media</h1>
                    <p>Egal ob Livestreams auf Twitch, vergangene Matches auf YouTube oder die heißesten News auf Twitter, die DSB versorgt euch vielseitig mit Content rund um Turniere und so einiges mehr.</p>
                </div>
                <div className="socials-list">
                    <SocialObject href={TWITCH_LINK} logo={"/logos/twitch-white.svg"} className="twitch"/>
                    <SocialObject href={YOUTUBE_LINK} logo={"/logos/youtube-white.png"} className="youtube"/>
                    <SocialObject href={TWITTER_LINK} logo={"/logos/twitter-white.svg"} className="twitter"/>
                    <SocialObject href={INSTAGRAM_LINK} logo={"/logos/instagram-white.svg"} className="instagram"/>
                    <SocialObject href={TIKTOK_LINK} logo={"/logos/tiktok-white.svg"} className="tiktok"/>
                </div>
            </div>
        </div>

    )
}

function DiscordObject({href}) {
    return (
        <div className="social-discord-box">
            <div className="discord-server-info">
                <img className="discord-server-logo" src="/dsb-logo.jpg" alt=""/>
                <div className="discord-info-text">
                    <p className="dc-main">{DISCORD_NAME}</p>
                    <p className="dc-weak">{`${DISCORD_TEAMS_LAST_SEASON} Teams letzte Season`}</p>
                </div>
            </div>
            <div className="discord-join-button">
                <a href={href} target="_blank">Join</a>
            </div>
        </div>
    )
}

function SocialObject({href, logo, className}) {
    return (
        <a className={`socials-container ${className}`} href={href} target="_blank">
            <img className="socials-img" src={logo} alt=""/>
        </a>
    )
}