
using System;
using System.Collections.Generic;
using hardware_tycoon_api.Simulation;

namespace hardware_tycoon_api.DTOs
{
    public record SimulationUpdateDto
    (
        DateTime Date,
        long Money,
        int ResearchProgress,
        int DevelopmentProgress,
        Dictionary<string,Product> MarketProducts
    );
}