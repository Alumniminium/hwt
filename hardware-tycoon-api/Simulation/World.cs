using System;
using System.Collections.Generic;

namespace hardware_tycoon_api.Simulation
{
    public class World
    {
        public int GameId;
        public Dictionary<int, Company> Companies = new();
        public Dictionary<string, NpcCompany> NpcCompanies = new();
        public Market Market = new();
        public DateTime Date { get; set; }

        public World(int gameId)
        {
            GameId = gameId;
            Date = new DateTime(1970, 4, 20);
        }
        internal void AddCompany(Ceo ceo, string name)
        {
            var company = new Company(ceo, name)
            {
                Money = 100_000
            };
            Companies.Add(ceo.PlayerId, company);
        }

        internal void AddNpcCompany(string name, string path)
        {
            var company = new NpcCompany(Core.Games[GameId],name);
            company.LoadProducts(path);
            NpcCompanies.Add(name,company);
        }
    }
}
