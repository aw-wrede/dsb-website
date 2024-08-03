import UserInfo from "../../../interfaces/user/UserInfo.ts";
import {useContext, useState} from "react";
import OverlayTemplate from "../../../interfaces/overlay/OverlayTemplate.ts";
import OverlayType from "../../../interfaces/overlay/OverlayType.ts";
import {saveNewOverlayTemplate} from "../../../axios/AxiosApi.ts";
import axios from "axios";
import Localization from "../../../interfaces/Localization.tsx";
import TourneyGameVersion from "../../../interfaces/tourney/TourneyGameVersion.ts";
import {UserContext} from "../../../App.tsx";
import OverlayTemplateEditForm from "../../../components/forms/overlay/template/OverlayTemplateEditForm.tsx";
import BasicFormType from "../../../components/forms/BasicFormType.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SiteCreateOverlayTemplate() {
    const user = useContext<UserInfo>(UserContext)
    const [template, setTemplate] = useState<OverlayTemplate>({
        title: "",
        uuid: "",
        matches: [],
        type: OverlayType.Static,
        gameVersion: TourneyGameVersion.Splatoon3,
        maxMatches: 9,
        localization:Localization.German
    });

    async function onSubmit(e:SubmitEvent) {
        e.preventDefault()

        console.log(template)

        const cancelToken = axios.CancelToken.source()
        const result = await saveNewOverlayTemplate(cancelToken.token, template)

        console.log(`Created status: ${result}`)

        return result
    }

    return <div className={"content create-template"}>
        <OverlayTemplateEditForm user={user} template={template} setTemplate={setTemplate} onSubmit={onSubmit} type={BasicFormType.Create} />
    </div>
}