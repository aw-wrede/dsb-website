import {getHighestStaffRole, SocialMediaData, SocialMediaType, StaffMember, StaffRole} from "../interfaces/StaffData";

export const X_ICON = "x-white.svg"
export const TWITCH_ICON = "twitch-white.svg"
export const YOUTUBE_ICON = "youtube-white.png"
export const INSTAGRAM_ICON = "instagram-white.svg"
export const TIKTOK_ICON = "tiktok-white.svg"

/**
 * Staff Member Ids:
 *  0 - Glacey
 *  1 - NindoTim
 *  3 - Lufti
 *  5 - Ypsilon
 *  6 - Cardbrige
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
 *  103 - REH
 *  104 - Redwood
 *  105 - Neira
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
 *  119 - Trioxit
 *  120 - Lumin
 *  122 - Daniel
 */


/* TO */

const staffGlacey:StaffMember = generateStaffMember(
    0,
    "GlaceyXG",
    [StaffRole.TO,
        StaffRole.Council,
        StaffRole.Streamer,
        StaffRole.Commentator,
        StaffRole.SocialMediaManager],
    linkProfilePic("glaceyxg-300.webp"),
    null,
    [
        socialX("GlaceyXG"),
        socialTwitch("glaceyxg"),
        socialYouTubeChannel("UCUwoGwSAOVEt-9zArymLXfw")
    ]
)

const staffNindoTim:StaffMember = generateStaffMember(
    1,
    "NindoTimRS",
    [StaffRole.TO,
        StaffRole.Council,
        StaffRole.Developer,
        StaffRole.Commentator,
        StaffRole.Cutter],
    linkProfilePic("nindotim-300.webp"),
    null,
    [
        socialX("TimNindo"),
        socialTwitch("nindotimrs"),
        socialYouTubeChannel("UCJV6gXYRdryf81ko_ZFJvaQ")
    ]
)

const staffLufti:StaffMember = generateStaffMember(
    3,
    "Lufti",
    [StaffRole.TO,
        StaffRole.Council],
    null,
    null,
    []
)

const staffYpsilon:StaffMember = generateStaffMember(
    5,
    "Ypsilon",
    [StaffRole.Streamer],
    null,
    null,
    []
)

const staffCardbrige:StaffMember = generateStaffMember(
    6,
    "Cardbrige",
    [StaffRole.ASSIST_TO,
        StaffRole.Council],
    linkProfilePic("Cardbrige-300.webp"),
    null,
    [
        socialX("CardbrigeSpl"),
        socialTwitch("grillhd505"),
        socialYouTubeChannel("UC4h1-ab8eS2vZZZbk2C5SmQ")
    ]
)



const staffNixenwolf:StaffMember = generateStaffMember(
    11,
    "Nixenwolf",
    [
        StaffRole.Council,
        StaffRole.Streamer,
        StaffRole.Commentator,
        StaffRole.Cutter],
    linkProfilePic("Nixenwolf-300.webp"),
    null,
    [
        socialX("Nixenwolf"),
        socialYouTubeUser("Nixenwolf")
    ]
)

const staffNoobPat:StaffMember = generateStaffMember(
    12,
    "pat_fat",
    [StaffRole.Commentator, StaffRole.Streamer],
    null,
    null,
    [
        socialX("pat_fat04"),
        socialTwitch("noob_pat")
    ]
)

const staffVega:StaffMember = generateStaffMember(
    13,
    "Vega",
    [StaffRole.Commentator],
    linkProfilePic("Vega-300.webp"),
    null,
    [
        socialX("vega_spl")
    ]
)

const staffMasterRs:StaffMember = generateStaffMember(
    14,
    "MasterRS",
    [StaffRole.Commentator],
    linkProfilePic("MasterRs-300.webp"),
    null,
    [
        socialX("The_MasterRS"),
        socialYouTubeUser("MasterRS")
    ]
)

const staffFe4RLess:StaffMember = generateStaffMember(
    15,
    "Fe4RLess",
    [StaffRole.Commentator],
    null,
    null,
    [
        socialX("Spl_Fe4RLess")
    ]
)

