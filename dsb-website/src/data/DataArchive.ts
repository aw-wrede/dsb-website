import {ArchiveSeason, ArchiveTourney, ArchiveType} from "../interfaces/ArchiveData";

const YT_RECORDED_VIDEOS_TITLE = "Videoaufnahmen zum Turnier"

//2020.06.08 - 2020.08.23
export const DSB_SEASON_1:ArchiveSeason = {
    name: "DSB Season 1",
    type: ArchiveType.DSB_SEASON,
    date: "08.06.2020 - 23.08.2020",
    image: "/images/dsb_season_1_banner.webp",
    divisions: [
        {
            id: 1,
            name: "Division 1",
            url: "https://challonge.com/DSBS1D1",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 2,
            name: "Division 2",
            url: "https://challonge.com/DSBS1D2",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 3,
            name: "Division 3",
            url: "https://challonge.com/DSBS1D3",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 4,
            name: "Division 4",
            url: "https://challonge.com/DSBS1D4",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 5,
            name: "Division 5",
            url: "https://challonge.com/DSBS1D5",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 6,
            name: "Division 6",
            url: "https://challonge.com/DSBS1D6",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 7,
            name: "Division 7",
            url: "https://challonge.com/DSBS1D7",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 8,
            name: "Division 8",
            url: "https://challonge.com/DSBS1D8",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 9,
            name: "Division 9",
            url: "https://challonge.com/DSBS1D9",
            show: true,
            showUrl: false,
            links: []
        },
    ],
    links: []
}

//2020.09.12
export const DSB_SPLATFEST_1:ArchiveTourney = {
    name: "DSB Splatfest",
    type: ArchiveType.OFF_SEASON,
    date: "12.09.2020",
    image: "/images/dsb_splatfest.webp",
    brackets: [
        {
            id: 1,
            name: null,
            url: "https://challonge.com/de/DSBSplatfest",
            winners: [
                "FreeZe",
                "4 Fragezeichen",
                "Increased Damage"
            ],
            show: true,
            showUrl: true
        }
    ],
    links: [
        {
            id: 0,
            name: YT_RECORDED_VIDEOS_TITLE,
            url: "https://www.youtube.com/playlist?list=PL14mLbOPBoai8lDHsv3HrnRlOa4u_8UQT",
            show: false,
            showUrl: true
        }
    ]
}

//2020.09.26
export const DSP_1:ArchiveTourney = {
    name: "Deutscher Splatoon Pokal 1",
    type: ArchiveType.DSP,
    date: "26.09.2020",
    image: "/images/dsb_dsp_1.webp",
    brackets: [
        {
            id: 1,
            name: "Gruppenphase",
            url: "https://challonge.com/de/DeutscherSplatoonPokal",
            winners: [],
            show: false,
            showUrl: true
        },
        {
            id: 2,
            name: "Alpha Bracket",
            url: "https://challonge.com/de/DeutscherSplatoonPokalAlpha",
            winners: [
                "Dim Sea",
                "Addicted Penguins",
                "ReUnited"
            ],
            show: true,
            showUrl: true
        },
        {

            id: 3,
            name: "Beta Bracket",
            url: "https://challonge.com/de/DeutscherSplatoonPokalBeta",
            winners: [
                "SG CST Fanclub"
            ],
            show: true,
            showUrl: true
        }
    ],
    links: []
}

//2020.10.26 - 2021.01.10
export const DSB_SEASON_2:ArchiveSeason = {
    name: "DSB Season 2",
    type: ArchiveType.DSB_SEASON,
    date: "26.10.2020 - 10.01.2021",
    image: "/images/dsb_season_2_banner.webp",
    divisions: [
        {
            id: 1,
            name: "Division 1",
            url: "https://challonge.com/DSBS2D1",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 2,
            name: "Division 2",
            url: "https://challonge.com/DSBS2D2",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 3,
            name: "Division 3",
            url: "https://challonge.com/DSBS2D3",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 4,
            name: "Division 4",
            url: "https://challonge.com/DSBS2D4",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 5,
            name: "Division 5",
            url: "https://challonge.com/DSBS2D5",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 6,
            name: "Division 6",
            url: "https://challonge.com/DSBS2D6",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 7,
            name: "Division 7",
            url: "https://challonge.com/DSBS2D7",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 8,
            name: "Division 8",
            url: "https://challonge.com/DSBS2D8",
            show: true,
            showUrl: false,
            links: []
        },
    ],
    links: []
}

