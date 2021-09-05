using System.Collections.Generic;
using System.Linq;
using hardware_tycoon_api.Simulation.Enums;

namespace hardware_tycoon_api.Simulation.Components
{
    public class Product
    {
        public string Name;
        public string Company;
        public int Price; 
        public string Description { get; internal set; }
        public ProductType ProductType;
        public List<Part> Parts = new();
        
        public int ProductionCost => Parts.Sum(c=>c.ProductionCost);
        public int Performance => Parts.Sum(c => c.Performance);
        public int PowerUsage => Parts.Sum(c => c.PowerUsage);


        public Product(string ownerCompany, string name, int price, IEnumerable<Part> components, ProductType productType, string description)
        {
            Company =ownerCompany;
            Name=name;
            Price=price;
            if(components != null)
                Parts.AddRange(components);
            ProductType=productType;
            Description=description;
        }

        public Part ToPart()
        {
            return new Part(Name, Parts.Sum(c=> c.Transistors.Count));
        }
    }
}
