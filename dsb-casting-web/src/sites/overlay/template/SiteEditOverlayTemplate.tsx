import {useContext, useEffect, useState} from "react";
import UserInfo from "../../../interfaces/user/UserInfo.ts";
import {UserContext} from "../../../App.tsx";
import {useParams} from "react-router-dom";
import OverlayTemplate from "../../../interfaces/overlay/OverlayTemplate.ts";
import axios from "axios";
import {getOverlayTemplate, updateOverlayTemplate} from "../../../axios/AxiosApi.ts";
import OverlayTemplateEditForm from "../../../components/forms/overlay/template/OverlayTemplateEditForm.tsx";
import BasicFormType from "../../../components/forms/BasicFormType.ts";

export default function SiteEditOverlayTemplate() {
    const user = useContext<UserInfo>(UserContext)
    const {uuid} = useParams()

    const [template, setTemplate] = useState<OverlayTemplate>(null)

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        getOverlayTemplate(cancelToken.token, uuid).then(setTemplate)

        return () => {
            cancelToken.cancel()
        }
    }, []);

    async function onSubmit(e:SubmitEvent) {
        e.preventDefault()

        console.log(template)

        const cancelToken = axios.CancelToken.source()
        const result = await updateOverlayTemplate(cancelToken.token, template)

        console.log(`Update status: ${result}`)

        return result
    }

    return <div className={"content create-template"}>
        {template == null ? null :
            <OverlayTemplateEditForm user={user} template={template} setTemplate={setTemplate} onSubmit={onSubmit} type={BasicFormType.Edit}/>}
    </div>
}