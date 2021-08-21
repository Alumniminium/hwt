using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text.RegularExpressions;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Simulation
{
    public class NpcCompany
    {
        public Game Game;
        public string Name;
        public long Money;
        public Dictionary<string, CompetitorProduct> Products = new ();

        public NpcCompany(Game game, string name)
        {
            Game = game;
            Name = name;
        }

        public void LoadProducts(string path)
        {
            var lines = File.ReadAllLines(path);
            for (int i = 1; i < lines.Length; i++)
            {
                lines[i] = Regex.Replace(lines[i], @"\s+", " ");
                var parts = lines[i].Split(' ');

                var releaseDate = DateTime.ParseExact(parts[0],"dd/MM/yyyy",null);
                var productName = parts[1];
                var price = int.Parse(parts[2]);
                var socket = parts[3];
                var fab = int.Parse(parts[4]);
                var bits = int.Parse(parts[5]);
                var frequency = float.Parse(parts[6]);
                var description = string.Join(" ", parts[7..]);
                Products.TryAdd(productName, new CompetitorProduct(releaseDate, productName, price, socket, fab, bits, frequency, description));
            }
        }

        public void Tick()
        {
            foreach(var kvp in Products)
            {
                var product = kvp.Value;

                if(product.ReleaseDate == Game.World.Date)
                {
                    Game.World.Market.AddProduct(new Product(1000,product.Name,product.Price,null,ProductType.CPU,product.Description));
                }
            }
        }
    }
}
