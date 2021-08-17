using System.Collections.Generic;
using System.Linq;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Simulation.Components
{
    public class Product
    {
        public Company Owner;
        public string Name;
        public List<Component> Components = new ();
        public int Price;
        public int Sales;
        public ProductType ProductType;
        
        public int ProductionCost => Components.Sum(c=>c.Cost);
        public int Performance => Components.Sum(c => c.PerformanceAdd);
        public int PowerUsage => Components.Sum(c => c.PowerUsage);
        public int Score;

        public Product(Company owner, string name, int price, IEnumerable<Component> components, ProductType productType)
        {
            Owner=owner;
            Name=name;
            Price=price;
            Components.AddRange(components);
            ProductType=productType;
        }
    }
}
