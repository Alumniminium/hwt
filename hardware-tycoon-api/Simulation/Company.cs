using System;
using System.Collections.Generic;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Simulation
{
    public class Company
    {
        public int OwnerId;
        public World World { get; set; }
        public string CEO { get; set; }
        public string Name { get; set; }
        public long Money { get; set; }

        public Dictionary<string, ResearchProject> UnlockedResearch { get; set; } = new();
        public Dictionary<string, Product> DevelopingProducts { get; set; } = new();
        public ResearchProject CurrentResearch { get; set; }
        public ResearchProject CurrentDevelopment { get; set; }

        public Company(World world, int ownerId, string ceo, string name)
        {
            OwnerId = ownerId;
            CEO = ceo;
            World = world;
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
