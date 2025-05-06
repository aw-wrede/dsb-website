using Commons;
using Commons.Logging;
using Core.Controller;

namespace Core.Data.InkColor;

public class InkColorPairController : DatabaseController<InkColorPairController, InkColorPair>
{
    protected InkColorPairController() { }
    public override void OnStartup()
    {
        base.OnStartup();
        LoadDefaults();
    }

    private void LoadDefaults()
    {
        if (GetAll().Count > 0)
        {
            return;
        }
        
        var list = new InkColorPair[]
        {
            new (0, "#D7C422", "#4221D1") { Id = 1 },
            new (1, "#C53679", "#34BC2F") { Id = 2 },
            new (2, "#E16F35", "#3A43C8") { Id = 3 },
            new (3, "#28C6B5", "#DC533E") { Id = 4 },
            new (4, "#29C5B0", "#C84276") { Id = 5 },
            new (5, "#D5B831", "#9730CA") { Id = 6 },
            new (6, "#D35621", "#761CBA") { Id = 7 },
            new (7, "#2627B1", "#E89335") { Id = 8 },
            new (8, "#C4D54D", "#6931D0") { Id = 9 },
            new (9, "#A7CE43", "#BE37B6") { Id = 10 }
        };

        try
        {
            InsertMany(list);
        }
        catch (Exception e)
        {
            Logger.Exception(e);
        }
    }
}