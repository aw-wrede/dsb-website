import "../../components/cards/card1Components/card1Style.sass"
import {
    Card1DivisionTourneyComponent,
    Card1TourneyBracketsComponent
} from "../../components/cards/card1Components/Card1TourneyComponents";

import "./archiveStyle.sass"
import {ArchiveSeason, ArchiveTourney} from "../../interfaces/ArchiveData";
import {
    DSB_SEASON_4,
    DSB_SEASON_5,
    DSP_4,
    KING_PROTECTION_1,
    PAYLOAD_1,
    STRIKING_TOURNEY_2
} from "../../data/DataArchive";

export default function SiteArchive() {


    return (
        <section className="main-content arrow-background fill-site archive-container">

            <div className="card-container">
                <Card1TourneyBracketsComponent /* 2022.07.09 */ tourney={STRIKING_TOURNEY_2} />
            </div>

            <div className="card-container">
                <Card1DivisionTourneyComponent /* 2022.05.09 - 2022.07.03 */ season={DSB_SEASON_5}/>
            </div>

            <div className="card-container">
                <Card1TourneyBracketsComponent /* 2022.04.30 */ tourney={DSP_4} />
            </div>

            <div className="card-container">
                <Card1TourneyBracketsComponent /* 2022.04.09 */ tourney={PAYLOAD_1} />
            </div>

            <div className="card-container">
                <Card1TourneyBracketsComponent /* 2022.04.02 */ tourney={KING_PROTECTION_1} />
            </div>

            <div className="card-container">
                <Card1DivisionTourneyComponent /* 2021.11.22 - 2022.02.20? */ season={DSB_SEASON_4}/>
            </div>

        </section>
    )
}