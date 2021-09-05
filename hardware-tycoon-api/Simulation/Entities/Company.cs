using System.Collections.Generic;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Simulation
{
    public abstract class Company
    {
        public int GameId;
        public int Id;
        public int CeoId;

        public string Name { get; set; }
        public long Money { get; set; }

        public Dictionary<string, Product> Products = new();

        public World World => Core.Games[GameId].World;
        public GlobalMarket Market => World.Market;

        public Company(int gameId, int ceoId, string name)
        {
            GameId = gameId;
            CeoId = ceoId;
            Name = name;
            Id = World.GenerateCompanyId();
        }

        public virtual void Tick()
        {

        }
    }
}
