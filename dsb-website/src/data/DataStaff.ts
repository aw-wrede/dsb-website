import {SocialMediaData, StaffMember, StaffRole} from "../interfaces/StaffData";

const TWITTER_ICON = "twitter-white.svg"
const TWITCH_ICON = "twitch-white.svg"

const COLOR_TO = "#1ABC9C"
const COLOR_COUNCIL = ""
const COLOR_STREAMER = ""
const COLOR_DEVELOPER = "#16b6f0"

const staffGlacey:StaffMember = generateStaffMember(
    0,
    "Glacey",
    [StaffRole.TO, StaffRole.Council, StaffRole.Streamer],
    "/images/profileImages/example.jpg",
    COLOR_TO,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/glaceyxg"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/glaceyxg")
    ]
)

const staffAlice:StaffMember = generateStaffMember(
    1,
    "Alice",
    [StaffRole.TO, StaffRole.Council],
    "/images/profileImages/alice-512.png",
    COLOR_TO,
    []
)

const staffNindoTim:StaffMember = generateStaffMember(
    2,
    "NindoTim",
    [StaffRole.TO, StaffRole.Council],
    "/images/profileImages/nindotim-512.png",
    COLOR_TO,
    []
)

const staffVenatus:StaffMember = generateStaffMember(
    8,
    "Venatus",
    [StaffRole.Developer],
    "/images/profileImages/venatus-512.png",
    COLOR_DEVELOPER,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/venatus247"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/venatus247")
    ]
)

function generateStaffMember(id:number, name:string, roles:StaffRole[], profileImage:string, color:string, socialMediaData:SocialMediaData[]):StaffMember {
    return {
        id: id,
        name: name,
        roles: roles,
        profileImageUrl: profileImage,
        color: color,
        socialMedias: socialMediaData
    }
}

function generateSocialMediaData(name:string, icon:string, url:string):SocialMediaData {
    return {
        name: name,
        icon: icon,
        url: url
    }
}

export const DATA_STAFF = [
    staffGlacey,
    staffNindoTim,
    staffAlice,
    staffVenatus
]

