using System.Collections.Generic;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Simulation
{
    public class Company
    {
        public Ceo CEO { get; set; }
        public string Name { get; set; }
        public long Money { get; set; }

        public Dictionary<string, RndProject> UnlockedResearch { get; set; } = new();
        public Dictionary<string, Product> DevelopingProducts { get; set; } = new();
        public RndProject CurrentResearch { get; set; }
        public RndProject CurrentDevelopment { get; set; }

        public World World => CEO.Game.World;
        public Market Market => World.Market;

        public Company(Ceo ceo, string name)
        {
            CEO = ceo;
            Name = name;
        }

        internal void Tick()
        {
            if (CurrentResearch != null)
            {
                CurrentResearch.CurrentPoints++;
                if (CurrentResearch.Progress == 100)
                {
                    UnlockedResearch.Add(CurrentResearch.Name, CurrentResearch);
                    CurrentResearch = null;
                }
            }
            if (CurrentDevelopment != null)
            {
                CurrentDevelopment.CurrentPoints++;
                if (CurrentDevelopment.Progress == 100)
                {
                    World.Market.AddProduct(DevelopingProducts[CurrentDevelopment.Name]);
                    CurrentDevelopment = null;
                }
            }
        }
    }
}
