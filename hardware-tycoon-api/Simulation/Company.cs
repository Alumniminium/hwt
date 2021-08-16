using System;
using System.Collections.Generic;

namespace hardware_tycoon_api.Simulation
{
    public class Company
    {
        public int OwnerId;
        public World World {get;set;}
        public string CEO { get; set; }
        public string Name { get; set; }
        public long Money { get; set; }

        public Dictionary<string, Project> UnlockedResearch { get; set; } = new();
        public Project CurrentResearch { get; set; }
        public Project CurrentDevelopment { get; set; }

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
                CurrentResearch.CurrentPoints++;
            if(CurrentResearch.Progress == 100)
                UnlockedResearch.Add(CurrentResearch.Name,CurrentResearch);
            if (CurrentDevelopment != null)
                CurrentDevelopment.CurrentPoints++;
            
        }
    }
}
