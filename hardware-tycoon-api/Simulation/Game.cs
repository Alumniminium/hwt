namespace hardware_tycoon_api.Simulation
{
    public class Game
    {
        public int Id { get; set; }
        public int Difficulty { get; set; }
        public World World { get; set; }

        public Game(int difficulty)
        {
            Id = Core.GenerateGameId();
            Difficulty = difficulty;

            World = new World(Id);
            Core.Games.Add(Id, this);
        }

        internal void SimulationStep()
        {
            World.Date = World.Date.AddDays(1);
            foreach (var kvp in World.Companies)
            {
                var company = kvp.Value;
                company.Tick();
            }
            World.Market.Tick();
        }
    }
}
