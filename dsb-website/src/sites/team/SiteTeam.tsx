import {Card2TeamComponent} from "../../components/cards/card2Components/Card2Components";

import "./teamStyle.sass"
import {DATA_STAFF} from "../../data/DataStaff";
import React, {useState} from "react";
import {getAllStaffRoles, getRoleNameLocalized, StaffMember, StaffRole} from "../../interfaces/StaffData";
import UiCheckbox from "../../components/UiElements/UiCheckbox";

export default function SiteTeam() {

    const [searchTags, setSearchTags]:[StaffRole[], any] = useState([])

    const [searchOpened, setSearchOpened]:[boolean, any] = useState(false)
    const [visibleStaffMembers, setVisibleStaffMembers]:[StaffMember[], any] = useState(DATA_STAFF)

    const changeSearchOpenStatus = () => {
        setSearchOpened(!searchOpened)
    }

    const staffTagCheckboxChange = (value:boolean, name:string) => {
        name = name.replace("staff-tag-", "")
        let list:StaffRole[] = searchTags
        const groupId:StaffRole = parseInt(name)

        if(value) {
            list = searchTags
            list.push(groupId)
        } else if(searchTags.includes(groupId)) {
            list = searchTags.filter(val => val !== groupId)
        }

        setSearchTags(list)
        filterTeamMembers(DATA_STAFF, list)
    }
    
    function filterTeamMembers(staffs:StaffMember[], searchTags:StaffRole[]) {
        //show all staff member if no tag is set
        if(searchTags.length === 0) {
            setVisibleStaffMembers(staffs)
            return
        }

        const list:StaffMember[] = []
        staffs.forEach(staff => {
            for(const tag of searchTags) {
                if(!staff.roles.includes(tag)) {
                    continue
                }

                //add staff member to list if he has a role that should be displayed
                list.push(staff)
                break
            }
        })

        setVisibleStaffMembers(list)
    }

    return (
        <div className={`main-content arrow-background fill-site`}>
            <div className={`team-search-container ${searchOpened ? "opened" : ""}`}>
                <div className="team-search-settings">
                    <div className="search-header">
                        <p>Nach Rolle filtern</p>
                    </div>
                    <div>
                        {getAllStaffRoles().map(role => (
                            <UiCheckbox key={role} name={`staff-tag-${role}`} text={getRoleNameLocalized(role)} callback={staffTagCheckboxChange} />
                        ))}
                    </div>

                </div>
                <div className="team-search-opener" onClick={changeSearchOpenStatus}>
                    <span className="material-icons">manage_search</span>
                </div>
            </div>
            <div className="team-container">
                {visibleStaffMembers.map(staff => (
                    <Card2TeamComponent key={staff.id} staffMember={staff} />
                ))}
            </div>
        </div>
    )
}

