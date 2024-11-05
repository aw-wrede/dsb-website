import UserInfo from "../../interfaces/user/UserInfo.ts";
import {useEffect, useState} from "react";
import TourneyMapType from "../../interfaces/tourney/TourneyMapType.ts";
import TourneyMap from "../../interfaces/tourney/TourneyMap.ts";
import Overlay from "../../interfaces/overlay/Overlay.ts";
import axios from "axios";
import {getAllOverlays, getMapData, selectOverlay} from "../../axios/AxiosApi.ts";
import CollapsibleElement from "../../framework/collapsible/CollapsibleElement.ts";
import MatchList from "../../components/match/MatchList.tsx";
import StyledCollapsible from "../../framework/collapsible/StyledCollapsible.tsx";
import StyledIcon from "../../framework/StyledIcon.tsx";
import FrameworkIcon from "../../framework/FrameworkIcon.ts";
import AppUserGroup from "../../interfaces/user/AppUserGroup.ts";

import "../sitesList.sass"
import StyledInput from "../../framework/form/input/StyledInput.tsx";
import {getLiveOverlaySiteUrl, getStartupSiteUrl} from "../../functions/overlayFunctions.ts";

export default function SiteOverlayList({user, setUser}:{user:UserInfo, setUser: (user:UserInfo) => void}) {
    const [overlays, setOverlays] = useState<Overlay[]>([]);
    const [mapData, setMapData] = useState<Record<TourneyMapType, TourneyMap>>({} as Record<TourneyMapType, TourneyMap>)

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        getAllOverlays(cancelToken.token).then(setOverlays)
        getMapData(cancelToken.token).then(setMapData)

        return () => {
            cancelToken.cancel()
        }
    }, [])

    async function onSelectClick(overlay:Overlay) {
        const cancelToken = axios.CancelToken.source()

        const result = await selectOverlay(cancelToken.token, overlay.uuid)
        if(result) {
            const newUser = Object.assign({}, user)
            newUser.user.selectedOverlay = overlay.uuid

            setUser(newUser)
        }
    }

    function onDeleteClick(overlay:Overlay) {
        console.log(overlay)
    }

    function toCollapsibleElements(overlays: Overlay[]) {
        const data:CollapsibleElement[] = []

        // put selected overlay first
        const selectedOverlay = overlays.find(o => o.uuid === user.user.selectedOverlay)
        if(selectedOverlay != null) {
            data.push({
                header: <div className={"flex-row-space-between flex-vertical-center overlay-selected"}>
                    <div className={"overlay-title-wrapper flex-row flex-vertical-center"}>
                        <StyledIcon icon={FrameworkIcon.Bookmark} />
                        <p>{selectedOverlay.title}</p>
                    </div>
                    <div className={"overlay-actions"}>
                        <a href={`/overlay/edit/${selectedOverlay.uuid}`}><StyledIcon icon={FrameworkIcon.Edit}/></a>
                    </div>
                </div>,
                body: <div className={"overlay-selected"}>
                    <StyledInput name={`uuid-${selectedOverlay.uuid}`} type={"text"} value={selectedOverlay.uuid} onChange={() => {}} icon={FrameworkIcon.Fingerprint} placeholder={""} required={false} readonly={true} />
                    <div>
                        <StyledInput name={"live-startup"} type={"text"} value={`${getStartupSiteUrl()}`} onChange={() => {}} icon={FrameworkIcon.Tv} placeholder={""} required={false} readonly={true} />
                        <StyledInput name={"live-overview"} type={"text"} value={`${getLiveOverlaySiteUrl()}`} onChange={() => {}} icon={FrameworkIcon.Tv} placeholder={""} required={false} readonly={true} />
                    </div>
                    <MatchList matches={selectedOverlay.matches} mapData={mapData} localization={user.localization} setModalVisible={null} allowAdd={false} allowEdit={false} />
                </div>
            })
        }

        // remove selected overlay to not show twice
        overlays.filter(o => o.uuid !== user.user.selectedOverlay).forEach(overlay => {
            data.push({
                header: <div className={"flex-row-space-between flex-vertical-center"}>
                    <div className={"overlay-title-wrapper flex-row flex-vertical-center"}>
                        <StyledIcon icon={FrameworkIcon.Bookmark_Border} onClick={() => onSelectClick(overlay)}/>
                        <p>{overlay.title}</p>
                    </div>
                    <div className={"overlay-actions"}>
                        <a href={`/overlay/edit/${overlay.uuid}`}><StyledIcon icon={FrameworkIcon.Edit}/></a>
                        {user.user.userGroup >= AppUserGroup.Privileged ?
                            <StyledIcon icon={FrameworkIcon.Delete} onClick={() => {onDeleteClick(overlay)}} />
                            : null}
                    </div>
                </div>,
                body: <div>
                    <StyledInput name={`uuid-${overlay.uuid}`} type={"text"} value={overlay.uuid} onChange={() => {}} icon={FrameworkIcon.Fingerprint} placeholder={""} required={false} readonly={true} />
                    <MatchList matches={overlay.matches} mapData={mapData} localization={user.localization} setModalVisible={null} allowAdd={false} allowEdit={false} />
                </div>
            })
        })

        return data
    }

    return <div className={"content site-overlay-list"}>
        <StyledCollapsible elements={toCollapsibleElements(overlays)} />
    </div>
}