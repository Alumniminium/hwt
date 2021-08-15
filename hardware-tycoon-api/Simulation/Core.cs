using System.Collections.Generic;

namespace hardware_tycoon_api.Simulation
{
    public static class Core
    {
        public static readonly Dictionary<int,Game> Games = new ();
        public static readonly GameTimer GameTimer = new ();
    }
}
