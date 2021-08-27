namespace hardware_tycoon_api.Simulation
{
    public class Game
    {
        public int Id { get; set; }
        public int Difficulty { get; set; }
        public int GameSpeed {get;set;} = 1;
        public World World { get; set; }
        public GameTimer GameTimer;

        public Game(int difficulty)
        {
            Id = Core.GenerateGameId();
            Difficulty = difficulty;

            World = new World(Id);
            GameTimer = new(this);
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
