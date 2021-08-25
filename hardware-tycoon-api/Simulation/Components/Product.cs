using System.Collections.Generic;
using System.Linq;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Simulation.Components
{
    public class Product
    {
        public int Owner;
        public string Name;
        public List<Component> Components = new ();
        public int Price;
        public int Sales;
        public ProductType ProductType;
        
        public int ProductionCost => Components.Sum(c=>c.Cost);
        public int Performance => Components.Sum(c => c.PerformanceAdd);
        public int PowerUsage => Components.Sum(c => c.PowerUsage);

        public string Description { get; internal set; }

        public int Score;

        public Product(int ownerCompanyId, string name, int price, IEnumerable<Component> components, ProductType productType, string description)
        {
            Owner=ownerCompanyId;
            Name=name;
            Price=price;
            if(components != null)
                Components.AddRange(components);
            ProductType=productType;
            Description=description;
        }
    }
}
