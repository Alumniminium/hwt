using System.Linq;

namespace hardware_tycoon_api.Simulation
{
    public class Ceo
    {
        public int GameId;
        public int Id;
        public string Name;

        public Game Game => Core.Games[GameId];
        public World World => Game.World;
        public Company Company => World.Companies.First(c => c.Value.CeoId == Id).Value;

        public Ceo(int gameId, string name)
        {
            GameId = gameId;
            Name = name;
            Id= World.GenerateCeoId();
            World.CEOs.Add(Id,this);
        }
    }
}