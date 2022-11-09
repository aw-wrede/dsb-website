namespace Core.Controller
{
    public interface IPublicIdentified : IIdentified
    {
        public string Uuid { get; set; }
    }
}