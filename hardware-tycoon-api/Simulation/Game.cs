namespace hardware_tycoon_api.Simulation
{
    public class Game
    {
        public int GameId { get; set; }
        public int Difficulty { get; set; }
        public World World { get; set; }

        public Game(int gameId, int difficulty)
        {
            GameId = gameId;
            Difficulty = difficulty;

            World = new World(GameId);
        }

        internal void SimulationStep()
        {
            World.Date = World.Date.AddDays(1);
            foreach(var kvp in World.NpcCompanies)
            {
                var company = kvp.Value;
                company.Tick();
            }
            foreach (var kvp in World.Companies)
            {
                var company = kvp.Value;
                company.Tick();
            }
            World.Market.Tick();
        }
    }
}
