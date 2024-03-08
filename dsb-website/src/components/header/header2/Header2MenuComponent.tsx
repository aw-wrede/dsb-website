import "./header2MenuStyle.sass"
import {Component, useEffect, useState} from "react";
import {
    SITE_ARCHIVE_URL,
    SITE_CALENDAR_URL,
    SITE_HOME_URL,
    SITE_SEASON_URL,
    SITE_TEAM_URL
} from "../../../definitions/vars";
import {getSiteName} from "../../../functions/functions";
import {HEADER_TITLE} from "../../../definitions/constants";

export default function Header2MenuComponent({activeSite}) {

    const [scrollPosition, setScrollPosition] = useState(0)
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.scrollY)
        }
        window.addEventListener('scroll', updatePosition)
        updatePosition()

        return () => window.removeEventListener('scroll', updatePosition)
    })

    return (
        <header className={`header-container ${scrollPosition > 0 || opened ? "with-bg" : ""}`}>
            <div className="header-brand">
                <h1 className="brand-text">{HEADER_TITLE}</h1>
                <img className="brand-logo" src="/images/dsb-logo-256.webp" alt=""/>
            </div>
            <div className="header-menu">
                <div className="mobile-menu-button" onClick={() => setOpened(!opened)}>
                    <span className="menu-button-icon material-icons">menu</span>
                </div>
                <ul className={`menu-list ${opened ? "open" : ""}`}>
                    <MenuElement activeSite={activeSite} siteUrl={SITE_HOME_URL} />
                    <MenuElement activeSite={activeSite} siteUrl={SITE_TEAM_URL} />
                    {/* <MenuElement activeSite={activeSite} siteUrl={SITE_SEASON_URL} /> */}
                    { /*<MenuElement activeSite={activeSite} siteUrl={SITE_CALENDAR_URL} /> */}
                    <MenuElement activeSite={activeSite} siteUrl={SITE_ARCHIVE_URL} />
                </ul>
            </div>
        </header>
    )
}

class MenuElement extends Component<{ activeSite: string, siteUrl: string }> {
    render() {
        let {activeSite, siteUrl} = this.props;
        return (
            <li className={`${activeSite === siteUrl ? "current" : ""}`}>
                <a href={siteUrl}>{getSiteName(siteUrl)}</a>
            </li>
        )
    }
}