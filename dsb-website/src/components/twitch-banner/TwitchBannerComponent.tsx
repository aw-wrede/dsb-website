import './twitchBannerStyle.sass'
import {useEffect, useState} from "react";
import {SunnyTwitchData} from "../../interfaces/SunnyTwitchData";
import axios from "axios";
import {fetchTwitchLiveData} from "../../AxiosApi";
import {TWITCH_LINK} from "../../definitions/constants";
export default function TwitchBannerComponent() {

    const [sunnyTwitchInfo, setSunnyTwitchInfo]:[SunnyTwitchData, any] = useState({live: false, title: null, category: null})

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        const fetchData = async() => {
            const data = await fetchTwitchLiveData(cancelToken.token)
            if(data != null) setSunnyTwitchInfo(data)
            console.log(data)
        }

        fetchData()

        return () => {
            cancelToken.cancel()
        }
    }, []);

    return(
        <div className={`twitch-live-banner ${!sunnyTwitchInfo.live ? 'hidden' : ''}`}>
            <a className="twitch-live-banner-link" href={TWITCH_LINK} target="_blank" rel="noreferrer">
                <div className="live-indicator-container">
                    <i className="live-indicator"></i>
                </div>
                <div className="live-content-container">
                    <h1 className="twitch-title">Die DSB ist live auf Twitch!</h1>
                </div>
            </a>
        </div>
    )
}