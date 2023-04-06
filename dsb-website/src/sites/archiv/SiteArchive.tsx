import "../../components/cards/card1Components/card1Style.sass"
import {
    Card1DivisionTourneyComponent,
    Card1TourneyBracketsComponent
} from "../../components/cards/card1Components/Card1TourneyComponents";

import "./archiveStyle.sass"
import {ArchiveSeason, ArchiveTourney} from "../../interfaces/ArchiveData";
import {
    DSB_BUNDESLAENDER_BRAWL_1, DSB_LEAGUE_RUSH_1, DSB_PRINCESS_TOWER_1,
    DSB_SEASON_1, DSB_SEASON_2, DSB_SEASON_3,
    DSB_SEASON_4,
    DSB_SEASON_5, DSB_SEASON_6, DSB_SPLATFEST_1, DSB_TURMHORROR_1, DSP_1, DSP_2, DSP_3,
    DSP_4,
    KING_PROTECTION_1,
    PAYLOAD_1, STRIKING_TOURNEY_1,
    STRIKING_TOURNEY_2
} from "../../data/DataArchive";
import FooterComponent from "../../components/footer/FooterComponent";

export default function SiteArchive() {


    return (
        <section className="main-content arrow-background fill-site archive-container">

            <div className="card-container">
                <Card1TourneyBracketsComponent /* 2022.07.09 */ tourney={STRIKING_TOURNEY_2} />
            </div>

            <div className="card-container">
                <Card1DivisionTourneyComponent /* ? */ season={DSB_SEASON_6}/>
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

            <div className="card-container">
                <Card1TourneyBracketsComponent /* 2021.11.13 */ tourney={DSP_3} />
            </div>

            <div className="card-container">
                <Card1TourneyBracketsComponent /* 2021.10.30 */ tourney={DSB_PRINCESS_TOWER_1} />
            </div>

            <div className="card-container">
                <Card1TourneyBracketsComponent /* 2021.10.23 */ tourney={STRIKING_TOURNEY_1} />
            </div>

            <div className="card-container">
                <Card1TourneyBracketsComponent /* ? */ tourney={DSB_LEAGUE_RUSH_1} />
            </div>

            <div className="card-container">
                <Card1DivisionTourneyComponent /* 2021.04.12 - 2021.06.07 */ season={DSB_SEASON_3}/>
            </div>

            <div className="card-container">
                <Card1TourneyBracketsComponent /* 2021.04.04 */ tourney={DSP_2} />
            </div>

            <div className="card-container">
                <Card1TourneyBracketsComponent /* ? */ tourney={DSB_BUNDESLAENDER_BRAWL_1} />
            </div>

            <div className="card-container">
                <Card1TourneyBracketsComponent /* ? */ tourney={DSB_TURMHORROR_1} />
            </div>

            <div className="card-container">
                <Card1DivisionTourneyComponent /* ? */ season={DSB_SEASON_2}/>
            </div>

            <div className="card-container">
                <Card1TourneyBracketsComponent /* ? */ tourney={DSP_1} />
            </div>

            <div className="card-container">
                <Card1TourneyBracketsComponent /* ? */ tourney={DSB_SPLATFEST_1} />
            </div>

            <div className="card-container">
                <Card1DivisionTourneyComponent /* ? */ season={DSB_SEASON_1}/>
            </div>

            <FooterComponent />
        </section>
    )
}