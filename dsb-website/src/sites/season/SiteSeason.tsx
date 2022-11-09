import {Component, useEffect, useState} from "react";
import {ParticipantData, TournamentData} from "../../interfaces/tournament/TournamentData";
import axios from "axios";
import {axiosInstance, fetchTournamentData} from "../../AxiosApi";
import {
    CURRENT_SEASON_DATE,
    CURRENT_SEASON_NAME,
    CURRENT_SEASON_TOURNAMENTS,
    IS_A_CURRENT_SEASON
} from "../../definitions/vars";
import {Card2DivisionComponent, Card2TeamComponent} from "../../components/cards/card2Components/Card2Components";

import "./seasonStyle.sass"

export default function SiteSeason() {

    const [tournaments, setTournaments]:[TournamentData[], any] = useState([])

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        const fetchData = async () => {
            let dataSet:TournamentData[] = []
            for(let i = 0; i < CURRENT_SEASON_TOURNAMENTS.length; i++) {
                const uuid = CURRENT_SEASON_TOURNAMENTS[i]
                const data = await fetchTournamentData(uuid, cancelToken.token)
                if(data != null) dataSet.push(data)
            }
            setTournaments(dataSet)
        }

        //only fetch data if current season is running
        if(IS_A_CURRENT_SEASON) fetchData()

        return () => {
            cancelToken.cancel()
        }
    }, [])

    useEffect(() => {
        console.log("Updated")
        console.log(tournaments)
    }, [tournaments])

    return (
        <section className="main-content arrow-background fill-site">
            {IS_A_CURRENT_SEASON ? (
                <div>
                    <div className="season-banner">
                        <img src="/images/dsb_season_6_banner.png" alt=""/>
                    </div>
                    <div className="current-season-header">
                        <h1>{CURRENT_SEASON_NAME}</h1>
                        <h1>{CURRENT_SEASON_DATE}</h1>
                    </div>
                    <div className="current-season flex wrap flex-center">
                        {tournaments.map(tournament => ( //#04b9f1
                            <Card2DivisionComponent key={tournament.uuid} tournament={tournament} color={"#ff3a36"} />
                        ))}
                    </div>
                </div>) : (
                <div>
                    <div className="no-current-season">
                        <h1>Aktuell findet keine Season statt.</h1>
                    </div>
                </div>
            )}

        </section>
    )
}