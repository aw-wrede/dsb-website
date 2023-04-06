import {Component} from "react";
import {
    ArchiveBracket,
    ArchiveData,
    ArchiveSeason,
    ArchiveTourney,
    ShowableUrlElement
} from "../../../interfaces/ArchiveData";
import {SocialMediaData} from "../../../interfaces/StaffData";

const BRACKET_URL_LIST_HEADLINE = "Vollständige Turnierbäume"
const DIVISION_URL_LIST_HEADLINE = "Weitere Turnierbäume"

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
                    {tourney.brackets
                        .filter(bracket => bracket.show)
                        .map(bracket => (
                            <Card1TourneyContentWithBracket key={key++} archiveBracket={bracket} />
                    ))}
                    <LinksComponent headline={BRACKET_URL_LIST_HEADLINE} urlElements={tourney.brackets} defaultName={tourney.name}/>
                </div>
            </div>
        )
    }
}

class LinksComponent extends Component<{ headline: string, urlElements: ShowableUrlElement[], defaultName:string }> {
    render() {
        let {headline, urlElements, defaultName} = this.props;
        const visibleBrackets = urlElements.filter(elem => elem.showUrl && elem.url != null && elem.url.length > 0);
        if (visibleBrackets.length === 0) {
            return (<div className="brackets-links-container"></div>)
        }
        return (
            <div className="brackets-links-container">
                <p>{headline}</p>
                <div className="brackets-links">
                    {visibleBrackets
                        .map(elem => (
                            <a key={elem.id} href={elem.url ?? ""}>{elem.name ?? defaultName}</a>
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
            <div className="pointer">
                <div className="card1-places" /* only render bracket name is it is set */>
                    {archiveBracket.name != null && archiveBracket.name !== "" &&
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
            <div>
                {divisions
                    .filter(div => div.show)
                    .map(div => (
                        <div key={div.id} className="card1-division">
                            <a href={div.url} target="_blank" rel="noreferrer">
                                <p>{div.name}</p>
                            </a>
                            <div>
                                {div.links.map((link:SocialMediaData) => (
                                    <a key={link.name} className="social-link" href={link.url} target="_blank" rel="noreferrer">
                                        <img className="social" src={`/logos/${link.icon}`} alt={link.name}/>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
            <LinksComponent headline={DIVISION_URL_LIST_HEADLINE} urlElements={divisions} defaultName={"Challonge" /* TODO find better name */} />
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