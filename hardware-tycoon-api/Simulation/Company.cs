using System;

namespace hardware_tycoon_api.Simulation
{
    public class Company
    {
        public int OwnerId;
        public World World {get;set;}
        public string CEO { get; set; }
        public string Name { get; set; }
        public long Money { get; set; }
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
            if (CurrentDevelopment != null)
                CurrentDevelopment.CurrentPoints++;
        }
    }
}
