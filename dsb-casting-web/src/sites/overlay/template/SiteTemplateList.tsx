import {useContext, useEffect, useState} from "react";
import OverlayTemplate from "../../../interfaces/overlay/OverlayTemplate.ts";
import {getAllOverlayTemplates, getMapData} from "../../../axios/AxiosApi.ts";
import axios from "axios";
import StyledCollapsible from "../../../framework/collapsible/StyledCollapsible.tsx";
import CollapsibleElement from "../../../framework/collapsible/CollapsibleElement.ts";
import MatchList from "../../../components/match/MatchList.tsx";
import TourneyMapType from "../../../interfaces/tourney/TourneyMapType.ts";
import TourneyMap from "../../../interfaces/tourney/TourneyMap.ts";
import StyledIcon from "../../../framework/StyledIcon.tsx";
import FrameworkIcon from "../../../framework/FrameworkIcon.ts";
import AppUserGroup from "../../../interfaces/user/AppUserGroup.ts";
import UserInfo from "../../../interfaces/user/UserInfo.ts";
import {UserContext} from "../../../App.tsx";

import "../../sitesList.sass"

export default function SiteTemplateList() {
    const user = useContext<UserInfo>(UserContext)

    const [templates, setTemplates] = useState<OverlayTemplate[]>([]);
    const [mapData, setMapData] = useState<Record<TourneyMapType, TourneyMap>>({} as Record<TourneyMapType, TourneyMap>)

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        getAllOverlayTemplates(cancelToken.token).then(setTemplates)
        getMapData(cancelToken.token).then(setMapData)

        return () => {
            cancelToken.cancel()
        }
    }, [])

    function onDeleteClick(template:OverlayTemplate) {

    }

    function toCollapsibleElements(templates: OverlayTemplate[]) {
        const data:CollapsibleElement[] = []
        templates.forEach(template => {
            data.push({
                header: <div className={"flex-row-space-between flex-vertical-center"}>
                    <div className={"overlay-title-wrapper"}>
                        <p>{template.title}</p>
                    </div>
                    <div className={"overlay-actions"}>
                        <a href={`/overlay/template/edit/${template.uuid}`}><StyledIcon icon={FrameworkIcon.Edit}/></a>
                        {user.user.userGroup >= AppUserGroup.Privileged ?
                            <StyledIcon icon={FrameworkIcon.Delete} onClick={() => {
                                onDeleteClick(template)
                            }}/>
                            : null}
                    </div>
                </div>,
                body: <div>
                    <MatchList matches={template.matches} mapData={mapData} localization={user.localization}
                               setModalVisible={null} allowAdd={false} allowEdit={false} />
                </div>
            })
        })

        return data
    }

    return <div className={"content site-template-list"}>
        <StyledCollapsible elements={toCollapsibleElements(templates)}/>
    </div>
}