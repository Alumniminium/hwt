using System;
using System.Collections.Generic;

namespace hardware_tycoon_api.Simulation
{
    public class World
    {
        public int GameId;
        public Dictionary<int, Company> Companies = new();
        public Market Market = new();
        public DateTime Date { get; set; }

        public World(int gameId)
        {
            GameId = gameId;
            Date = new DateTime(1970, 4, 20);
        }
        internal void AddCompany(Ceo ceo, string companyName)
        {
            var company = new Company(ceo, companyName)
            {
                Money = 100_000
            };
            Companies.Add(ceo.PlayerId, company);
        }
    }
}
