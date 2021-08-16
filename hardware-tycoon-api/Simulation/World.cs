using System;
using System.Collections.Generic;

namespace hardware_tycoon_api.Simulation
{
    public class World
    {
        public Game Game;
        public Dictionary<int, Company> Companies = new();
        public Market Market = new();
        public DateTime Date { get; set; }

        public World(Game game)
        {
            Date = new DateTime(1970,4,20);
            Game = game;
        }
        internal void AddCompany(int playerId, string playerName, string companyName)
        {
            var company = new Company(this,playerId, playerName, companyName);
            company.Money = 100_000;
            Companies.Add(company.OwnerId,company);
        }
    }
}
