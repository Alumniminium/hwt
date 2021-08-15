namespace hardware_tycoon_api.Simulation
{
    public class Game
    {
        public int OwnerId { get; set; }

        public World World { get; set; }
        public string Difficulty { get; set; }

        public Game(int ownerId, string companyName, string difficulty)
        {
            OwnerId = ownerId;
            Difficulty = difficulty;

            World = new World(this);
            World.AddCompany(ownerId, companyName);
        }


        internal void SimulationStep()
        {
            World.Date = World.Date.AddDays(1);

            foreach (var kvp in World.Companies)
            {
                var company = kvp.Value;

                if (company.CurrentResearch != null)
                    company.CurrentResearch.CurrentPoints++;
                if (company.CurrentDevelopment != null)
                    company.CurrentDevelopment.CurrentPoints++;
            }
        }
    }
}
