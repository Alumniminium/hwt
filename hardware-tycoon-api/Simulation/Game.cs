namespace hardware_tycoon_api.Simulation
{
    public class Game
    {
        public int PlayerId { get; set; }

        public World World { get; set; }
        public int Difficulty { get; set; }

        public Game(int playerId, string playerName, string companyName, int difficulty)
        {
            PlayerId = playerId;
            Difficulty = difficulty;

            World = new World(this);
            World.AddCompany(playerId, playerName, companyName);
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