const staffJonRu:StaffMember = generateStaffMember(
    16,
    "JonRu",
    [StaffRole.Streamer, StaffRole.Commentator],
    linkProfilePic("jonru-300.webp"),
    null,
    [
        socialX("_JonRu_"),
        socialTwitch("jonru16")
    ]
)

const staffMidna:StaffMember = generateStaffMember(
    17,
    "ぽさMidna🎶",
    [StaffRole.Commentator],
    null,
    null,
    [
        socialX("Midna2501"),
        socialInstagram("midna_twilight_18"),
        socialTwitch("midna_twilight_2004")
    ]
)

const staffMarjora:StaffMember = generateStaffMember(
    18,
    "mαrjσrα",
    [StaffRole.Streamer, StaffRole.Commentator, StaffRole.Designer, StaffRole.Council],
    linkProfilePic("marjora-300.webp"),
    null,
    [
        socialX("marjora0503"),
        socialTwitch("marjora0503")
    ]
)

const staffRaphi:StaffMember = generateStaffMember(
    19,
    "Raphi",
    [StaffRole.Commentator],
    linkProfilePic("Raphi-300.webp"),
    null,
    [
        socialX("BucketRaphi"),
        socialTwitch("raphi_spl")
    ]
)

const staffNolle:StaffMember = generateStaffMember(
    20,
    "Nolle",
    [StaffRole.Commentator],
    linkProfilePic("Nolle-300.webp"),
    null,
    [
        socialX("WPG_Nolle"),
        socialYouTubeChannel("UCAAiapslzH7bMKLhEGyMOvQ"),
        socialTwitch("nollkokossus")
    ]
)

const staffCyo:StaffMember = generateStaffMember(
    101,
    "Cyo",
    [StaffRole.Developer,
        StaffRole.Streamer,
        StaffRole.Commentator,
        StaffRole.Designer],
    linkProfilePic("cyo-300.webp"),
    null,
    [
        socialX("InklingOnFire"),
        socialTwitch("inklingonfire"),
        socialYouTubeChannel("UC0HVbY7wsUK9BYahTvWTkGg")
    ]
)

const staffRedwood:StaffMember = generateStaffMember(
    104,
    "Redwood",
    [StaffRole.Commentator],
    linkProfilePic("redwood-300.webp"),
    null,
    [
        socialX("Redwood_KL")
    ]
)

const staffNeira:StaffMember = generateStaffMember(
    105,
    "Neira",
    [StaffRole.Council],
    linkProfilePic("neira-300.webp"),
    null,
    [
        socialTwitch("heyneira"),
        socialX("HeyNeira")
    ]
)

const staffVenatus:StaffMember = generateStaffMember(
    100,
    "Venatus",
    [StaffRole.Developer],
    linkProfilePic("venatus-300.webp"),
    null,
    [
        socialTwitch("venatus247")
    ]
)

const staffPiiiro:StaffMember = generateStaffMember(
    21,
    "piiiro",
    [StaffRole.SocialMediaManager],
    linkProfilePic("piiiro-300.webp"),
    null,
    [
        socialX("daa_piro")
    ]
)

const staffEnte:StaffMember = generateStaffMember(
    107,
    "Ente",
    [StaffRole.Commentator],
    linkProfilePic("ente-300.webp"),
    null,
    [
        socialX("SplatEnte"),
        socialTwitch("ente_spl"),
        socialYouTubeChannel("UCcvmYWCHoLumucc64s_u0IQ")
    ]
)

const staffFish:StaffMember = generateStaffMember(
    108,
    "Fishシ",
    [StaffRole.Streamer, StaffRole.Commentator],
    linkProfilePic("Fish-300.webp"),
    null,
    [
        socialX("FishoftheGame"),
        socialTwitch("fishofthegame")
    ]
)

