using System;

namespace hardware_tycoon_api.Simulation.Components
{
    [Flags]
    public enum ProductType
    {
        CPU = 0b0001,
        GPU = 0b0010,
        MEMORY = 0b0100,

    }
}