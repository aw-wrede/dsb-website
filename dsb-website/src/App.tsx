import React, {useEffect, useState} from 'react';
import {Helmet, HelmetProvider} from "react-helmet-async"
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SiteHome from "./sites/home/SiteHome";

import "./style/style.sass"
import SiteArchive from "./sites/archiv/SiteArchive";
import Header2MenuComponent from "./components/header/header2/Header2MenuComponent";
import {
    SITE_ARCHIVE_URL,
    SITE_CALENDAR_URL,
    SITE_HOME_URL,
    SITE_IMPRINT_URL,
    SITE_PRIVACY_URL,
    SITE_SEASON_URL,
    SITE_TEAM_URL
} from "./definitions/vars";
import SiteTeam from "./sites/team/SiteTeam";
import SiteSeason from "./sites/season/SiteSeason";
import SiteImprint from "./sites/about/SiteImprint";
import SitePrivacy from "./sites/about/SitePrivacy";
import {getSiteTitle} from "./functions/functions";
import SiteCalendar from "./sites/calendar/SiteCalendar";
import TwitchBannerComponent from "./components/twitch-banner/TwitchBannerComponent";
import axios from "axios";
import {fetchCalendarData, fetchVenatusData} from "./AxiosApi";

function App() {

    const [path, setPath] = useState(window.location.pathname)
    const [enabled, setEnabled]:[boolean|null, any] = useState(null);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        const fetchData = async () => {
            const data = await fetchVenatusData(cancelToken.token)
            if(data == null) {
                setEnabled(false)
            } else {
                setEnabled(data)
            }
        }

        fetchData()

        return () => {
            cancelToken.cancel()
        }
    }, [])

    return (
    <div className="App">
        {enabled === false ? <div className={"v-banner-info"}></div> : null}

        <HelmetProvider>
            <Helmet>
                <title>{getSiteTitle(path)}</title>
            </Helmet>
        </HelmetProvider>

        <TwitchBannerComponent />

        <Header2MenuComponent activeSite={path} />
        <Router>
            <Routes>
                <Route path={SITE_HOME_URL} element={<SiteHome />} />
                <Route path={SITE_TEAM_URL} element={<SiteTeam />} />
                <Route path={SITE_SEASON_URL} element={<SiteSeason />} />
                <Route path={SITE_ARCHIVE_URL} element={<SiteArchive />} />
                
                <Route path={SITE_CALENDAR_URL} element={<SiteCalendar />} />

                <Route path={SITE_IMPRINT_URL} element={<SiteImprint />} />
                <Route path={SITE_PRIVACY_URL} element={<SitePrivacy />} />
            </Routes>
        </Router>
    </div>
    );
}

export default App;