const staffInkception:StaffMember = generateStaffMember(
    109,
    "Inkception",
    [StaffRole.Developer],
    linkProfilePic("Inkception-300.webp"),
    null,
    [
        socialTwitch("inkception1508")
    ]
)
/*
const staffJiyu:StaffMember = generateStaffMember(
    110,
    "Jiyu",
    [],
    linkProfilePic("jiyu-300.webp"),
    null,
    []
)*/

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
        socialX("NanGOAT24")
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
    linkProfilePic("Rubi-300.webp"),
    null,
    [
        socialX("RubiIstKuhl"),
        socialTwitch("rubiistkuhl"),
        socialYouTubeChannel("UClHiezWcqOOhXl4SwUBJfkw")
    ]
)

const staffShio:StaffMember = generateStaffMember(
    115,
    "Shio˜",
    [StaffRole.Streamer, StaffRole.Commentator],
    linkProfilePic("Shio-300.webp"),
    null,
    [
        socialX("Shio_Osu"),
        socialTwitch("shio_toudou"),
        socialYouTubeChannel("UCf09JP9iKIzQd7C59fcTbaA")
    ]
)

const staffSplashX:StaffMember = generateStaffMember(
    116,
    "SplashX",
    [StaffRole.Cutter],
    linkProfilePic("SplashX-300.webp"),
    null,
    [
        socialX("SplashX_yt_"),
        socialTikTok("splashx_yt_"),
        socialYouTubeUser("SplashX"),
    ]
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
    linkProfilePic("Browni-300.webp"),
    null,
    [
        socialX("Brufnie"),
        socialTwitch("brufnie")
    ]
)
/*
const staffTrioxit:StaffMember = generateStaffMember(
    119,
    "Trioxit",
    [StaffRole.Commentator],
    linkProfilePic("trioxit-300.webp"),
    null,
    [
        socialX("trioxit")
    ]
)*/

const staffLumin:StaffMember = generateStaffMember(
    120,
    "Lumin",
    [StaffRole.Commentator],
    linkProfilePic("Lumin-300.webp"),
    null,
    [
        socialX("Lumin_spl")
    ]
)

const staffDaniel:StaffMember = generateStaffMember(
    122,
    "Daniel",
    [StaffRole.Commentator,
    StaffRole.Streamer],
    null,
    null,
    []
)

const staffChysan:StaffMember = generateStaffMember(
    124,
    "Chysan",
    [StaffRole.Council],
    null,
    null,
    []
)

const staffThestrawberrybunnyy:StaffMember = generateStaffMember(
    125,
    "Fey",
    [StaffRole.Council],
    linkProfilePic("Fey-300.webp"),
    null,
    []
)

const staff2Fresh4You:StaffMember = generateStaffMember(
    126,
    "2Fresh4You",
    [StaffRole.Commentator],
    null,
    null,
    []
)

const staffEST:StaffMember = generateStaffMember(
    127,
    "EST",
    [StaffRole.Commentator],
    null,
    null,
    []
)

const staffNeoko:StaffMember = generateStaffMember(
    128,
    "neoko",
    [StaffRole.Commentator],
    null,
    null,
    [socialX("Neoko146")]
)

const staffSpy:StaffMember = generateStaffMember(
    129,
    "Spy",
    [StaffRole.Commentator],
    null,
    null,
    []
)

const staffStrohkoenig:StaffMember = generateStaffMember(
    130,
    "Strohkoenig",
    [StaffRole.Commentator],
    null,
    null,
    []
)

const staffVani:StaffMember = generateStaffMember(
    131,
    "Vani",
    [StaffRole.Commentator],
    linkProfilePic("Vani-300.webp"),
    null,
    [socialX("rt__Vani")]
)

const staffTent:StaffMember = generateStaffMember(
    132,
    "TenT",
    [StaffRole.Designer],
    linkProfilePic("tent-300.webp"),
    null,
    [socialX("Moth182001")]
)

const staffDxmi:StaffMember = generateStaffMember(
    133,
    "Dxmi",
    [StaffRole.Commentator, StaffRole.Council],
    linkProfilePic("Dxmi-300.webp"),
    null,
    [socialX("Dxmi_spl")]
)

