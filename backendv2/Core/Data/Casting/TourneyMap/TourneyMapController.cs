using Commons;
using Commons.Localization;
using Core.Controller;
using MongoDB.Driver;

namespace Core.Data.Casting.TourneyMap;

public class TourneyMapController : DatabaseController<TourneyMapController, TourneyMap>
{
    protected TourneyMapController() {}
    
    public override void OnStartup()
    {
        base.OnStartup();
        EnsureMaps();
    }

    public bool TryGetByMapIdentifier(TourneyMapType type, out TourneyMap map)
    {
        map = Collection.FindSync(x => x.MapIdentifier.Equals(type)).FirstOrDefault();
        return map != null;
    }

    public List<TourneyMap> GetAll()
    {
        return Collection.FindSync(x => true).ToList();
    }
    
    private void EnsureMaps()
    {
        var maps = GetAllMaps();
        foreach (var map in maps.Where(map => !Collection.FindSync(new ExpressionFilterDefinition<TourneyMap>(collectionMap => collectionMap.MapIdentifier == map.MapIdentifier)).Any()))
        {
            Logger.Info($"Adding map '{map.Name}' to database");
            Instance.InsertOne(map);
        }
    }
    
    private static List<TourneyMap> GetAllMaps()
    {
        const string mapWebDirectory = "/maps";
        var list = new List<TourneyMap>();

        #region Splatoon 2

        #region The Reef
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.TheReef,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "The Reef",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "The Reef"},
                { Localization.Japanese, "バッテラストリート" },
                { Localization.Dutch, "Sushistraat" },
                { Localization.French, "Allées salées" },
                { Localization.German, "Korallenviertel" },
                { Localization.Italian, "Rione Storione" },
                { Localization.Russian, "Риф" },
                { Localization.Spanish, "Barrio Congrio" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.TheReef.ToString()}.webp"
        });
        #endregion

        #region Musselforge Fitness
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.MusselforgeFitness,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Musselforge Fitness",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Musselforge Fitness"},
                { Localization.Japanese, "フジツボスポーツクラブ" },
                { Localization.Dutch, "Vinvis Fitness" },
                { Localization.French, "Gymnase Ancrage" },
                { Localization.German, "Molluskelbude" },
                { Localization.Italian, "Centro polpisportivo" },
                { Localization.Russian, "Спортзал «Кревед!»" },
                { Localization.Spanish, "Gimnasio Mejillón" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.MusselforgeFitness.ToString()}.webp"
        });
        #endregion
        
        #region Starfish Mainstage
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.StarfishMainstage,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Starfish Mainstage",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Starfish Mainstage"},
                { Localization.Japanese, "ガンガゼ野外音楽堂" },
                { Localization.Dutch, "Zeesterrenstage" },
                { Localization.French, "Scène Sirène" },
                { Localization.German, "Seeigel-Rockbühne" },
                { Localization.Italian, "Palco Plancton" },
                { Localization.Russian, "КЗ «Иглокожий»" },
                { Localization.Spanish, "Auditorio Erizo" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.StarfishMainstage.ToString()}.webp"
        });
        #endregion
        
        #region Humpback Pump Track
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.HumpbackPumpTrack,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Humpback Pump Track",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Humpback Pump Track"},
                { Localization.Japanese, "コンブトラック" },
                { Localization.Dutch, "Lekkerbektrack" },
                { Localization.French, "Piste Méroule" },
                { Localization.German, "Buckelwal-Piste" },
                { Localization.Italian, "Tintodromo Montecarpa" },
                { Localization.Russian, "Велозал «9-й вал»" },
                { Localization.Spanish, "Tiburódromo" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.HumpbackPumpTrack.ToString()}.webp"
        });
        #endregion
        
        #region Inkblot Art Academy
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.InkblotArtAcademySpl2,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Inkblot Art Academy",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Inkblot Art Academy"},
                { Localization.Japanese, "海女美術大学" },
                { Localization.Dutch, "Koraalcampus" },
                { Localization.French, "Institut Calam'arts" },
                { Localization.German, "Perlmutt-Akademie" },
                { Localization.Italian, "Campus Hippocampus" },
                { Localization.Russian, "Академия «Лепота»" },
                { Localization.Spanish, "Instituto Coralino" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.InkblotArtAcademySpl2.ToString()}.webp"
        });
        #endregion
        
        #region Sturgeon Shipyard
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.SturgeonShipyardSpl2,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Sturgeon Shipyard",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Sturgeon Shipyard"},
                { Localization.Japanese, "チョウザメ造船" },
                { Localization.Dutch, "Walruswerf" },
                { Localization.French, "Chantier Narval" },
                { Localization.German, "Störwerft" },
                { Localization.Italian, "Cantiere Pinnenere" },
                { Localization.Russian, "Осетровые верфи" },
                { Localization.Spanish, "Astillero Beluga" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.SturgeonShipyardSpl2.ToString()}.webp"
        });
        #endregion
        
        #region Moray Towers
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.MorayTowers,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Moray Towers",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Moray Towers"},
                { Localization.Japanese, "タチウオパーキング" },
                { Localization.Dutch, "Tonijntorens" },
                { Localization.French, "Tours Girelle" },
                { Localization.German, "Muränentürme" },
                { Localization.Italian, " 	Torri cittadine" },
                { Localization.Russian, "Муренские башни" },
                { Localization.Chinese, "带鱼双塔" },
                { Localization.Korean, "갈치 주차장" },
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.MorayTowers.ToString()}.webp"
        });
        #endregion
        
        #region Port Mackerel
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.PortMackerel,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Port Mackerel",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Port Mackerel"},
                { Localization.Japanese, "ホッケふ頭" },
                { Localization.Dutch, "Hamerhaaihaven" },
                { Localization.French, "Docks Haddock" },
                { Localization.German, "Heilbutt-Hafen" },
                { Localization.Italian, "Porto Polpo" },
                { Localization.Russian, "Порт «Корюшка»" },
                { Localization.Spanish, "Puerto Jurel" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.PortMackerel.ToString()}.webp"
        });
        #endregion
        
        #region Manta Maria
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.MantaMaria,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Manta Maria",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Manta Maria"},
                { Localization.Japanese, "マンタマリア号" },
                { Localization.Dutch, "Klipvisklipper" },
                { Localization.French, "Manta Maria" },
                { Localization.German, "Manta Maria" },
                { Localization.Italian, "Manta Maria" },
                { Localization.Russian, "Манта Мария" },
                { Localization.Spanish, "Corbeta Corvina" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.MantaMaria.ToString()}.webp"
        });
        #endregion
        
        #region Kelp Dome
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.KelpDome,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Kelp Dome",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Kelp Dome"},
                { Localization.Japanese, "モズク農園" },
                { Localization.Dutch, "Kelpwierkas" },
                { Localization.French, "Serre Goémon" },
                { Localization.German, "Tümmlerkuppel" },
                { Localization.Italian, "Serra di alghe" },
                { Localization.Russian, "Ферма ламинарии" },
                { Localization.Spanish, "Jardín botánico" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.KelpDome.ToString()}.webp"
        });
        #endregion
        
        #region Snapper Canal
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.SnapperCanal,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Snapper Canal",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Snapper Canal"},
                { Localization.Japanese, "エンガワ河川敷" },
                { Localization.Dutch, "Moeraalkanaal" },
                { Localization.French, "Canalamar" },
                { Localization.German, "Grätenkanal" },
                { Localization.Italian, "Canale Cannolicchio" },
                { Localization.Russian, "Подмостовье" },
                { Localization.Spanish, "Canal Cormorán" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.SnapperCanal.ToString()}.webp"
        });
        #endregion
        
        #region Blackbelly Skatepark
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.BlackbellySkatepark,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Blackbelly Skatepark",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Blackbelly Skatepark"},
                { Localization.Japanese, "Ｂバスパーク" },
                { Localization.Dutch, "Snoekduik-skatepark" },
                { Localization.French, "Skatepark Mako" },
                { Localization.German, "Punkasius-Skatepark" },
                { Localization.Italian, "Pista Polposkate" },
                { Localization.Russian, "Скейт-парк «Скат»" },
                { Localization.Spanish, "Parque Lubina" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.BlackbellySkatepark.ToString()}.webp"
        });
        #endregion
        
        #region MakoMart
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.MakoMartSpl2,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "MakoMart",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "MakoMart"},
                { Localization.Japanese, "ザトウマーケット" },
                { Localization.Dutch, "Bultrugbazaar" },
                { Localization.French, "Supermarché Cétacé" },
                { Localization.German, "Cetacea-Markt" },
                { Localization.Italian, "Mercatotano" },
                { Localization.Russian, "Горбуша-Маркет" },
                { Localization.Spanish, "Ultramarinos Orca" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.MakoMartSpl2.ToString()}.webp"
        });
        #endregion
        
        #region Walleye Warehouse
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.WalleyeWarehouse,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Walleye Warehouse",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Walleye Warehouse"},
                { Localization.Japanese, "ハコフグ倉庫" },
                { Localization.Dutch, "Zeeleeuwloods" },
                { Localization.French, "Encrepôt" },
                { Localization.German, "Kofferfisch-Lager" },
                { Localization.Italian, "Magazzino" },
                { Localization.Russian, "Инкрабсклад" },
                { Localization.Spanish, "Almacén Rodaballo" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.WalleyeWarehouse.ToString()}.webp"
        });
        #endregion
        
        #region Shellendorf Institute
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.ShellendorfInstitute,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Shellendorf Institute",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Shellendorf Institute"},
                { Localization.Japanese, "デボン海洋博物館" },
                { Localization.Dutch, "Vistorisch museum" },
                { Localization.French, "La Galerie des Abysses" },
                { Localization.German, "Abyssal-Museum" },
                { Localization.Italian, "Museo paleontonnologico" },
                { Localization.Russian, "музей «Мезозой»" },
                { Localization.Spanish, "Galería Raspa" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.ShellendorfInstitute.ToString()}.webp"
        });
        #endregion
        
        #region Arowana Mall
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.ArowanaMall,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Arowana Mall",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Arowana Mall"},
                { Localization.Japanese, "アロワナモール" },
                { Localization.Dutch, "Piranha Plaza" },
                { Localization.French, "Centre Arowana" },
                { Localization.German, "Arowana Center" },
                { Localization.Italian, "Centro commerciale" },
                { Localization.Russian, "ТЦ «Аравана»" },
                { Localization.Spanish, "Plazuela del Calamar" },
                { Localization.Portuguese, "Centro comercial Arowana" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.ArowanaMall.ToString()}.webp"
        });
        #endregion
        
        #region Goby Arena
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.GobyArena,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Goby Arena",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Goby Arena"},
                { Localization.Japanese, "アジフライスタジアム" },
                { Localization.Dutch, "Planktonstadion" },
                { Localization.French, "Stade Bernique" },
                { Localization.German, "Backfisch-Stadion" },
                { Localization.Italian, "Arena Sardina" },
                { Localization.Russian, "Арена «Лужа»" },
                { Localization.Spanish, "Estadio Ajolote" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.GobyArena.ToString()}.webp"
        });
        #endregion
        
        #region Piranha Pit
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.PiranhaPit,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Piranha Pit",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Piranha Pit"},
                { Localization.Japanese, "ショッツル鉱山" },
                { Localization.Dutch, "Grondelgroeve" },
                { Localization.French, "Carrières Caviar" },
                { Localization.German, "Steinköhler-Grube" },
                { Localization.Italian, "Miniera d'Orata" },
                { Localization.Russian, "Пираньев карьер" },
                { Localization.Spanish, "Cantera Tintorera" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.PiranhaPit.ToString()}.webp"
        });
        #endregion
        
        #region Camp Triggerfish
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.CampTriggerfish,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Camp Triggerfish",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Camp Triggerfish"},
                { Localization.Japanese, "モンガラキャンプ場" },
                { Localization.Dutch, "Kamp Karper" },
                { Localization.French, "Hippo-Camping" },
                { Localization.German, "Camp Schützenfisch" },
                { Localization.Italian, "Campeggio Totan" },
                { Localization.Russian, "База «Спинорог»" },
                { Localization.Spanish, "Campamento Arowana" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.CampTriggerfish.ToString()}.webp"
        });
        #endregion
        
        #region Wahoo World
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.WahooWorldSpl2,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Wahoo World",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Wahoo World"},
                { Localization.Japanese, "スメーシーワールド" },
                { Localization.Dutch, "Waterwonderland" },
                { Localization.French, "Parc Carapince" },
                { Localization.German, "Flunder-Funpark" },
                { Localization.Italian, "Soglioland" },
                { Localization.Russian, "Луна-парк «Язь»" },
                { Localization.Spanish, "Pirañalandia" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.WahooWorldSpl2.ToString()}.webp"
        });
        #endregion
        
        #region New Albacore Hotel
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.NewAlbacoreHotel,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "New Albacore Hotel",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "New Albacore Hotel"},
                { Localization.Japanese, "ホテルニューオートロ" },
                { Localization.Dutch, "Hotel de Keizersvis" },
                { Localization.French, "Hôtel Atoll" },
                { Localization.German, "Hotel Neothun" },
                { Localization.Italian, "Hotel Tellina" },
                { Localization.Russian, "Отель «Прибой»" },
                { Localization.Spanish, "Gran Hotel Caviar" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.NewAlbacoreHotel.ToString()}.webp"
        });
        #endregion
        
        #region Ancho-V Games
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.AnchoVGames,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Ancho-V Games",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Ancho-V Games"},
                { Localization.Japanese, "アンチョビットゲームズ" },
                { Localization.Dutch, "Ansjobit-gamestudio" },
                { Localization.French, "Tentatec Studio" },
                { Localization.German, "Anchobit Games HQ" },
                { Localization.Italian, "Acciugames" },
                { Localization.Russian, "Гуппи-Геймдев" },
                { Localization.Spanish, "Estudios Esturión" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.AnchoVGames.ToString()}.webp"
        });
        #endregion

        #region Skipper Pavilion
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.SkipperPavilion,
            GameVersion = TourneyGameVersion.Splatoon2,
            Name = "Skipper Pavilion",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Skipper Pavilion"},
                { Localization.Japanese, "ムツゴ楼" },
                { Localization.Dutch, "Palingpaviljoen" },
                { Localization.French, "Lagune aux gobies" },
                { Localization.German, "Grundel-Pavillon" },
                { Localization.Italian, "Padiglione Capitone" },
                { Localization.Russian, "Парк «Во Сток»" },
                { Localization.Spanish, "Puerta del Gobio" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyMapType.SkipperPavilion.ToString()}.webp"
        });
        #endregion
        
        #endregion

        #region Splatoon 3

        #region Scorch Gorge
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.ScorchGorge,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Scorch Gorge",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Scorch Gorge"},
                { Localization.Japanese, "ユノハナ大渓谷" },
                { Localization.Dutch, "Roggentrog" },
                { Localization.French, "Canyon aux colonnes" },
                { Localization.German, "Sengkluft" },
                { Localization.Italian, "Grank Canyon" },
                { Localization.Russian, "Опаленное ущелье" },
                { Localization.Spanish, "Desfiladero Fumarola" },
                { Localization.Chinese, "温泉花大峡谷"},
                { Localization.Korean, "석순 대협곡"},
                { Localization.Portuguese, "Scorch Gorge"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.ScorchGorge.ToString()}.webp"
        });
        #endregion
        
        #region Eeltail Alley
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.EeltailAlley,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Eeltail Alley",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Eeltail Alley"},
                { Localization.Japanese, "ゴンズイ地区" },
                { Localization.Dutch, "Forelviaduct" },
                { Localization.French, "Banlieue Balibot" },
                { Localization.German, "Streifenaal-Straße" },
                { Localization.Italian, "Sobborgo Siluriano" },
                { Localization.Russian, "Угрево-Скатово" },
                { Localization.Spanish, "Callejones Crustáceo" },
                { Localization.Chinese, "鳗鲶区"},
                { Localization.Korean, "메기 지구"},
                { Localization.Portuguese, "Eeltail Alley"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.EeltailAlley.ToString()}.webp"
        });
        #endregion
        
        #region Hagglefish Market
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.HagglefishMarket,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Hagglefish Market",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Hagglefish Market"},
                { Localization.Japanese, "ヤガラ市場" },
                { Localization.Dutch, "Boter-bij-de-vismarkt" },
                { Localization.French, "Marché Grefin" },
                { Localization.German, "Schnapperchen-Basar" },
                { Localization.Italian, "Mercato Fruttato" },
                { Localization.Russian, "Рынок «Свисторыб»" },
                { Localization.Spanish, "Mercado Lenguado" },
                { Localization.Chinese, "烟管鱼市场"},
                { Localization.Korean, "대치 시장"},
                { Localization.Portuguese, "Hagglefish Market"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.HagglefishMarket.ToString()}.webp"
        });
        #endregion
        
        #region Undertow Spillway
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.UndertowSpillway,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Undertow Spillway",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Undertow Spillway"},
                { Localization.Japanese, "マテガイ放水路" },
                { Localization.Dutch, "Baarsreservoir" },
                { Localization.French, "Réservoir Rigadelle" },
                { Localization.German, "Schwertmuschel-Reservoir" },
                { Localization.Italian, "Cisterna Cernia" },
                { Localization.Russian, "Приливослив" },
                { Localization.Spanish, "Cisterna Navajuela" },
                { Localization.Chinese, "竹蛏疏洪道"},
                { Localization.Korean, "맛조개 방수로"},
                { Localization.Portuguese, "Undertow Spillway"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.UndertowSpillway.ToString()}.webp"
        });
        #endregion
        
        #region Mincemeat Metalworks
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.MincemeatMetalworks,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Mincemeat Metalworks",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Mincemeat Metalworks"},
                { Localization.Japanese, "ナメロウ金属" },
                { Localization.Dutch, "Zilversmelt-hoogovens" },
                { Localization.French, "Casse Rascasse" },
                { Localization.German, "Aalstahl-Metallwerk" },
                { Localization.Italian, "Discarica Tritatutto" },
                { Localization.Russian, "Цех «Тартар»" },
                { Localization.Spanish, "Desguace Mero" },
                { Localization.Chinese, "鱼肉碎金属"},
                { Localization.Korean, "나메로우 금속"},
                { Localization.Portuguese, "Mincemeat Metalworks"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.MincemeatMetalworks.ToString()}.webp"
        });
        #endregion
        
        #region Hammerhead Bridge
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.HammerheadBridge,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Hammerhead Bridge",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Hammerhead Bridge"},
                { Localization.Japanese, "マサバ海峡大橋" },
                { Localization.Dutch, "Brandingbrug" },
                { Localization.French, "Pont Esturgeon" },
                { Localization.German, "Makrelenbrücke" },
                { Localization.Italian, "Ponte Sgombro" },
                { Localization.Russian, "Акулий мост" },
                { Localization.Spanish, "Puente Salmón" },
                { Localization.Chinese, "真鲭跨海大桥"},
                { Localization.Korean, "고등어 해협 대교"},
                { Localization.Portuguese, "Hammerhead Bridge"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.HammerheadBridge.ToString()}.webp"
        });
        #endregion
        
        #region Museum d'Alfonsino
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.MuseumAlfonsino,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Museum d'Alfonsino",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Museum d'Alfonsino"},
                { Localization.Japanese, "キンメダイ美術館" },
                { Localization.Dutch, "Galerie Le Guppy" },
                { Localization.French, "Galeries Guppy" },
                { Localization.German, "Pinakoithek" },
                { Localization.Italian, "Museo di Cefalò" },
                { Localization.Russian, "Галерея «Де Берикс»" },
                { Localization.Spanish, "Museo del Pargo" },
                { Localization.Chinese, "金眼鲷美术馆"},
                { Localization.Korean, "도미 미술관"},
                { Localization.Portuguese, "Museum d'Alfonsino"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.MuseumAlfonsino.ToString()}.webp"
        });
        #endregion
        
        #region Mahi-Mahi Resort
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.MahiMahiResort,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Mahi-Mahi Resort",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Mahi-Mahi Resort"},
                { Localization.Japanese, "マヒマヒリゾート＆スパ" },
                { Localization.Dutch, "El Dorade-resort" },
                { Localization.French, "Club Ca$halot" },
                { Localization.German, "Mahi-Mahi-Resort" },
                { Localization.Italian, "Villanguilla" },
                { Localization.Russian, "Спа-курорт «Золотая рыбка»" },
                { Localization.Spanish, "Spa Cala Bacalao" },
                { Localization.Chinese, "鬼头刀SPA度假区"},
                { Localization.Korean, "만새기 리조트＆스파"},
                { Localization.Portuguese, "Mahi-Mahi Resort"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.MahiMahiResort.ToString()}.webp"
        });
        #endregion
        
        #region Inkblot Art Academy (Splatoon 3)
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.InkblotArtAcademySpl3,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Inkblot Art Academy (Splatoon 3)",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Inkblot Art Academy"},
                { Localization.Japanese, "海女美術大学" },
                { Localization.Dutch, "Koraalcampus" },
                { Localization.French, "Institut Calam'arts" },
                { Localization.German, "Perlmutt-Akademie" },
                { Localization.Italian, "Campus Hippocampus" },
                { Localization.Russian, "Академия «Лепота»" },
                { Localization.Spanish, "Instituto Coralino" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.InkblotArtAcademySpl3.ToString()}.webp"
        });
        #endregion
        
        #region Sturgeon Shipyard (Splatoon 3)
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.SturgeonShipyardSpl3,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Sturgeon Shipyard (Splatoon 3)",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Sturgeon Shipyard"},
                { Localization.Japanese, "チョウザメ造船" },
                { Localization.Dutch, "Walruswerf" },
                { Localization.French, "Chantier Narval" },
                { Localization.German, "Störwerft" },
                { Localization.Italian, "Cantiere Pinnenere" },
                { Localization.Russian, "Осетровые верфи" },
                { Localization.Spanish, "Astillero Beluga" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.SturgeonShipyardSpl3.ToString()}.webp"
        });
        #endregion

        #region MakoMart (Splatoon 3)
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.MakoMartSpl3,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "MakoMart (Splatoon 3)",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "MakoMart"},
                { Localization.Japanese, "ザトウマーケット" },
                { Localization.Dutch, "Bultrugbazaar" },
                { Localization.French, "Supermarché Cétacé" },
                { Localization.German, "Cetacea-Markt" },
                { Localization.Italian, "Mercatotano" },
                { Localization.Russian, "Горбуша-Маркет" },
                { Localization.Spanish, "Ultramarinos Orca" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.MakoMartSpl3.ToString()}.webp"
        });
        #endregion
        
        #region Wahoo World (Splatoon 3)
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.WahooWorldSpl3,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Wahoo World (Splatoon 3)",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Wahoo World"},
                { Localization.Japanese, "スメーシーワールド" },
                { Localization.Dutch, "Waterwonderland" },
                { Localization.French, "Parc Carapince" },
                { Localization.German, "Flunder-Funpark" },
                { Localization.Italian, "Soglioland" },
                { Localization.Russian, "Луна-парк «Язь»" },
                { Localization.Spanish, "Pirañalandia" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.WahooWorldSpl3.ToString()}.webp"
        });
        #endregion
        
        #region Brinewater Springs (Splatoon 3)
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.BrinewaterSpringsSpl3,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Brinewater Springs (Splatoon 3)",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Brinewater Springs"},
                { Localization.Japanese, "クサヤ温泉" },
                { Localization.Dutch, "Barbeelbaden" },
                { Localization.French, "Sources Sauret" },
                { Localization.German, "Kusaya-Quellen" },
                { Localization.Italian, "Fermenterme" },
                { Localization.Russian, "Тухловодск" },
                { Localization.Spanish, "Balneario Aguasal" },
                { Localization.Chinese, "臭鱼干温泉"},
                { Localization.Korean, "과메기 온천"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.BrinewaterSpringsSpl3.ToString()}.webp"
        });
        #endregion
        
        #region Flounder Heights (Splatoon 3)
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.FlounderHeightsSpl3,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Flounder Heights (Splatoon 3)",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Flounder Heights"},
                { Localization.Japanese, "ヒラメが丘団地" },
                { Localization.Dutch, "Baleinbuurt" },
                { Localization.French, "Lotissement Filament" },
                { Localization.German, "Schollensiedlung" },
                { Localization.Italian, "Cime Sogliolose" },
                { Localization.Russian, "Микрорайон «Камбалово»" },
                { Localization.Spanish, "Complejo Medusa" },
                { Localization.Chinese, "比目鱼住宅区"},
                { Localization.Korean, "과메기 넙치 언덕 단지"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.FlounderHeightsSpl3.ToString()}.webp"
        });
        #endregion
        
        #region Um'ami Ruins (Splatoon 3)
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.UmamiRuinsSpl3,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Um'ami Ruins (Splatoon 3)",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Um'ami Ruins"},
                { Localization.Japanese, "ナンプラー遺跡" },
                { Localization.Dutch, "Ruisvoornruïnes" },
                { Localization.French, "Ruines Uma'mi" },
                { Localization.German, "Um'ami-Ruinen" },
                { Localization.Italian, "Rovine Salsadipesce" },
                { Localization.Russian, "Рыбожирные руины" },
                { Localization.Spanish, "Ruinas Ceviche" },
                { Localization.Chinese, "鱼露遗迹"},
                { Localization.Korean, "남플라 유적"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.UmamiRuinsSpl3.ToString()}.webp"
        });
        #endregion
        
        #region Manta Maria (Splatoon 3)
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.MantaMariaSpl3,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Manta Maria",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Manta Maria"},
                { Localization.Japanese, "マンタマリア号" },
                { Localization.Dutch, "Klipvisklipper" },
                { Localization.French, "Manta Maria" },
                { Localization.German, "Manta Maria" },
                { Localization.Italian, "Manta Maria" },
                { Localization.Russian, "Манта Мария" },
                { Localization.Spanish, "Corbeta Corvina" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.MantaMariaSpl3.ToString()}.webp"
        });
        #endregion
        
        #region Barnacle & Dime (Splatoon 3)
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.BarnacleAndDime,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Barnacle & Dime",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Barnacle & Dime"},
                { Localization.Japanese, "タラポートショッピングパーク" },
                { Localization.Dutch, "Winkelcentrum Poon & Zeehaan" },
                { Localization.French, "Halles de Port-merlu" },
                { Localization.German, "Talerfisch & Pock" },
                { Localization.Italian, "Empolporio" },
                { Localization.Russian, "УсоногТорг" },
                { Localization.Spanish, "Centro Comercial Fletán" },
                { Localization.Chinese, "塔拉波特购物公园"},
                { Localization.Korean, "대구 포트 쇼핑 파크"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.BarnacleAndDime.ToString()}.webp"
        });
        #endregion
        
        #region Humpback Pump Track
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.HumpbackPumpTrackSpl3,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Humpback Pump Track",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Humpback Pump Track"},
                { Localization.Japanese, "コンブトラック" },
                { Localization.Dutch, "Lekkerbektrack" },
                { Localization.French, "Piste Méroule" },
                { Localization.German, "Buckelwal-Piste" },
                { Localization.Italian, "Tintodromo Montecarpa" },
                { Localization.Russian, "Велозал «9-й вал»" },
                { Localization.Spanish, "Tiburódromo" }
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.HumpbackPumpTrackSpl3.ToString()}.webp"
        });
        #endregion
        
        #region Crableg Capital
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.CrablegCapital,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Crableg Capital",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Crableg Capital"},
                { Localization.Japanese, "タカアシ経済特区" },
                { Localization.Dutch, "Visstickdistrict" },
                { Localization.French, "Quartier Crabe-ciels" },
                { Localization.German, "Seespinnen-Skyline" },
                { Localization.Italian, "Granchiacieli" },
                { Localization.Russian, "Крабхэттен" },
                { Localization.Spanish, "Distrito Rascalópodo" },
                { Localization.Chinese , "高脚经济特区"},
                {Localization.Korean, "거미게 경제특구"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.CrablegCapital.ToString()}.webp"
        });
        #endregion
        
        #region Shipshape Cargo Co.
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.ShipshapeCargoCo,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Shipshape Cargo Co.",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Shipshape Cargo Co."},
                { Localization.Japanese, "オヒョウ海運" },
                { Localization.Dutch, "Tarbot Transport" },
                { Localization.French, "Chaland Flétan" },
                { Localization.German, "Frachtschiff Schwerfisch" },
                { Localization.Italian, "Platessa Trasporti S.r.l." },
                { Localization.Russian, "«Палтус-карго»" },
                { Localization.Spanish, "Carguero Platija" },
                { Localization.Chinese , "大比目鱼海运中心"},
                {Localization.Korean, "광어 해운"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.ShipshapeCargoCo.ToString()}.webp"
        });
        #endregion
        
        #region Robo ROM-en
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.RoboRom,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Robo ROM-en",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Robo ROM-en"},
                { Localization.Japanese, "バイガイ亭" },
                { Localization.Dutch, "Bami-Byte" },
                { Localization.French, "Arène Méca-ramen" },
                { Localization.German, "ROM & RAMen" },
                { Localization.Italian, "Roboramen" },
                { Localization.Russian, "«Роборамэн»" },
                { Localization.Spanish, "Factoría RAMen" },
                { Localization.Chinese , "贝见亭"},
                {Localization.Korean, "수랑정"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.RoboRom.ToString()}.webp"
        });
        #endregion
        
        #region Bluefin Depot
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.BluefinDepotSpl3,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Bluefin Depot",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Bluefin Depot"},
                { Localization.Japanese, "ネギトロ炭鉱" },
                { Localization.Dutch, "Blauwvin-depot\t" },
                { Localization.French, "Mine Marine" },
                { Localization.German, "Blauflossen-Depot" },
                { Localization.Italian, "Molo Mollusco" },
                { Localization.Russian, "Тунцовое депо" },
                { Localization.Spanish, "Mina costera" },
                { Localization.Chinese , "葱鲔鱼煤矿场"},
                {Localization.Korean, "참치 탄광"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.BluefinDepotSpl3.ToString()}.webp"
        });
        #endregion
        
        #region Marlin Airport
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.MarlinAirport,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Marlin Airport",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Marlin Airport"},
                { Localization.Japanese, "カジキ空港" },
                { Localization.Dutch, "Trekvis Airport" },
                { Localization.French, " Terminal Rorqual" },
                { Localization.German, "La Ola Airport" },
                { Localization.Italian, "Aeroporto Ondabianca" },
                { Localization.Russian, " Аэропорт Пенково" },
                { Localization.Spanish, "Aeropuerto Marlín" },
                { Localization.Chinese , "旗魚機場"},
                {Localization.Korean, "청새치 공항"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.MarlinAirport.ToString()}.webp"
        });
        #endregion
        
        #region Lemuria Hub
        list.Add(new TourneyMap()
        {
            MapIdentifier = TourneyMapType.LemuriaHub,
            GameVersion = TourneyGameVersion.Splatoon3,
            Name = "Lemuria Hub",
            LocalizedNames = new Dictionary<Localization, string>
            {
                { Localization.English, "Lemuria Hub"},
                { Localization.Japanese, "リュウグウターミナル" },
                { Localization.Dutch, "Lemurië Centraal" },
                { Localization.French, "Gare Aiguillat" },
                { Localization.German, "Bahnhof Lemuria" },
                { Localization.Italian, "Stazione Lemuria" },
                { Localization.Russian, "Вокзал Лемурия" },
                { Localization.Spanish, "Terminal Dragón" },
                { Localization.Chinese , "龙宫转运站"},
                {Localization.Korean, "용궁 터미널"}
            },
            ThumbnailImageLink = $"{mapWebDirectory}{TourneyGameVersion.Splatoon3}/{TourneyMapType.LemuriaHub.ToString()}.webp"
        });
        #endregion
        #endregion
        
        return list;
    }
    
}