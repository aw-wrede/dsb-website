using Commons;
using Commons.Utils;
using Core.Controller;
using MongoDB.Driver;

namespace Core.Data.Calendar;

public class DsbCalendarController : PublicDataDatabaseController<DsbCalendarController, DsbCalendar>
    {
        protected DsbCalendarController() { }

        public override void OnStartup()
        {
            base.OnStartup();
            EnsureDefaults();
        }

        private void EnsureDefaults()
        {
            var calendars = GetDefaultCalendars();
            foreach (var calendar in calendars.Where(cal => !Instance.Collection.FindSync(new MongoDB.Driver.ExpressionFilterDefinition<DsbCalendar>(collectionCal => collectionCal.Name == cal.Name)).Any()))
            {
                Logger.Info($"Adding calendar '{calendar.Name}' to database");
                InsertOne(calendar);
            }
        }

        private static List<DsbCalendar> GetDefaultCalendars()
        {
            var list = new List<DsbCalendar>();

            #region SEASONS
            var seasonCalendar = new DsbCalendar()
            {
                Name = "Seasons",
                Uuid = UuidGenerator.GenerateUuid(),
                ColorHex = "#ee7600"
            };
            
            seasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Season 1",
                StartTime = new DateTime(2020, 06, 08, 0, 0, 0),
                EndTime = new DateTime(2020, 08, 23, 23, 59, 59)
            });
            seasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Season 2",
                StartTime = new DateTime(2020, 10, 26, 0, 0, 0),
                EndTime = new DateTime(2021, 01, 10, 23, 59, 59)
            });
            seasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Season 3",
                StartTime = new DateTime(2021, 04, 12, 0, 0, 0),
                EndTime = new DateTime(2021, 06, 07, 23, 59, 59)
            });
            seasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Season 4",
                StartTime = new DateTime(2021, 11, 22, 0, 0, 0),
                EndTime = new DateTime(2022, 02, 20, 23, 59, 59)
            });
            seasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Season 5",
                StartTime = new DateTime(2022, 05, 09, 0, 0, 0),
                EndTime = new DateTime(2022, 07, 03, 23, 59, 59)
            });
            seasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Season 6",
                StartTime = new DateTime(2022, 10, 10, 0, 0, 0),
                EndTime = new DateTime(2022, 12, 04, 23, 59, 59)
            });
            seasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Season 7",
                StartTime = new DateTime(2023, 04, 24, 0, 0, 0),
                EndTime = new DateTime(2023, 06, 18, 23, 59, 59)
            });
            seasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Season 8",
                StartTime = new DateTime(2024, 04, 08, 0, 0, 0),
                EndTime = new DateTime(2024, 06, 02, 23, 59, 59)
            });
            
            #endregion SEASONS

            #region DSP

            var dspCalendar = new DsbCalendar()
            {
                Name = "DSP",
                Uuid = UuidGenerator.GenerateUuid(),
                ColorHex = "#9acd32"
            };
            dspCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSP 1",
                StartTime = new DateTime(2020, 09, 26),
                EndTime = new DateTime(2020, 09, 26)
            });
            dspCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSP 2",
                StartTime = new DateTime(2021, 04, 04),
                EndTime = new DateTime(2021, 04, 04)
            });
            dspCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSP 3",
                StartTime = new DateTime(2021, 11, 13),
                EndTime = new DateTime(2021, 11, 13)
            });
            dspCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSP 4",
                StartTime = new DateTime(2022, 04, 30),
                EndTime = new DateTime(2022, 04, 30)
            });
            
            #endregion DSP

            #region OFF-SEASON

            var offSeasonCalendar = new DsbCalendar()
            {
                Name = "Off-Season",
                Uuid = UuidGenerator.GenerateUuid(),
                ColorHex = "#4f94cd"
            };

            offSeasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Splatfest",
                StartTime = new DateTime(2020, 09, 12),
                EndTime = new DateTime(2020, 09, 12)
            });
            offSeasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Turmhorror",
                StartTime = new DateTime(2021, 03, 06),
                EndTime = new DateTime(2021, 03, 06)
            });
            offSeasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Bundesländer Brawl",
                StartTime = new DateTime(2021, 03, 20),
                EndTime = new DateTime(2021, 03, 21)
            });
            offSeasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB League Rush",
                StartTime = new DateTime(2021, 10, 09),
                EndTime = new DateTime(2021, 10, 09)
            });
            offSeasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "Striking Turnier",
                StartTime = new DateTime(2021, 10, 23),
                EndTime = new DateTime(2021, 10, 23)
            });
            offSeasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Princess Tower",
                StartTime = new DateTime(2021, 10, 30),
                EndTime = new DateTime(2021, 10, 30)
            });
            offSeasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "King Protection",
                StartTime = new DateTime(2022, 04, 02),
                EndTime = new DateTime(2022, 04, 02)
            });
            offSeasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Payload",
                StartTime = new DateTime(2022, 04, 09),
                EndTime = new DateTime(2022, 04, 09)
            });
            offSeasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "Striking Turnier: Special Edition",
                StartTime = new DateTime(2022, 07, 09),
                EndTime = new DateTime(2022, 07, 09)
            });
            offSeasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "Shopping Spree",
                StartTime = new DateTime(2023, 09, 02),
                EndTime = new DateTime(2023, 09, 02)
            });
            offSeasonCalendar.Entries.Add(new DsbCalendarEntry()
            {
                Name = "DSB Bundesländer Brawl 2",
                StartTime = new DateTime(2023, 10, 14),
                EndTime = new DateTime(2023, 10, 15)
            });
            
            #endregion
            
            list.Add(seasonCalendar);
            list.Add(dspCalendar);
            list.Add(offSeasonCalendar);
            
            return list;
        }

        public List<DsbCalendar> GetAllCleaned()
        {
            var now = DateTime.Now;
            var result = GetAll();

            result.ForEach(calendar =>
            {
                calendar.Entries = calendar.Entries
                    .FindAll(e => !e.Hidden)
                    .FindAll(e => !(e.HideAfterEvent && e.EndTime < now));
            });

            return result;
        }
        
    }