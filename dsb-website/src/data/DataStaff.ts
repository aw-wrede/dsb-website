import {getHighestStaffRole, SocialMediaData, StaffMember, StaffRole} from "../interfaces/StaffData";

export const TWITTER_ICON = "twitter-white.svg"
export const TWITCH_ICON = "twitch-white.svg"
export const YOUTUBE_ICON = "youtube-white.png"
export const INSTAGRAM_ICON = "instagram-white.svg"
export const TIKTOK_ICON = "tiktok-white.svg"

/**
 * Staff Member Ids:
 *  0 - Glacey
 *  1 - NindoTim
 *  2 - Alice
 *  3 - Lufti
 *  4 - Yuki
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
 *  119 - Trioxit
 *  120 - Lumin
 *  121 - Hannichu
 *  122 - Daniel
 *  123 - Pica
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
        socialTwitter("GlaceyXG"),
        socialTwitch("glaceyxg"),
        socialYouTubeChannel("UCUwoGwSAOVEt-9zArymLXfw")
    ]
)

const staffNindoTim:StaffMember = generateStaffMember(
    1,
    "NindoTimRS",
    [StaffRole.TO,
        StaffRole.Council,
        StaffRole.Streamer,
        StaffRole.Commentator,
        StaffRole.Cutter],
    linkProfilePic("nindotim-300.webp"),
    null,
    [
        socialTwitter("TimNindo"),
        socialTwitch("nindotimrs"),
        socialYouTubeChannel("UCJV6gXYRdryf81ko_ZFJvaQ")
    ]
)

const staffAlice:StaffMember = generateStaffMember(
    2,
    "공주 Alice",
    [StaffRole.Council],
    linkProfilePic("alice-300.webp"),
    null,
    [
        socialTwitter("Aloschus")
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

const staffYuki:StaffMember = generateStaffMember(
    4,
    "Yukina",
    [StaffRole.TO, StaffRole.Council],
    null,
    null,
    []
)

const staffYpsilon:StaffMember = generateStaffMember(
    5,
    "Ypsilon",
    [StaffRole.ASSIST_TO,
        StaffRole.Council],
    null,
    null,
    []
)

const staffCardbrige:StaffMember = generateStaffMember(
    6,
    "Cardbrige",
    [StaffRole.ASSIST_TO,
        StaffRole.Council,
        StaffRole.Cutter],
    linkProfilePic("Cardbrige-300.webp"),
    null,
    [
        socialTwitter("CardbrigeSpl"),
        socialTwitch("grillhd505"),
        socialYouTubeChannel("UC4h1-ab8eS2vZZZbk2C5SmQ")
    ]
)



const staffNixenwolf:StaffMember = generateStaffMember(
    11,
    "Nixenwolf",
    [StaffRole.Streamer,
        StaffRole.Commentator,
        StaffRole.Cutter],
    linkProfilePic("Nixenwolf-300.webp"),
    null,
    [
        socialTwitter("Nixenwolf"),
        socialYouTubeUser("Nixenwolf")
    ]
)

const staffNoobPat:StaffMember = generateStaffMember(
    12,
    "noob_pat",
    [StaffRole.Commentator],
    null,
    null,
    [
        socialTwitter("noob_pat04"),
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
        socialTwitter("vega_spl")
    ]
)

const staffMasterRs:StaffMember = generateStaffMember(
    14,
    "MasterRS",
    [StaffRole.Commentator],
    null,
    null,
    [
        socialTwitter("The_MasterRS"),
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
        socialTwitter("Spl_Fe4RLess")
    ]
)

const staffJonRu:StaffMember = generateStaffMember(
    16,
    "JonRu",
    [StaffRole.Streamer, StaffRole.Commentator],
    linkProfilePic("jonru-300.webp"),
    null,
    [
        socialTwitter("_JonRu_"),
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
        socialTwitter("Midna2501"),
        socialInstagram("midna_twilight_18"),
        socialTwitch("midna_twilight_2004")
    ]
)

const staffMarjora:StaffMember = generateStaffMember(
    18,
    "mαrjσrα",
    [StaffRole.Streamer, StaffRole.Commentator, StaffRole.Designer],
    linkProfilePic("marjora-300.webp"),
    null,
    [
        socialTwitter("marjora0503"),
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
        socialTwitter("BucketRaphi"),
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
        socialTwitter("WPG_Nolle"),
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
        socialTwitter("InklingOnFire"),
        socialTwitch("inklingonfire"),
        socialYouTubeChannel("UC0HVbY7wsUK9BYahTvWTkGg")
    ]
)

const staffTsuki:StaffMember = generateStaffMember(
    102,
    "Tsuki つき",
    [StaffRole.Designer],
    linkProfilePic("tsuki-300.webp"),
    null,
    [
        socialTwitter("spl_tsuki"),
        socialTwitch("tsukiko_cx"),
        socialYouTubeChannel("UCd2yYwSgPT7DlY4x1I815vw")
    ]
)

const staffReh:StaffMember = generateStaffMember(
    103,
    "REH",
    [StaffRole.Council],
    linkProfilePic("reh-300.webp"),
    null,
    [
        socialTwitter("reh191")
    ]
)

const staffRedwood:StaffMember = generateStaffMember(
    104,
    "Redwood",
    [StaffRole.Council, StaffRole.Commentator],
    linkProfilePic("redwood-300.webp"),
    null,
    [
        socialTwitter("Redwood_KL")
    ]
)

const staffNeira:StaffMember = generateStaffMember(
    105,
    "Neira",
    [StaffRole.Council],
    linkProfilePic("neira-300.webp"),
    null,
    [
        socialTwitter("Neira_LOS")
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

/*const staffBarli:StaffMember = generateStaffMember(
    106,
    "Barli",
    [StaffRole.Commentator],
    null,
    null,
    [
        socialTwitter("Barli_spl")
    ]
)*/

