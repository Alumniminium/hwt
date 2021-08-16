using System;

namespace hardware_tycoon_api.Simulation.Components
{
    public class Component
    {
        public string Name;
        public int Cost;
        public int PowerUsage;
        public int PerformanceAdd;

        public Component(string name, int cost, int powerUsage, int performanceAdd)
        {
            Name=name;
            Cost=cost;
            PowerUsage = powerUsage;
            PerformanceAdd = performanceAdd;
        }
    }
}