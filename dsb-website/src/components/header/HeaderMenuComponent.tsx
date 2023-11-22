import "./headerMenuStyle.sass"
import {HEADER_TITLE} from "../../definitions/constants";

export default function HeaderMenuComponent({activeSite}) {
    return (
        <div className="header-menu-container">
            <div className="header-brand">
                <h1 className="brand-text">{HEADER_TITLE}</h1>
                <img className="brand-logo" src="/images/dsb-logo.webp" alt=""/>
            </div>
            <div className="header-menu">
                <ul className="menu-list">
                    <li className={`${activeSite === "/" ? "current" : ""}`}><a href="/">Home</a></li>
                    <li className={`${activeSite === "/team" ? "current" : ""}`}><a href="/team">Team</a></li>
                    <li className={`${activeSite === "/season" ? "current" : ""}`}><a href="/season">Aktuelle Season</a></li>
                    <li className={`${activeSite === "/dsl" ? "current" : ""}`}><a href="/dsl">DSL</a></li>
                    <li className={`${activeSite === "/archiv" ? "current" : ""}`}><a href="/archiv">Turnier-Archiv</a></li>
                </ul>
            </div>
        </div>
    )
}