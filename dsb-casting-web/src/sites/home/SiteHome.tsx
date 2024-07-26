import StyledLinkButton from "../../framework/form/button/StyledLinkButton.tsx";
import LoginStatus from "../../interfaces/LoginStatus.ts";
import AppUserGroup from "../../interfaces/user/AppUserGroup.ts";
import {useContext} from "react";
import UserInfo from "../../interfaces/user/UserInfo.ts";
import {UserContext} from "../../App.tsx";

import "./siteHome.sass"

export default function SiteHome() {
    const user = useContext<UserInfo>(UserContext)

    return <div className={"content"}>
        {user.loginStatus === LoginStatus.Authorized ? (
            <div className="overview">
                <h1>Nutzereinstellungen</h1>
                {user.user.userGroup >= AppUserGroup.Privileged ?
                    <StyledLinkButton href={"/user/list"}>Liste aller Nutzer</StyledLinkButton>
                    : null}
                <StyledLinkButton href={"/user"}>
                    Eigenen Nutzer bearbeiten
                </StyledLinkButton>

                <h1>Overlays</h1>
                <StyledLinkButton href={"/overlay/template/list"}>Overlay-Vorlagen</StyledLinkButton>
                {user.user.userGroup >= AppUserGroup.Privileged ?
                    <StyledLinkButton href={"/overlay/template/create"}>Overlay-Vorlage erstellen</StyledLinkButton>
                    : null}

                <StyledLinkButton href={"/overlay/list"}>
                    Overlays
                </StyledLinkButton>

                <StyledLinkButton href={"/overlay/create"}>
                    Overlay erstellen
                </StyledLinkButton>

                {user.user.userGroup >= AppUserGroup.Privileged ?
                    <div>
                        <h1>Teams</h1>
                        <StyledLinkButton href={"/team/list"}>
                            Teams
                        </StyledLinkButton>
                        <StyledLinkButton href={"/team/create"}>
                            Team erstellen
                        </StyledLinkButton>
                    </div>
                    : null}

            </div>
        ) : null}

    </div>
}