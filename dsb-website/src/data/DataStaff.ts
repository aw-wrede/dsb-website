import {SocialMediaData, StaffMember, StaffRole} from "../interfaces/StaffData";

export const TWITTER_ICON = "twitter-white.svg"
export const TWITCH_ICON = "twitch-white.svg"
export const YOUTUBE_ICON = "youtube-white.png"
export const INSTAGRAM_ICON = "instagram-white.svg"

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
 *  21 - Dari
 *  100 - Venatus
 *  101 - Cyo
 *  102 - Tsuki
 *  103 - REH
 *  104 - Redwood
 *  105 - Neira
 *  106 - Barli
 *  107 - Ente
 *  108 - Fish
 *  109 - Inkception
 *  110 - Jiyu
 *  111 - Lu
 *  112 - Nango
 *  113 - Nathan
 *  114 - Rubi
 *  115 - Shio
 *  116 - SplashX
 *  117 - Squidel
 *  118 - Browni
 */


/* TO */

const staffGlacey:StaffMember = generateStaffMember(
    0,
    "GlaceyXG",
    [StaffRole.TO, StaffRole.Council, StaffRole.Streamer, StaffRole.Commentator, StaffRole.SocialMediaManager],
    "/images/profileImages/glaceyxg-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/GlaceyXG"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/glaceyxg"),
        generateSocialMediaData("YouTube", YOUTUBE_ICON, "https://www.youtube.com/channel/UCUwoGwSAOVEt-9zArymLXfw")
    ]
)

const staffNindoTim:StaffMember = generateStaffMember(
    1,
    "NindoTimRS",
    [StaffRole.TO, StaffRole.Council, StaffRole.Streamer, StaffRole.Commentator, StaffRole.Cutter],
    "/images/profileImages/nindotim-300.webp",
    null,
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
    "/images/profileImages/alice-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/Aloschus")
    ]
)




const staffNixenwolf:StaffMember = generateStaffMember(
    11,
    "Nixenwolf",
    [StaffRole.Streamer, StaffRole.Commentator, StaffRole.Cutter],
    "/images/profileImages/Nixenwolf-300.webp",
    null,
    [
        generateSocialMediaData("YouTube", YOUTUBE_ICON, "https://www.youtube.com/@Nixenwolf"),
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/nixenwolf")
    ]
)

const staffNoobPat:StaffMember = generateStaffMember(
    12,
    "noob_pat",
    [StaffRole.Commentator],
    null,
    null,
    [
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/noob_pat"),
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/noob_pat04")
    ]
)

const staffVega:StaffMember = generateStaffMember(
    13,
    "Vega",
    [StaffRole.Commentator],
    "/images/profileImages/Vega-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/vega_spl")
    ]
)

const staffMasterRs:StaffMember = generateStaffMember(
    14,
    "MasterRS",
    [StaffRole.Commentator],
    null,
    null,
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
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/_JonRu_")
    ]
)

const staffJonRu:StaffMember = generateStaffMember(
    16,
    "JonRu",
    [StaffRole.Commentator],
    "/images/profileImages/jonru-300.webp",
    null,
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
    null,
    [
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://twitch.com/midna_twilight_2004"),
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/Midna2501"),
        generateSocialMediaData("Instagram", INSTAGRAM_ICON, "https://instagram.com/midna_twilight_18")
    ]
)

const staffMarjora:StaffMember = generateStaffMember(
    18,
    "mαrjσrα",
    [StaffRole.Streamer, StaffRole.Commentator],
    "/images/profileImages/marjora-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/marjora0503"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://twitch.tv/marjora0503")
    ]
)

const staffRaphi:StaffMember = generateStaffMember(
    19,
    "Raphi",
    [StaffRole.Commentator],
    "/images/profileImages/Raphi-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/RaphiTheDon"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/raphi_spl")
    ]
)

const staffNolle:StaffMember = generateStaffMember(
    20,
    "Nolle",
    [StaffRole.Commentator],
    "/images/profileImages/Nolle-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/WPG_Nolle"),
        generateSocialMediaData("YouTube", YOUTUBE_ICON, "https://www.youtube.com/channel/UCAAiapslzH7bMKLhEGyMOvQ"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/nollkokossus")
    ]
)

const staffCyo:StaffMember = generateStaffMember(
    101,
    "Cyo",
    [StaffRole.Developer, StaffRole.Streamer, StaffRole.Commentator, StaffRole.Designer],
    "/images/profileImages/cyo-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/InklingOnFire"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/inklingonfire"),
        generateSocialMediaData("YouTube", YOUTUBE_ICON, "https://www.youtube.com/channel/UC0HVbY7wsUK9BYahTvWTkGg")
    ]
)

const staffTsuki:StaffMember = generateStaffMember(
    102,
    "Tsuki つき",
    [StaffRole.Council, StaffRole.Streamer, StaffRole.Commentator, StaffRole.Designer],
    "/images/profileImages/tsuki-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/spl_tsuki"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/tsukiko_cx"),
        generateSocialMediaData("YouTube", YOUTUBE_ICON, "https://www.youtube.com/channel/UCd2yYwSgPT7DlY4x1I815vw")
    ]
)

