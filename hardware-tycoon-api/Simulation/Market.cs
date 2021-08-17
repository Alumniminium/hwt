using System;
using System.Collections.Generic;
using System.Linq;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Simulation
{
    public class Market
    {
        public Random Random = new Random();
        public Dictionary<string, Product> Products = new();

        internal void Tick()
        {
            //calculate score
            var orderedByBest = Products.Values.OrderByDescending(p=>p.Score).ToArray();
            
            for(int i = 0; i < orderedByBest.Length; i++)
            {
                var product = orderedByBest[i];
                //TODO reduce sales each iteration as the products get worse with i
                var sales = Random.Next(1, 1000);
                product.Owner.Money += (sales * product.Price) - (sales * product.ProductionCost);
                product.Sales += sales;
            }
        }

        internal void AddProduct(Product product)
        {
            product.Score = product.Performance - product.PowerUsage - product.Price;
            Products.Add(product.Name,product);
        }
    }
}
