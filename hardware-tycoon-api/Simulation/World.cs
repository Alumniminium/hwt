using System;
using System.Collections.Generic;

namespace hardware_tycoon_api.Simulation
{
    public class World
    {
        public int GameId;
        public Dictionary<int, Ceo> CEOs = new();
        public Dictionary<int, Company> Companies = new();
        public Market Market = new();
        public DateTime Date { get; set; }

        public World(int gameId)
        {
            GameId = gameId;
            Date = new DateTime(1970, 4, 20);
        }
        internal void AddCompany(int ceoId, string name, string path = "")
        {
            var company = new Company(GameId, ceoId, name)
            {
                Money = 100_000
            };
            if (path != "")
                company.LoadProducts(path);
            Companies.Add(company.Id, company);
        }

        public int GenerateCeoId()
        {
            var id = 0;

            while (CEOs.ContainsKey(id))
                id++;

            return id;
        }
        public int GenerateCompanyId()
        {
            var id = 0;

            while (Companies.ContainsKey(id))
                id++;

            return id;
        }
    }
}
