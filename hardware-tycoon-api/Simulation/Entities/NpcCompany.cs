using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using hardware_tycoon_api.Simulation.Components;
using hardware_tycoon_api.Simulation.Enums;

namespace hardware_tycoon_api.Simulation
{
    public class NpcCompany : Company
    {
        public Dictionary<string, CompetitorProduct> FutureProducts = new();

        public NpcCompany(string path, int gameId, int ceoId, string name) : base(gameId, ceoId, name) => LoadProducts(path);

        public override void Tick()
        {
            foreach (var kvp in FutureProducts)
            {
                var product = kvp.Value;

                if (product.ReleaseDate == World.Date)
                {
                    World.Market.AddProduct(new Product(Name, product.Name, product.Price, null, ProductType.CPU, product.Description));
                }
            }
            base.Tick();
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
                var description = string.Join(" ", parts[7..]);
                FutureProducts.TryAdd(productName, new CompetitorProduct(releaseDate, productName, price, socket, fab, bits, frequency, description));
            }
        }
    }
}
