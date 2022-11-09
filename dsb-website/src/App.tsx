import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SiteHome from "./sites/home/SiteHome";

import "./style/style.sass"
import SiteArchive from "./sites/archiv/SiteArchive";
import Header2MenuComponent from "./components/header/header2/Header2MenuComponent";
import {SITE_ARCHIVE, SITE_HOME, SITE_SEASON, SITE_TEAM} from "./definitions/vars";
import SiteTeam from "./sites/team/SiteTeam";
import SiteSeason from "./sites/season/SiteSeason";

function App() {

    const [path, setPath] = useState(window.location.pathname)

    useEffect(() => {
        //setPath(window.location.pathname)
    }, [])

    return (
    <div className="App">
        <Header2MenuComponent activeSite={path} />
        <Router>
            <Routes>
                <Route path={SITE_HOME} element={<SiteHome />} />
                <Route path={SITE_TEAM} element={<SiteTeam />} />
                <Route path={SITE_SEASON} element={<SiteSeason />} />
                <Route path={SITE_ARCHIVE} element={<SiteArchive />} />

            </Routes>
        </Router>
    </div>
    );
}

export default App;