const staffReh:StaffMember = generateStaffMember(
    103,
    "REH",
    [StaffRole.Council],
    "/images/profileImages/reh-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/reh191")
    ]
)

const staffRedwood:StaffMember = generateStaffMember(
    104,
    "Redwood",
    [StaffRole.Council, StaffRole.Commentator],
    "/images/profileImages/redwood-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/Redwood_KL")
    ]
)

const staffNeira:StaffMember = generateStaffMember(
    105,
    "Neira",
    [StaffRole.Council],
    "/images/profileImages/neira-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/Neira_LOS")
    ]
)



const staffVenatus:StaffMember = generateStaffMember(
    100,
    "Venatus",
    [StaffRole.Developer],
    "/images/profileImages/venatus-300.webp",
    null,
    [
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/venatus247")
    ]
)

const staffBarli:StaffMember = generateStaffMember(
    106,
    "Barli",
    [StaffRole.Commentator],
    null,
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/Barli_spl")
    ]
)

const staffDari:StaffMember = generateStaffMember(
    21,
    "Dari",
    [StaffRole.SocialMediaManager],
    "/images/profileImages/dari-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/dari_spl")
    ]
)

const staffEnte:StaffMember = generateStaffMember(
    107,
    "Ente",
    [StaffRole.Commentator],
    "/images/profileImages/ente-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/SplatEnte"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/ente_spl"),
        generateSocialMediaData("YouTube", YOUTUBE_ICON, "https://www.youtube.com/channel/UCcvmYWCHoLumucc64s_u0IQ")
    ]
)

const staffFish:StaffMember = generateStaffMember(
    108,
    "Fishシ",
    [StaffRole.Streamer, StaffRole.Commentator],
    "/images/profileImages/Fish-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/FishoftheGame"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/fishofthegame")
    ]
)

const staffInkception:StaffMember = generateStaffMember(
    109,
    "Inkception",
    [StaffRole.Developer],
    "/images/profileImages/Inkception-300.webp",
    null,
    [
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://twitch.tv/inkception1508")
    ]
)

const staffJiyu:StaffMember = generateStaffMember(
    110,
    "Jiyu",
    [StaffRole.Commentator],
    "/images/profileImages/jiyu-300.webp",
    null,
    []
)

const staffLu:StaffMember = generateStaffMember(
    111,
    "Lu",
    [StaffRole.Commentator],
    null,
    null,
    []
)

const staffNango:StaffMember = generateStaffMember(
    112,
    "Nango",
    [StaffRole.Commentator],
    null,
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/NanGOAT24")
    ]
)

const staffNathan:StaffMember = generateStaffMember(
    113,
    "Nathan",
    [StaffRole.Cutter],
    null,
    null,
    []
)

const staffRubi:StaffMember = generateStaffMember(
    114,
    "Rubi",
    [StaffRole.Commentator],
    null,
    null,
    []
)

const staffShio:StaffMember = generateStaffMember(
    115,
    "Shio",
    [StaffRole.Streamer, StaffRole.Commentator],
    null,
    null,
    []
)

const staffSplashX:StaffMember = generateStaffMember(
    116,
    "SplashX",
    [StaffRole.Cutter],
    null,
    null,
    []
)

const staffSquidel:StaffMember = generateStaffMember(
    117,
    "Squidel",
    [StaffRole.Commentator],
    null,
    null,
    []
)

const staffBrowni:StaffMember = generateStaffMember(
    118,
    "Browni",
    [StaffRole.Streamer],
    "/images/profileImages/Browni-300.webp",
    null,
    [
        generateSocialMediaData("Twitter", TWITTER_ICON, "https://twitter.com/Brufnie"),
        generateSocialMediaData("Twitch", TWITCH_ICON, "https://www.twitch.tv/brufnie")
    ]
)

//======================================================================

function generateStaffMember(id:number, name:string, roles:StaffRole[], profileImage:string|null, customColor:string|null, socialMediaData:SocialMediaData[]):StaffMember {
    return {
        id: id,
        name: name,
        roles: roles,
        profileImageUrl: profileImage,
        customColor: customColor,
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

    staffNeira,
    staffRedwood,
    staffReh,
    staffTsuki,

    staffCyo,
    staffInkception,
    staffVenatus,

    staffDari,

    staffBrowni,
    staffFish,
    staffMarjora,
    staffNixenwolf,
    staffShio,

    staffBarli,
    staffEnte,
    staffFe4RLess,
    staffJiyu,
    staffJonRu,
    staffLu,
    staffMasterRs,
    staffMidna,
    staffNango,
    staffNolle,
    staffNoobPat,
    staffRaphi,
    staffRubi,
    staffSquidel,
    staffVega,

    staffNathan,
    staffSplashX
]