// 2021.03.06
export const DSB_TURMHORROR_1:ArchiveTourney = {
    name: "DSB Turmhorror",
    type: ArchiveType.OFF_SEASON,
    date: "06.03.2021",
    image: "/images/dsb_turmhorror.webp",
    brackets: [
        {
            id: 1,
            name: null,
            url: "https://challonge.com/de/DSBTurmHorror",
            winners: [
                "Shouko",
                "MevQueen",
                "Tamako"
            ],
            show: true,
            showUrl: true
        }
    ],
    links: []
}

// 2021.03.20 - 2021.03.21
export const DSB_BUNDESLAENDER_BRAWL_1:ArchiveTourney = {
    name: "DSB Bundesländer Brawl",
    type: ArchiveType.OFF_SEASON,
    date: "20. - 21.03.2021",
    image: "/images/dsb_bundeslaender_brawl.webp",
    brackets: [
        {
            id: 1,
            name: "Alpha Bracket",
            url: "https://challonge.com/de/BundeslaenderBrawl",
            winners: [
                "Baden-Württemberg 3",
                "Hessen 1",
                "Nordrhein-Westfalen 8"
            ],
            show: true,
            showUrl: true
        },
        {
            id: 2,
            name: "Beta Bracket",
            url: "https://challonge.com/de/BundeslaenderBrawlBeta",
            winners: [
                "Niedersachsen/Bremen 2"
            ],
            show: true,
            showUrl: true
        }
    ],
    links: []
}

// 2021.04.04
export const DSP_2:ArchiveTourney = {
    name: "Deutscher Splatoon Pokal 2",
    type: ArchiveType.DSP,
    date: "04.04.2021",
    image: "/images/dsb_dsp_2.webp",
    brackets: [
        {
            id: 1,
            name: null,
            url: "https://challonge.com/de/DeutscherSplatoonPokal2",
            winners: [
                "Black Line",
                "Spectrum + shüchen",
                "Port Rakoome"
            ],
            show: true,
            showUrl: true
        }
    ],
    links: []
}

//2021.04.12 - 2021.06.07
export const DSB_SEASON_3:ArchiveSeason = {
    name: "DSB Season 3",
    type: ArchiveType.DSB_SEASON,
    date: "12.04. - 07.06.2021",
    image: "/images/dsb_season_3_banner.webp",
    divisions: [
        {
            id: 1,
            name: "Division 1",
            url: "https://challonge.com/DSBS3D1",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 2,
            name: "Division 2",
            url: "https://challonge.com/DSBS3D2",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 3,
            name: "Division 3",
            url: "https://challonge.com/DSBS3D3",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 4,
            name: "Division 4",
            url: "https://challonge.com/DSBS3D4",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 5,
            name: "Division 5",
            url: "https://challonge.com/DSBS3D5",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 6,
            name: "Division 6",
            url: "https://challonge.com/DSBS3D6",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 7,
            name: "Division 7",
            url: "https://challonge.com/DSBS3D7",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 8,
            name: "Division 8",
            url: "https://challonge.com/DSBS3D8",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 9,
            name: "Division 9",
            url: "https://challonge.com/DSBS3D9",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 10,
            name: "Seeding Turnier",
            url: "https://challonge.com/de/DSBS3Seeding",
            show: false,
            showUrl: true,
            links: []
        },
    ],
    links: []
}

