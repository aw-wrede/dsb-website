import {Card2TeamComponent} from "../../components/cards/card2Components/Card2Components";

import "./teamStyle.sass"
import {DATA_STAFF} from "../../data/DataStaff";

export default function SiteTeam() {
    return (
        <div className="main-content arrow-background fill-site">
            <div className="team-container">
                {DATA_STAFF.map(staff => (
                    <Card2TeamComponent key={staff.id} staffMember={staff} />
                ))}
            </div>
        </div>
    )
}