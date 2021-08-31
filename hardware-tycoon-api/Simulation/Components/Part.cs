using System.Collections.Generic;
using System.Linq;

namespace hardware_tycoon_api.Simulation.Components
{
    public class Part
    {
        public string Name;
        public int Cost => Transistors.Sum(t => t.Price);
        public int PowerUsage => Transistors.Sum(t => t.PowerUsage);
        public int Performance => Transistors.Sum(t => t.Performance);
        public List<Transistor> Transistors = new();

        public Part(string name, int transistorCount)
        {
            for(int i = 0; i < transistorCount; i++)
                Transistors.Add(new Transistor());
            Name = name;
        }
    }
}