const staffDari:StaffMember = generateStaffMember(
    21,
    "Dari",
    [StaffRole.SocialMediaManager],
    linkProfilePic("dari-300.webp"),
    null,
    [
        socialTwitter("dari_spl")
    ]
)

const staffEnte:StaffMember = generateStaffMember(
    107,
    "Ente",
    [StaffRole.Streamer, StaffRole.Commentator],
    linkProfilePic("ente-300.webp"),
    null,
    [
        socialTwitter("SplatEnte"),
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
        socialTwitter("FishoftheGame"),
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

const staffJiyu:StaffMember = generateStaffMember(
    110,
    "Jiyu",
    [StaffRole.Commentator],
    linkProfilePic("jiyu-300.webp"),
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
        socialTwitter("NanGOAT24")
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
        socialTwitter("Shio_Osu"),
        socialTwitch("shio_toudou"),
        socialYouTubeChannel("UCf09JP9iKIzQd7C59fcTbaA")
    ]
)

const staffShio:StaffMember = generateStaffMember(
    115,
    "Shio˜",
    [StaffRole.Streamer, StaffRole.Commentator],
    linkProfilePic("Shio-300.webp"),
    null,
    [
        socialTwitter("RubiIstKuhl"),
        socialTwitch("rubiistkuhl"),
        socialYouTubeChannel("UClHiezWcqOOhXl4SwUBJfkw")
    ]
)

const staffSplashX:StaffMember = generateStaffMember(
    116,
    "SplashX",
    [StaffRole.Cutter],
    linkProfilePic("SplashX-300.webp"),
    null,
    [
        socialTwitter("SplashX_yt_"),
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
        socialTwitter("Brufnie"),
        socialTwitch("brufnie")
    ]
)

const staffTrioxit:StaffMember = generateStaffMember(
    119,
    "Trioxit",
    [StaffRole.Commentator],
    linkProfilePic("trioxit-300.webp"),
    null,
    [
        socialTwitter("trioxit")
    ]
)

const staffLumin:StaffMember = generateStaffMember(
    120,
    "Lumin",
    [StaffRole.Commentator],
    null,
    null,
    []
)

/*const staffHannichu:StaffMember = generateStaffMember(
    121,
    "Hannichu",
    [StaffRole.Commentator],
    linkProfilePic("Hannichu-300.webp"),
    null,
    [
        socialTwitter("DB_Hannichu")
    ]
)*/

const staffDaniel:StaffMember = generateStaffMember(
    122,
    "Daniel",
    [StaffRole.Commentator],
    null,
    null,
    []
)

/*const staffPica:StaffMember = generateStaffMember(
    123,
    "Pica",
    [StaffRole.Commentator],
    linkProfilePic("Pica-300.webp"),
    null,
    []
)*/

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

function socialTwitter(userId:string):SocialMediaData {
    return generateSocialMediaData("Twitter", TWITTER_ICON, `https://twitter.com/${userId}`)
}

function socialTwitch(userId:string) {
    return generateSocialMediaData("Twitch", TWITCH_ICON, `https://www.twitch.tv/${userId}`)
}

function socialYouTubeChannel(channelId:string):SocialMediaData {
    return generateSocialMediaData("YouTube", YOUTUBE_ICON, `https://www.youtube.com/channel/${channelId}`)
}

function socialYouTubeUser(userId:string):SocialMediaData {
    return generateSocialMediaData("YouTube", YOUTUBE_ICON, `https://www.youtube.com/@${userId}`)
}

function socialInstagram(userId:string):SocialMediaData {
    return generateSocialMediaData("Instagram", INSTAGRAM_ICON, `https://instagram.com/${userId}`)
}

function socialTikTok(userId:string):SocialMediaData {
    return generateSocialMediaData("TikTok", TIKTOK_ICON, `https://www.tiktok.com/@${userId}`)
}

function linkProfilePic(file:string):string {
    return `/images/profileImages/${file}`
}

export const DATA_STAFF = [
    staffGlacey,
    staffNindoTim,
    staffAlice,
    staffLufti,
    staffYuki,
    staffYpsilon,
    staffCardbrige,

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

    //staffBarli,
    staffEnte,
    staffFe4RLess,
    staffJiyu,
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
    staffTrioxit,
    staffVega,
    //staffHannichu,
    staffDaniel,

    staffNathan,
    staffSplashX
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

