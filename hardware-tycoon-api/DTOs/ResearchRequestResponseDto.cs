
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.DTOs
{
    public record ResearchRequestDto(int PlayerId, string ResearchProject);
    public record ResearchOrDevelopRequestResponseDto(bool success, int secondsUntilDone, string debugInfo = "");
    public record ProductDto(string Name, string[] Components, ProductType Type, int Price);
    public record ResearchProjectDto(string Name, int Price, string Description);
}