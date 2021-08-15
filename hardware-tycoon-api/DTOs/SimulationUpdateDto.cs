
using System;

namespace hardware_tycoon_api.DTOs
{
    public record SimulationUpdateDto
    (
        DateTime Date,
        long Money,
        int ResearchProgress,
        int DevelopmentProgress
    );
}