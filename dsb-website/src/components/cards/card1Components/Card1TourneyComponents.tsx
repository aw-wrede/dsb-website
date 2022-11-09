import {Component} from "react";
import {ArchiveBracket, ArchiveData, ArchiveSeason, ArchiveTourney} from "../../../interfaces/ArchiveData";

export class Card1DivisionTourneyComponent extends Component<{ season: ArchiveSeason }> {
    render() {
        let {season} = this.props;
        return (
            <div className="card1">
                <Card1TourneyHeader image={season.image}/>
                <Card1TourneyInfo  data={season}/>
                <Card1DivisionContent divisions={season.divisions}/>
            </div>
        )
    }
}

export class Card1TourneyBracketsComponent extends Component<{ tourney:ArchiveTourney }> {
    render() {
        let {tourney} = this.props;
        let key = 0;
        return (
            <div className="card1">
                <Card1TourneyHeader image={tourney.image}/>
                <Card1TourneyInfo data={tourney}/>
                <div className="card1-places-container">
                    {tourney.brackets.map(bracket => (
                        <Card1TourneyContentWithBracket key={key++} archiveBracket={bracket} />
                    ))}
                </div>
            </div>
        )
    }
}

class Card1TourneyContentWithBracket extends Component<{ archiveBracket:ArchiveBracket }> {
    render() {
        let {archiveBracket} = this.props;
        let place = 1
        return (
            <div>
                <div className="card1-places" /* only render bracket name is it is set */>
                    {archiveBracket.name != null && archiveBracket.name != "" &&
                        <div className="bracket">
                            <i>{archiveBracket.name}</i>
                        </div>
                    }
                </div>
                {archiveBracket.winners.map(winner => (
                    <div key={winner} className="card1-place">
                        <p>{place++}.</p>
                        <p>{winner}</p>
                    </div>
                ))}
            </div>
        )
    }
}

function Card1DivisionContent({divisions}) {
    return (
        <div className="card1-places-container">
            {divisions.map(div => (
                <div key={div.name} className="card1-division">
                    <a href={div.url} target="_blank">
                        <p>{div.name}</p>
                    </a>
                </div>
            ))}
        </div>
    )
}

class Card1TourneyHeader extends Component<{ image: string }> {
    render() {
        let {image} = this.props;
        return (
            <div className="card1-tourney-header">
                <img className="card1-image" src={image} alt=""/>
            </div>
        )
    }
}

class Card1TourneyInfo extends Component<{ data:ArchiveData }> {
    render() {
        let {data} = this.props;
        return (
            <div className="card1-tourney-info-container">
                <div className="card1-info">
                    <p className="t-name">{data.name}</p>
                    <p className="t-date">{data.date}</p>
                </div>
            </div>
        )
    }
}