// 2021.10.09
export const DSB_LEAGUE_RUSH_1:ArchiveTourney = {
    name: "DSB League Rush",
    type: ArchiveType.OFF_SEASON,
    date: "09.10.2021",
    image: "/images/dsb_league_rush.webp",
    brackets: [
        {
            id: 1,
            name: "Alpha Bracket",
            url: "https://challonge.com/de/DSBLeagueAlpha",
            winners: [
                "Silence, HeavenPheonix, Waffel_boyy",
                "Mevlingo, 2fresh4you, Trizy, GintoX",
            ],
            show: true,
            showUrl: true
        },
        {
            id: 2,
            name: "Beta Bracket",
            url: "https://challonge.com/de/DSBLeagueBeta",
            winners: [
                "Georg, Tamako, YuSnipe, Shouko",
            ],
            show: true,
            showUrl: true
        },
        {
            id: 3,
            name: "Gamma Bracket",
            url: "https://challonge.com/de/DSBLeagueGamma",
            winners: [
                "Damian, Radish, Tuffi, Zombie",
            ],
            show: true,
            showUrl: true
        },
    ],
    links: []
}

//2021.10.23
export const STRIKING_TOURNEY_1:ArchiveTourney = {
    name: "Striking Tourney",
    type: ArchiveType.OFF_SEASON,
    date: "23.10.2021",
    image: "/images/dsb_striking_tourney.webp",
    brackets: [
        {
            id: 1,
            name: null,
            url: "https://challonge.com/de/DSBStriking",
            winners: [
                "MonkeyGang",
                "Abdul",
                "Drip 💧"
            ],
            show: true,
            showUrl: true
        }
    ],
    links: []
}

// 2021.10.30
export const DSB_PRINCESS_TOWER_1:ArchiveTourney = {
    name: "DSB Princess Tower",
    type: ArchiveType.OFF_SEASON,
    date: "30.10.2021",
    image: "/images/dsb_princess_tower.webp",
    brackets: [
        {
            id: 1,
            name: "Alpha Bracket",
            url: "https://challonge.com/de/DSBPrincess",
            winners: [
                "Monkey Gang",
                "Fuchsteufels Wild",
                "Addicted Penguins"
            ],
            show: true,
            showUrl: true
        },
        {
            id: 2,
            name: "Beta Bracket",
            url: "https://challonge.com/de/DSBPrincessBeta",
            winners: [
                "Die Sternenkrieger",
            ],
            show: true,
            showUrl: true
        }
    ],
    links: []
}

// 2021.11.13
export const DSP_3:ArchiveTourney = {
    name: "Deutscher Splatoon Pokal 3",
    type: ArchiveType.DSP,
    date: "13.11.2021",
    image: "/images/dsb_dsp_3.webp",
    brackets: [
        {
            id: 1,
            name: "Alpha Bracket",
            url: "https://challonge.com/de/DeutscherSplatoonPokal3",
            winners: [
                "Kampfschnecken",
                "Monkey Gang",
                "Ink Subs"
            ],
            show: true,
            showUrl: true
        },
        {
            id: 2,
            name: "Beta Bracket",
            url: "https://challonge.com/de/DeutscherSplatoonPokal3Beta",
            winners: [
                "Myopsidus"
            ],
            show: true,
            showUrl: true
        }
    ],
    links: []
}

// 2021.11.22 - 2022.02.20
export const DSB_SEASON_4:ArchiveSeason = {
    name: "DSB Season 4",
    type: ArchiveType.DSB_SEASON,
    date: "22.11.2021 - 20.02.2022",
    image: "/images/dsb_season_4_banner.webp",
    divisions: [
        {
            id: 1,
            name: "Division 1",
            url: "https://challonge.com/DSBS4D1",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 2,
            name: "Division 2",
            url: "https://challonge.com/DSBS4D2",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 3,
            name: "Division 3",
            url: "https://challonge.com/DSBS4D3",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 4,
            name: "Division 4",
            url: "https://challonge.com/DSBS4D4",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 5,
            name: "Division 5",
            url: "https://challonge.com/DSBS4D5",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 6,
            name: "Division 6",
            url: "https://challonge.com/DSBS4D6",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 7,
            name: "Division 7",
            url: "https://challonge.com/DSBS4D7",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 8,
            name: "Division 8",
            url: "https://challonge.com/DSBS4D8",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 9,
            name: "Seeding Turnier",
            url: "https://challonge.com/de/DSBS4Seeding",
            show: false,
            showUrl: true,
            links: []
        },
    ],
    links: []
}

