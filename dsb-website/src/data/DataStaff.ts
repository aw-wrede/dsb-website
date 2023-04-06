import {SocialMediaData, StaffMember, StaffRole} from "../interfaces/StaffData";

export const TWITTER_ICON = "twitter-white.svg"
export const TWITCH_ICON = "twitch-white.svg"
export const YOUTUBE_ICON = "youtube-white.png"
export const INSTAGRAM_ICON = "instagram-white.svg"

const COLOR_TO = "#1ABC9C"
const COLOR_COUNCIL = "#16b6f0"
const COLOR_COMMENTATOR = "#b9bbbe"
const COLOR_STREAMER = "#2ecc71"
const COLOR_DEVELOPER = "#16b6f0"
const COLOR_ARTIST = "#16e7d0"
const COLOR_CUTTER = ""

/**
 * Staff Member Ids:
 *  0 - Glacey
 *  1 - NindoTim
 *  2 - Alice
 *
 *  11 - Nixenwolf
 *  12 - noob_pat
 *  13 - Vega
 *  14 - MasterRS
 *  15 - Fe4RLess
 *  16 - JonRu
 *  17 - Midna
 *  18 - Majora
 *  19 - Raphi
 *  20 - Nolle
 *  101 - Cyo
 *  102 - Tsuki
 *  103 - REH
 *  104 - Redwood
 *  105 - Neira
 */

const staffNixenwolf:StaffMember = generateStaffMember(
    11,
    "Nixenwolf",
    [StaffRole.Commentator],
    null,
    COLOR_COMMENTATOR,
    [
        generateSocialMediaData("YouTube", YOUTUBE_ICON, "https://www.youtube.com/channel/UC5tR220Xgy1tQdMnU4OCyWg"),
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/nixenwolf")
    ]
)

const staffNoobPat:StaffMember = generateStaffMember(
    12,
    "noob_pat",
    [StaffRole.Commentator],
    null,
    COLOR_COMMENTATOR,
    [
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/noob_pat"),
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/noob_pat04")
    ]
)

const staffVega:StaffMember = generateStaffMember(
    13,
    "Vega",
    [StaffRole.Commentator],
    null,
    COLOR_COMMENTATOR,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/vega_spl")
    ]
)

const staffMasterRs:StaffMember = generateStaffMember(
    14,
    "MasterRS",
    [StaffRole.Commentator],
    null,
    COLOR_COMMENTATOR,
    [
        generateSocialMediaData("YouTube", YOUTUBE_ICON, "https://www.youtube.com/c/MasterRS"),
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/The_MasterRS")
    ]
)

const staffFe4RLess:StaffMember = generateStaffMember(
    15,
    "Fe4RLess",
    [StaffRole.Commentator],
    null,
    COLOR_COMMENTATOR,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/_JonRu_")
    ]
)

const staffJonRu:StaffMember = generateStaffMember(
    16,
    "JonRu",
    [StaffRole.Commentator],
    null,
    COLOR_COMMENTATOR,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/_JonRu_"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/jonru16")
    ]
)

const staffMidna:StaffMember = generateStaffMember(
    17,
    "ぽさMidna🎶",
    [StaffRole.Commentator],
    null,
    COLOR_COMMENTATOR,
    [
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://twitch.com/midna_twilight_2004"),
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/Midna2501"),
        generateSocialMediaData("Instagram", INSTAGRAM_ICON, "https://instagram.com/midna_twilight_18")
    ]
)

const staffMarjora:StaffMember = generateStaffMember(
    18,
    "Marjora",
    [StaffRole.Commentator],
    "/images/profileImages/marjora-512.png",
    COLOR_COMMENTATOR,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/marjora0503"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://twitch.tv/marjora0503")
    ]
)

const staffRaphi:StaffMember = generateStaffMember(
    19,
    "Raphi",
    [StaffRole.Commentator],
    null,
    COLOR_COMMENTATOR,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/RaphiTheDon")
    ]
)

const staffNolle:StaffMember = generateStaffMember(
    20,
    "Nolle",
    [StaffRole.Commentator],
    null,
    COLOR_COMMENTATOR,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/WPG_Nolle"),
        generateSocialMediaData("YouTube", YOUTUBE_ICON, "https://www.youtube.com/channel/UCAAiapslzH7bMKLhEGyMOvQ"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/nollkokossus")
    ]
)

const staffCyo:StaffMember = generateStaffMember(
    101,
    "Cyo",
    [StaffRole.Streamer, StaffRole.Commentator],
    "/images/profileImages/cyo-300.png",
    COLOR_COMMENTATOR,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/InklingOnFire"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/inklingonfire")
    ]
)




const staffGlacey:StaffMember = generateStaffMember(
    0,
    "GlaceyXG",
    [StaffRole.TO, StaffRole.Council, StaffRole.Commentator, StaffRole.Streamer],
    "/images/profileImages/glaceyxg-512.png",
    COLOR_TO,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/GlaceyXG"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/glaceyxg"),
        generateSocialMediaData("YouTube", YOUTUBE_ICON, "https://www.youtube.com/channel/UCUwoGwSAOVEt-9zArymLXfw")
    ]
)

const staffNindoTim:StaffMember = generateStaffMember(
    1,
    "NindoTimRS",
    [StaffRole.TO, StaffRole.Council, StaffRole.Commentator, StaffRole.Streamer],
    "/images/profileImages/nindotim-512.png",
    COLOR_TO,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/TimNindo"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/nindotimrs"),
        generateSocialMediaData("YouTube", YOUTUBE_ICON, "https://www.youtube.com/channel/UCJV6gXYRdryf81ko_ZFJvaQ")
    ]
)

const staffAlice:StaffMember = generateStaffMember(
    2,
    "공주 Alice",
    [StaffRole.TO, StaffRole.Council],
    "/images/profileImages/alice-512.png",
    COLOR_TO,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/Aloschus")
    ]
)

const staffTsuki:StaffMember = generateStaffMember(
    102,
    "Tsuki つき",
    [StaffRole.Council, StaffRole.Commentator, StaffRole.Streamer, StaffRole.Artist],
    "/images/profileImages/tsuki-512.png",
    COLOR_COUNCIL,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/spl_tsuki"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/tsukiko_cx"),
        generateSocialMediaData("YouTube", YOUTUBE_ICON, "https://www.youtube.com/channel/UCd2yYwSgPT7DlY4x1I815vw")
    ]
)

const staffReh:StaffMember = generateStaffMember(
    103,
    "HN•REH",
    [StaffRole.Council],
    "/images/profileImages/reh-400.png",
    COLOR_COUNCIL,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/reh191")
    ]
)

const staffRedwood:StaffMember = generateStaffMember(
    104,
    "Redwood",
    [StaffRole.Council, StaffRole.Commentator],
    "/images/profileImages/redwood-345.png",
    COLOR_COUNCIL,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/Redwood_KL")
    ]
)

const staffNeira:StaffMember = generateStaffMember(
    105,
    "Neira",
    [StaffRole.Council],
    "/images/profileImages/neira-512.png",
    COLOR_COUNCIL,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/Neira_LOS")
    ]
)


/*
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
)*/

function generateStaffMember(id:number, name:string, roles:StaffRole[], profileImage:string|null, color:string, socialMediaData:SocialMediaData[]):StaffMember {
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

    staffTsuki,
    staffReh,
    staffRedwood,
    staffNeira,

    staffNixenwolf,
    staffNoobPat,
    staffVega,
    staffMasterRs,
    staffFe4RLess,
    staffJonRu,
    staffMidna,
    staffRaphi,
    staffNolle,
    staffCyo,

]

