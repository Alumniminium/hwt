using System.Collections.Generic;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Simulation
{
    public static class Core
    {
        public static readonly Dictionary<int, Game> Games = new();
        public static readonly Dictionary<string, ResearchProject> ResearchProjects = new()
        {
            ["A"] = new ResearchProject  { Name = "A",  RequiredPoints=10, Price = 10, Description = "A doesn't require anything and unlocks A2" },
            ["B"] = new ResearchProject  { Name = "B",  RequiredPoints=10, Price = 20, Description = "B doesn't require anything and unlocks B2" },
            ["C"] = new ResearchProject  { Name = "C",  RequiredPoints=10, Price = 40, Description = "C doesn't require anything and unlocks C2" },
            ["A2"] = new ResearchProject { Name = "A2", RequiredPoints=10, Price = 10, Description = "A2 requires A and unlocks nothing", PreRequititeResearch = "A" },
            ["B2"] = new ResearchProject { Name = "B2", RequiredPoints=10, Price = 20, Description = "B2 requires B and unlocks nothing", PreRequititeResearch = "B" },
            ["C2"] = new ResearchProject { Name = "C2", RequiredPoints=10, Price = 40, Description = "C2 requires C and unlocks nothing", PreRequititeResearch = "C" },
            ["D"] = new ResearchProject  { Name = "D",  RequiredPoints=10, Price = 50, Description = "D requires A and unlocks E", PreRequititeResearch = "A" },
            ["E"] = new ResearchProject  { Name = "E",  RequiredPoints=10, Price = 100, Description = "E requires D and unlocks nothing", PreRequititeResearch = "D" },
        };
        public static readonly Dictionary<string, Component> Components = new();
        public static readonly GameTimer GameTimer = new();
    }
}
