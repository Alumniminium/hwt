
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.DTOs
{
    public record ResearchRequestDto(int PlayerId, string ResearchProject);
    public record ResearchOrDevelopRequestResponseDto(bool Success, int SecondsUntilDone, string DebugInfo = "");
    public record ProductDto(int PlayerId, string Name, string[] Components, ProductType Type, int Price);
    public record NpcProductDto(string Name, int Price, string Description);
    public record ResearchProjectDto(string Name, int Price, string Description);
}