const staffHisuji:StaffMember = generateStaffMember(
    134,
    "Hisuji",
    [StaffRole.Council],
    null,
    null,
    [socialX("pseudoschaf")]
)

const staffSnake:StaffMember = generateStaffMember(
    135,
    "Snake",
    [StaffRole.Council],
    null,
    null,
    []
)

const staffNoodle:StaffMember = generateStaffMember(
    136,
    "Noodle",
    [StaffRole.Designer],
    null,
    null,
    []
)

const staffMaoam:StaffMember = generateStaffMember(
    138,
    "Maoam",
    [StaffRole.Commentator],
    null,
    null,
    []
)

const staffManoli:StaffMember = generateStaffMember(
    139,
    "Manoli",
    [StaffRole.Commentator],
    null,
    null,
    [
        socialX("ManoliClips")
    ]
)

const staffFroody:StaffMember = generateStaffMember(
    140,
    "Froody",
    [StaffRole.Commentator],
    linkProfilePic("Froody-300.webp"),
    null,
    [socialX("Frooodyyy")]
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

function generateSocialMediaData(type:SocialMediaType, name:string, icon:string, url:string):SocialMediaData {
    return {
        type: type,
        name: name,
        icon: icon,
        url: url
    }
}

function socialX(userId:string):SocialMediaData {
    return generateSocialMediaData(SocialMediaType.X, "X", X_ICON, `https://x.com/${userId}`)
}

function socialTwitch(userId:string) {
    return generateSocialMediaData(SocialMediaType.Twitch, "Twitch", TWITCH_ICON, `https://www.twitch.tv/${userId}`)
}

function socialYouTubeChannel(channelId:string):SocialMediaData {
    return generateSocialMediaData(SocialMediaType.YouTube, "YouTube", YOUTUBE_ICON, `https://www.youtube.com/channel/${channelId}`)
}

function socialYouTubeUser(userId:string):SocialMediaData {
    return generateSocialMediaData(SocialMediaType.YouTube, "YouTube", YOUTUBE_ICON, `https://www.youtube.com/@${userId}`)
}

function socialInstagram(userId:string):SocialMediaData {
    return generateSocialMediaData(SocialMediaType.Instagram, "Instagram", INSTAGRAM_ICON, `https://instagram.com/${userId}`)
}

function socialTikTok(userId:string):SocialMediaData {
    return generateSocialMediaData(SocialMediaType.TikTok, "TikTok", TIKTOK_ICON, `https://www.tiktok.com/@${userId}`)
}

function linkProfilePic(file:string):string {
    return `/images/profileImages/${file}`
}

export const DATA_STAFF = [
    staffGlacey,
    staffNindoTim,
    staffLufti,
    staffYpsilon,
    staffCardbrige,

    staffNeira,

    staffCyo,
    staffInkception,
    staffVenatus,

    staffPiiiro,

    staffBrowni,
    staffFish,
    staffMarjora,
    staffNixenwolf,
    staffShio,

    staffEnte,
    staffFe4RLess,
    staffJonRu,
    staffLu,
    staffLumin,
    staffMasterRs,
    staffMidna,
    staffNango,
    staffNolle,
    staffNoobPat,
    staffRaphi,
    staffRubi,
    staffSquidel,
    staffVega,
    staffDaniel,
    staffChysan,
    staffThestrawberrybunnyy,
    staff2Fresh4You,
    staffEST,
    staffNeoko,
    staffSpy,
    staffStrohkoenig,
    staffVani,
    staffTent,
    staffDxmi,
    staffHisuji,
    staffSnake,
    staffNoodle,
    staffNathan,
    staffSplashX,
    staffMaoam,
    staffManoli,
    staffFroody
].sort((a, b) => {
    const roleA = getHighestStaffRole(a.roles)!
    const roleB = getHighestStaffRole(b.roles)!

    //first: sort parameter is role
    if(roleA !== roleB) {
        return roleA - roleB
    }

    //sort name alphabetically
    return a.name.localeCompare(b.name)
})

DATA_STAFF.forEach(staff => {
    staff.socialMedias.sort((a, b) => a.type - b.type)
})
