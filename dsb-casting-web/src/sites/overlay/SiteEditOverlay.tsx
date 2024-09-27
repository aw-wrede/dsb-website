import SiteCreateOverlay from "./SiteCreateOverlay.tsx";
import UserInfo from "../../interfaces/user/UserInfo.ts";
import {useContext, useEffect, useState} from "react";
import Overlay from "../../interfaces/overlay/Overlay.ts";
import CreateOverlayRequest, {createOverlayRequestFromOverlay} from "../../axios/requests/CreateOverlayRequest.ts";
import {getOverlay} from "../../axios/AxiosApi.ts";
import axios from "axios";
import {useParams} from "react-router-dom";
import {UserContext} from "../../App.tsx";

export default function SiteEditOverlay() {
    const user = useContext<UserInfo>(UserContext)
    const {uuid} = useParams()

    const [overlay, setOverlay] = useState<CreateOverlayRequest>(null);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        getOverlay(cancelToken.token, uuid).then((o:Overlay) => {
            if(o == null) {
                return
            }
            setOverlay(createOverlayRequestFromOverlay(o))
        })

        return () => {
            cancelToken.cancel()
        }
    }, []);

    return <SiteCreateOverlay overlayToUpdate={overlay} />
}