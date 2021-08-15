using System.Collections.Generic;

namespace hardware_tycoon_api
{
    public static class Core
    {
        public static Dictionary<int,Game> Games = new ();
        public static GameTimer GameTimer = new ();
    }
}
