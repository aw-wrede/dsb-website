import "./header2MenuStyle.sass"
import {useEffect, useState} from "react";
import {SITE_ARCHIVE, SITE_HOME} from "../../../definitions/vars";

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
                <h1 className="brand-text">Deutsche Splatoon Bundesliga</h1>
                <img className="brand-logo" src="/dsb-logo.jpg" alt=""/>
            </div>
            <div className="header-menu">
                <div className="mobile-menu-button" onClick={() => setOpened(!opened)}>
                    <span className="menu-button-icon material-icons">menu</span>
                </div>
                <ul className={`menu-list ${opened ? "open" : ""}`}>
                    <li className={`${activeSite === SITE_HOME ? "current" : ""}`}><a href={SITE_HOME}>Home</a></li>
                    <li className={`${activeSite === "/team" ? "current" : ""}`}><a href="/team">Team</a></li>
                    <li className={`${activeSite === "/season" ? "current" : ""}`}><a href="/season">Aktuelle Season</a></li>
                    <li className={`${activeSite === "/dsl" ? "current" : ""}`}><a href="/dsl">DSL</a></li>
                    <li className={`${activeSite === SITE_ARCHIVE ? "current" : ""}`}><a href={SITE_ARCHIVE}>Turnier-Archiv</a></li>
                </ul>
            </div>
        </header>
    )
}