namespace hardware_tycoon_api.Simulation
{
    public class Ceo
    {
        public int PlayerId;
        public string Name;
        public Ceo(int playerId, string ceoName)
        {
            PlayerId = playerId;
            Name = ceoName;
        }

        public Game Game => Core.Games[PlayerId];
        public Company Company => Game.World.Companies[PlayerId];
    }
}