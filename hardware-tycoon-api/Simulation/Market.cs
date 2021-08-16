using System;
using System.Collections.Generic;

namespace hardware_tycoon_api.Simulation
{
    public class Market
    {
        public Dictionary<string, Product> Products = new();

        internal void Tick()
        {
            foreach(var kvp in Products)
            {
                var product = kvp.Value;
                
            }
        }
    }
}
