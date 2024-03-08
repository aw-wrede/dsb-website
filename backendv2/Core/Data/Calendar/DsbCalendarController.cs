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
                Instance.InsertOne(calendar);
            }
        }

        private List<DsbCalendar> GetDefaultCalendars()
        {
            var list = new List<DsbCalendar>();

            #region SEASONS
            var seasonCalendar = new DsbCalendar()
            {
                Name = "Seasons",
                Uuid = UuidGenerator.GenerateUuid(),
                ColorHex = "#fdc72c"
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
            
            #endregion SEASONS

            #region DSP

            var dspCalendar = new DsbCalendar()
            {
                Name = "DSP",
                Uuid = UuidGenerator.GenerateUuid(),
                ColorHex = "#d43e39"
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
            
            list.Add(seasonCalendar);
            list.Add(dspCalendar);
            
            return list;
        }
        
    }