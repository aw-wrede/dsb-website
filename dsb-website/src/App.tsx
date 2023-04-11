import React, {useEffect, useState} from 'react';
import {Helmet, HelmetProvider} from "react-helmet-async"
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SiteHome from "./sites/home/SiteHome";

import "./style/style.sass"
import SiteArchive from "./sites/archiv/SiteArchive";
import Header2MenuComponent from "./components/header/header2/Header2MenuComponent";
import {SITE_ARCHIVE_URL, SITE_HOME_URL, SITE_IMPRINT_URL, SITE_PRIVACY_URL, SITE_SEASON_URL, SITE_TEAM_URL} from "./definitions/vars";
import SiteTeam from "./sites/team/SiteTeam";
import SiteSeason from "./sites/season/SiteSeason";
import SiteImprint from "./sites/about/SiteImprint";
import SitePrivacy from "./sites/about/SitePrivacy";
import {getSiteTitle} from "./functions";

function App() {

    const [path, setPath] = useState(window.location.pathname)

    useEffect(() => {
        //setPath(window.location.pathname)
    }, [])

    return (
    <div className="App">

        <HelmetProvider>
            <Helmet>
                <title>{getSiteTitle(path)}</title>
            </Helmet>
        </HelmetProvider>

        <Header2MenuComponent activeSite={path} />
        <Router>
            <Routes>
                <Route path={SITE_HOME_URL} element={<SiteHome />} />
                <Route path={SITE_TEAM_URL} element={<SiteTeam />} />
                <Route path={SITE_SEASON_URL} element={<SiteSeason />} />
                <Route path={SITE_ARCHIVE_URL} element={<SiteArchive />} />

                <Route path={SITE_IMPRINT_URL} element={<SiteImprint />} />
                <Route path={SITE_PRIVACY_URL} element={<SitePrivacy />} />
            </Routes>
        </Router>
    </div>
    );
}

export default App;