//2022.04.02
export const KING_PROTECTION_1:ArchiveTourney = {
    name: "King Protection",
    type: ArchiveType.OFF_SEASON,
    date: "02.04.2022",
    image: "/images/dsb_king_protection.webp",
    brackets: [
        {
            id: 1,
            name: "Alpha Bracket",
            url: "https://challonge.com/de/DSBKingProtection",
            winners: [
                "Raysight",
                "Turtle-Gang",
                "Centopia, 1&1+1 und ohne Shio"
            ],
            show: true,
            showUrl: true
        },
        {
            id: 2,
            name: "Beta Bracket",
            url: "https://challonge.com/de/DSBKingProtectionBeta",
            winners: [
                "Infinity"
            ],
            show: true,
            showUrl: true
        }
    ],
    links: []
}

// 2022.04.09
export const PAYLOAD_1:ArchiveTourney = {
    name: "DSB Payload",
    type: ArchiveType.OFF_SEASON,
    date: "09.04.2022",
    image: "/images/dsb_payload.webp",
    brackets: [
        {
            id: 1,
            name: "Alpha Bracket",
            url: "https://challonge.com/de/DSBPayload",
            winners: [
                "star-Gang",
                "Bloodline",
                "Delicious Nuggets, Unbenannt"
            ],
            show: true,
            showUrl: true
        },
        {
            id: 2,
            name: "Beta Bracket",
            url: "https://challonge.com/de/DSBPayloadBeta",
            winners: [
                "Squid Elite"
            ],
            show: true,
            showUrl: true
        }
    ],
    links: []
}

// 2022.04.30
export const DSP_4:ArchiveTourney = {
    name: "Deutscher Splatoon Pokal 4",
    type: ArchiveType.DSP,
    date: "30.04.2022",
    image: "/images/dsb_dsp_4.webp",
    brackets: [
        {
            id: 1,
            name: "Alpha Bracket",
            url: "https://challonge.com/de/DeutscherSplatoonPokal4",
            winners: [
                "Raysight",
                "Centopia",
                "Bimbam"
            ],
            show: true,
            showUrl: true
        },
        {
            id: 2,
            name: "Beta Bracket",
            url: "https://challonge.com/de/DeutscherSplatoonPokal4Beta",
            winners: [
                "Bloodline"
            ],
            show: true,
            showUrl: true
        }
    ],
    links: []
}

// 2022.05.09 - 2022.07.03
export const DSB_SEASON_5:ArchiveSeason = {
    name: "DSB Season 5",
    type: ArchiveType.DSB_SEASON,
    date: "09.05. - 03.07.2022",
    image: "/images/dsb_season_5_banner.webp",
    divisions: [
        {
            id: 1,
            name: "Division 1",
            url: "https://challonge.com/DSBS5D1",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 2,
            name: "Division 2",
            url: "https://challonge.com/DSBS5D2",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 3,
            name: "Division 3",
            url: "https://challonge.com/DSBS5D3",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 4,
            name: "Division 4",
            url: "https://challonge.com/DSBS5D4",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 5,
            name: "Division 5",
            url: "https://challonge.com/DSBS5D5",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 6,
            name: "Division 6",
            url: "https://challonge.com/DSBS5D6",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 7,
            name: "Division 7",
            url: "https://challonge.com/DSBS5D7",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 8,
            name: "Division 8",
            url: "https://challonge.com/DSBS5D8",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 9,
            name: "Seeding Turnier",
            url: "https://challonge.com/de/DSBS5Seeding",
            show: false,
            showUrl: true,
            links: []
        }
    ],
    links: []
}

