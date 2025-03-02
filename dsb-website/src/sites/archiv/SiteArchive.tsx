import {
    Card1DivisionTourneyComponent,
    Card1TourneyBracketsComponent
} from "../../components/cards/card1Components/Card1TourneyComponents";

import "./archiveStyle.sass"
import {DATA_ARCHIVE} from "../../data/DataArchive";
import FooterComponent from "../../components/footer/FooterComponent";
import {useState} from "react";
import {
    ArchiveData,
    ArchiveSeason,
    ArchiveTourney,
    ArchiveType,
    getAllArchiveTypes, getArchiveTypeNameLocalized
} from "../../interfaces/ArchiveData";
import UiCheckbox from "../../components/UiElements/UiCheckbox";

export default function SiteArchive() {

    const [searchTags, setSearchTags]:[ArchiveType[], any] = useState([])

    const [searchOpened, setSearchOpened]:[boolean, any] = useState(false)
    const [visibleArchiveElems, setVisibleArchiveElems]:[ArchiveData[], any] = useState(DATA_ARCHIVE)

    const changeSearchOpenStatus = () => {
        setSearchOpened(!searchOpened)
    }

    const archiveTagCheckboxChange = (value:boolean, name:string) => {
        name = name.replace("archive-tag-", "")
        let list:ArchiveType[] = searchTags
        const groupId:ArchiveType = parseInt(name)

        if(value) {
            list = searchTags
            list.push(groupId)
        } else if(searchTags.includes(groupId)) {
            list = searchTags.filter(val => val !== groupId)
        }

        setSearchTags(list)
        filterArchiveElems(DATA_ARCHIVE, list)
    }

    function filterArchiveElems(archiveData:ArchiveData[], searchTags:ArchiveType[]) {
        //show all archive elems if no tag is set
        if(searchTags.length === 0) {
            setVisibleArchiveElems(archiveData)
            return
        }

        const list:ArchiveData[] = []
        archiveData.forEach(archiveElem => {
            for(const tag of searchTags) {
                if(archiveElem.type !== tag) {
                    continue
                }

                list.push(archiveElem)
                break
            }
        })

        setVisibleArchiveElems(list)
    }



    return (
        <section className="main-content arrow-background fill-site archive-container">

            <div className={`elems-search-container ${searchOpened ? "opened" : ""}`}>
                <div className="elems-search-settings">
                    <div className="search-header">
                        <p>Nach Turnier filtern</p>
                    </div>
                    <div>
                        {getAllArchiveTypes().map(type => (
                            <UiCheckbox key={type} name={`archive-tag-${type}`} text={getArchiveTypeNameLocalized(type)} callback={archiveTagCheckboxChange} />
                        ))}
                    </div>

                </div>
                <div className="elems-search-opener" onClick={changeSearchOpenStatus}>
                    <span className="material-icons">manage_search</span>
                </div>
            </div>


            {visibleArchiveElems.map((data => {
                if('divisions' in data) {
                    return <div key={data.name} className="card-container">
                        <Card1DivisionTourneyComponent season={data as ArchiveSeason}/>
                    </div>
                }
                return <div key={data.name} className="card-container">
                    <Card1TourneyBracketsComponent key={data.name} tourney={data as ArchiveTourney} />
                </div>
            }))}

            <FooterComponent />
        </section>
    )
}