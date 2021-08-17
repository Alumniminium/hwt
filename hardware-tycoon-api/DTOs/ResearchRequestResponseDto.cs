
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.DTOs
{
    public record ResearchOrDevelopRequestResponseDto(bool success, string debugInfo = "");
    public record ProductDto(string Name, string[] Components, ProductType Type, int Price);
}