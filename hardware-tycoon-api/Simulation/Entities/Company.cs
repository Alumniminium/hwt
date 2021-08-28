using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Simulation
{
    public class Company
    {
        public int GameId;
        public int Id;
        public int CeoId;

        public string Name { get; set; }
        public long Money { get; set; }

        public Dictionary<string, Product> Products = new();
        public Dictionary<string, CompetitorProduct> FutureProducts = new();
        public Dictionary<string, RndProject> UnlockedResearch { get; set; } = new();
        public RndProject CurrentResearch { get; set; }
        public RndProject CurrentDevelopment { get; set; }

        public World World => Core.Games[GameId].World;
        public Market Market => World.Market;

        public Company(int gameId, int ceoId, string name)
        {
            GameId=gameId;
            CeoId=ceoId;
            Name = name;
            Id = World.GenerateCompanyId();
        }

        internal void Tick()
        {
            if(CurrentResearch != null)
            {
                if (CurrentResearch.Progress >= 100)
                {
                    UnlockedResearch.Add(CurrentResearch.Name, CurrentResearch);
                    CurrentResearch = null;
                }
                else
                    CurrentResearch.CurrentPoints++;
            }

            if(CurrentDevelopment != null)
            {
                if (CurrentDevelopment.Progress >= 100)
                {
                    World.Market.AddProduct(Products[CurrentDevelopment.Name]);
                    CurrentDevelopment = null;
                }
                else
                    CurrentDevelopment.CurrentPoints++;
            }

            foreach (var kvp in FutureProducts)
            {
                var product = kvp.Value;

                if (product.ReleaseDate == World.Date)
                {
                    World.Market.AddProduct(new Product(Name, product.Name, product.Price, null, ProductType.CPU, product.Description));
                }
            }
        }

        public void LoadProducts(string path)
        {
            var lines = File.ReadAllLines(path);
            for (int i = 1; i < lines.Length; i++)
            {
                lines[i] = Regex.Replace(lines[i], @"\s+", " ");
                var parts = lines[i].Split(' ');

                var releaseDate = DateTime.ParseExact(parts[0], "dd/MM/yyyy", null);
                var productName = parts[1];
                var price = int.Parse(parts[2]);
                var socket = parts[3];
                var fab = int.Parse(parts[4]);
                var bits = int.Parse(parts[5]);
                var frequency = float.Parse(parts[6]);
                var img = parts[7];
                var description = string.Join(" ", parts[8..]);
                FutureProducts.TryAdd(productName, new CompetitorProduct(releaseDate, productName, price, socket, fab, bits, frequency, img, description));
            }
        }
    }
}
