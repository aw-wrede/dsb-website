import {useState, useEffect} from "react";

import "./menuStyle.sass"

export default function MenuComponent() {
    const [opened, setOpened]:[boolean, any] = useState(false)

    return (
        <div className={`main-menu ${opened ? "opened" : ""}`}>
            <div className="menu-button-container">
                <div className="menu-button" onClick={() => setOpened(!opened)}>
                    <span className="menu-button-icon material-icons">menu</span>
                </div>
            </div>
            <div className="menu-content">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/team">Team</a></li>
                    <li><a href="/season">Aktuelle Season</a></li>
                    <li><a href="/dsl">DSL</a></li>
                    <li><a href="/archiv">Turnier-Archiv</a></li>
                </ul>
            </div>
        </div>
    )
}