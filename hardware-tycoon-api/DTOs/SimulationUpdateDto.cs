
using System;
using System.Collections.Generic;
using hardware_tycoon_api.Simulation;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.DTOs

{
    public record SimulationUpdateDto
    (
        DateTime Date,
        long Money,
        List<NpcProductDto> MarketProducts
    );
}