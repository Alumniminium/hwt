using System.Collections.Generic;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Simulation
{
    public static class Core
    {
        public static readonly Dictionary<int,Game> Games = new ();
        public static readonly Dictionary<string, ResearchProject> ResearchProjects = new();
        public static readonly Dictionary<string, Component> Components = new();
        public static readonly GameTimer GameTimer = new ();
    }
}
