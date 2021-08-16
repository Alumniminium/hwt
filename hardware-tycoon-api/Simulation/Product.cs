using System.Collections.Generic;
using System.Linq;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Simulation
{
    public class Product
    {
        public Company Owner;
        public string Name;
        public List<Component> Components = new ();
        public int ProductionCost => Components.Sum(c=>c.Cost);
        public int Price;
        public int Sales;

        public Product(Company owner, string name, int price, List<Component> components)
        {
            Owner=owner;
            Name=name;
            Price=price;
            Components.AddRange(components);
        }
    }
}
