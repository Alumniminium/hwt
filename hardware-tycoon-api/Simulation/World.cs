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
            Game = game;
        }
        internal void AddCompany(int ownerId, string companyName)
        {
            var company = new Company(this, ownerId, companyName);
            Companies.Add(company.OwnerId, company);
        }
    }
}
