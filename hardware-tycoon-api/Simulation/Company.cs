namespace hardware_tycoon_api.Simulation
{
    public class Company
    {
        public World World {get;set;}
        public int OwnerId {get;set; }
        public string CEO { get; set; }
        public string Name { get; set; }
        public long Money { get; set; }
        public Project CurrentResearch { get; set; }
        public Project CurrentDevelopment { get; set; }

        public Company(World world, int id, string ceo, string name)
        {
            CEO = ceo;
            World = world;
            OwnerId = id;
            Name = name;
        }

    }
}
