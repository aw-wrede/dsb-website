import './App.css'
import "./style/style.sass"
import "./index.sass"
import {HeadProvider, Link, Meta, Title} from "react-head";
import {useState} from "react";
import TwitchBannerComponent from "./components/twitch-banner/TwitchBannerComponent.tsx";
import Header2MenuComponent from "./components/header/header2/Header2MenuComponent.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {
    SITE_ARCHIVE_URL,
    SITE_CALENDAR_URL,
    SITE_HOME_URL, SITE_IMPRINT_URL, SITE_PRIVACY_URL,
    SITE_SEASON_URL,
    SITE_TEAM_URL
} from "./definitions/vars.ts";
import SiteHome from "./sites/home/SiteHome.tsx";
import SiteTeam from "./sites/team/SiteTeam.tsx";
import SiteSeason from "./sites/season/SiteSeason.tsx";
import SiteArchive from "./sites/archiv/SiteArchive.tsx";
import SiteCalendar from "./sites/calendar/SiteCalendar.tsx";
import SiteImprint from "./sites/about/SiteImprint.tsx";
import SitePrivacy from "./sites/about/SitePrivacy.tsx";
import {getSiteTitle} from "./functions/functions.tsx";

function App() {
    const [path] = useState(window.location.pathname)

    return (
        <>
            <HeadProvider>
                <Meta name={'og:image'} content={'/images/dsb-logo-256.webp'} />
                <Meta name={'og:image:secure_url'} content={'/images/dsb-logo-256.webp'} />
                <Meta name={'og:type'} content={'website'} />
                <Meta name={'og:description'} content={'Events und Turniere zu Splatoon mit verschiedenen Divisionen für alle Skillklassen. Hier ist für Jeden was dabei!'} />

                <Meta name={'twitter:card'} content={'summary'} />
                <Meta name={'twitter:site'} content={'@DeutscheSplateV'} />
                <Meta name={'twitter:title'} content={'Deutsche Splat Bundesliga e.V.'} />
                <Meta name={'twitter:image'} content={'/images/dsb-logo-256.webp'} />
                <Meta name={'twitter:description'} content={'Events und Turniere zu Splatoon mit verschiedenen Divisionen für alle Skillklassen. Hier ist für Jeden was dabei!'} />

                <Meta name={'description'} content={'Events und Turniere zu Splatoon mit verschiedenen Divisionen für alle Skillklassen. Hier ist für Jeden was dabei!'} />

                <Link rel={'apple-touch-icon'} href={'/logo192.png'} />
                <Link rel={'manifest'} href={'/manifest.json'} />

                <Title>{getSiteTitle(path)}</Title>

                <Link href={'/fonts/Material-Icons.css'} rel={'stylesheet'} />
                <Link href={'/fonts/Nunito-Sans.css'} rel={'stylesheet'} />
            </HeadProvider>

            <TwitchBannerComponent />

            <Header2MenuComponent activeSite={path} />

            <BrowserRouter>
                <Routes>
                    <Route path={SITE_HOME_URL} element={<SiteHome />} />
                    <Route path={SITE_TEAM_URL} element={<SiteTeam />} />
                    <Route path={SITE_SEASON_URL} element={<SiteSeason />} />
                    <Route path={SITE_ARCHIVE_URL} element={<SiteArchive />} />

                    <Route path={SITE_CALENDAR_URL} element={<SiteCalendar />} />

                    <Route path={SITE_IMPRINT_URL} element={<SiteImprint />} />
                    <Route path={SITE_PRIVACY_URL} element={<SitePrivacy />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
