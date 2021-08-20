using System.Collections.Generic;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Simulation
{
    public static class Core
    {
        public static readonly Dictionary<int, Game> Games = new();
        public static readonly Dictionary<string, ResearchProject> ResearchProjects = new()
        {
            ["10um"] = new ResearchProject  { Name = "10um",  RequiredPoints=25, Price = 1000, Description = "10um Fab allows you to create shitty chips" },
            ["5um"] = new ResearchProject { Name = "5um", RequiredPoints = 50, Price = 1000, Description = "5um Fab allows you to create shitty chips", PreRequititeResearch = "10um" },
            ["3um"] = new ResearchProject { Name = "3um", RequiredPoints = 100, Price = 10000, Description = "3um Fab allows you to create shitty chips", PreRequititeResearch = "5um" },
            ["DIP-4"] = new ResearchProject  { Name = "DIP-4",  RequiredPoints=25, Price = 1000, Description = "DIP-4 Package to place your chips on" },
            ["DIP-8"] = new ResearchProject { Name = "DIP-8", RequiredPoints=50, Price = 10000, Description = "DIP-8 Package to place your chips on", PreRequititeResearch = "DIP-4" },
            ["DIP-16"] = new ResearchProject  { Name = "DIP-16",  RequiredPoints=100, Price = 100000, Description = "DIP-16 Package to place your chips on", PreRequititeResearch = "DIP-8" },
            ["Instruction Cache"] = new ResearchProject { Name = "Instruction Cache", RequiredPoints = 50, Price = 10000, Description = "Allows your chip to utilize basic instruction cache" },
            ["Data Cache"] = new ResearchProject { Name = "Data Cache", RequiredPoints = 100, Price = 100000, Description = "Allows your chip to utilize basic data cache", PreRequititeResearch = "Instruction Cache" },
        };
        public static readonly Dictionary<string, Component> Components = new();
        public static readonly GameTimer GameTimer = new();
    }
}
