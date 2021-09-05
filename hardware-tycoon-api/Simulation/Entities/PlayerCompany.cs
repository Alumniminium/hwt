using System.Collections.Generic;

namespace hardware_tycoon_api.Simulation
{
    public class PlayerCompany : Company
    {
        public Dictionary<string, RndProject> UnlockedResearch { get; set; } = new();
        public RndProject CurrentResearch { get; set; }
        public RndProject CurrentDevelopment { get; set; }

        public PlayerCompany(int gameId, int ceoId, string name) : base(gameId, ceoId, name) { }

        public override void Tick()
        {
            if (CurrentResearch != null)
            {
                if (CurrentResearch.Progress >= 100)
                {
                    UnlockedResearch.Add(CurrentResearch.Name, CurrentResearch);
                    CurrentResearch = null;
                }
                else
                    CurrentResearch.CurrentPoints++;
            }

            if (CurrentDevelopment != null)
            {
                if (CurrentDevelopment.Progress >= 100)
                {
                    World.Market.AddProduct(Products[CurrentDevelopment.Name]);
                    CurrentDevelopment = null;
                }
                else
                    CurrentDevelopment.CurrentPoints++;
            }
            base.Tick();
        }
    }
}