//2022.10.10 - 2022.12.04
export const DSB_SEASON_6:ArchiveSeason = {
    name: "DSB Season 6",
    type: ArchiveType.DSB_SEASON,
    date: "10.10. - 04.12.2022",
    image: "/images/dsb_season_6_banner.webp",
    divisions: [
        {
            id: 1,
            name: "Division 1",
            url: "https://challonge.com/DSBS6D1",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 2,
            name: "Division 2",
            url: "https://challonge.com/DSBS6D2",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 3,
            name: "Division 3",
            url: "https://challonge.com/DSBS6D3",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 4,
            name: "Division 4",
            url: "https://challonge.com/DSBS6D4",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 5,
            name: "Division 5",
            url: "https://challonge.com/DSBS6D5",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 6,
            name: "Division 6",
            url: "https://challonge.com/DSBS6D6",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 7,
            name: "Division 7",
            url: "https://challonge.com/DSBS6D7",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 8,
            name: "Division 8",
            url: "https://challonge.com/DSBS6D8",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 9,
            name: "Seeding Turnier",
            url: "https://challonge.com/de/DSBS6Seeding",
            show: false,
            showUrl: true,
            links: []
        }
    ],
    links: []
}

// 2022.07.09
export const STRIKING_TOURNEY_2:ArchiveTourney = {
    name: "Striking Tourney 2",
    type: ArchiveType.OFF_SEASON,
    date: "09.07.2022",
    image: "/images/dsb_striking_tourney.webp",
    brackets: [
        {
            id: 1,
            name: null,
            url: "https://challonge.com/de/DSBStrikingSpecialEdition",
            winners: [
                "Centopia",
                "Ka musste schnell gehen",
                "Raysight"
            ],
            show: true,
            showUrl: true
        }
    ],
    links: []
}

//2023.04.24 - 2023.06.18
export const DSB_SEASON_7:ArchiveSeason = {
    name: "DSB Season 7",
    type: ArchiveType.DSB_SEASON,
    date: "24.04. - 18.06.2023",
    image: "/images/dsb_season_7_banner.webp",
    divisions: [
        {
            id: 1,
            name: "Division 1",
            url: "https://challonge.com/DSBS7D1",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 2,
            name: "Division 2",
            url: "https://challonge.com/DSBS7D2",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 3,
            name: "Division 3",
            url: "https://challonge.com/DSBS7D3",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 4,
            name: "Division 4",
            url: "https://challonge.com/DSBS7D4",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 5,
            name: "Division 5",
            url: "https://challonge.com/DSBS7D5",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 6,
            name: "Division 6",
            url: "https://challonge.com/DSBS7D6",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 7,
            name: "Division 7",
            url: "https://challonge.com/DSBS7D7",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 8,
            name: "Division 8",
            url: "https://challonge.com/DSBS7D8",
            show: true,
            showUrl: false,
            links: []
        },
        {
            id: 9,
            name: "Seeding Turnier",
            url: "https://challonge.com/de/DSBS6Seeding",
            show: false,
            showUrl: true,
            links: []
        },
        {
            id: 10,
            name: "Division 1 Beta",
            url: "https://challonge.com/de/DSBS7D1Beta",
            show: false,
            showUrl: true,
            links: []
        },
        {
            id: 11,
            name: "Division 2 Beta",
            url: "https://challonge.com/de/DSBS7D2Beta",
            show: false,
            showUrl: true,
            links: []
        },
        {
            id: 12,
            name: "Division 3 Beta",
            url: "https://challonge.com/de/DSBS7D3Beta",
            show: false,
            showUrl: true,
            links: []
        },
        {
            id: 13,
            name: "Division 4 Beta",
            url: "https://challonge.com/de/DSBS7D4Beta",
            show: false,
            showUrl: true,
            links: []
        }
    ],
    links: []
}

export const DATA_ARCHIVE = [
    DSB_SEASON_7,
    DSB_SEASON_6,
    STRIKING_TOURNEY_2,
    DSB_SEASON_5,
    DSP_4,
    PAYLOAD_1,
    KING_PROTECTION_1,
    DSB_SEASON_4,
    DSP_3,
    DSB_PRINCESS_TOWER_1,
    STRIKING_TOURNEY_1,
    DSB_LEAGUE_RUSH_1,
    DSB_SEASON_3,
    DSP_2,
    DSB_BUNDESLAENDER_BRAWL_1,
    DSB_TURMHORROR_1,
    DSB_SEASON_2,
    DSP_1,
    DSB_SPLATFEST_1,
    DSB_SEASON_1
]