
using System;

namespace hardware_tycoon_api.DTOs
{
    public record SimulationUpdateDto
    (
        string CompanyName,
        string Difficulty,
        DateTime Date
    );
}