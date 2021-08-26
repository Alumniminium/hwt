
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.DTOs
{
    public record ResearchRequestDto(int GameId, int CeoId, string ResearchProject);
    public record ResearchOrDevelopRequestResponseDto(bool Success, int SecondsUntilDone, string DebugInfo = "");
    public record ProductDto(int GameId, int CeoId, string Name, string[] Components, ProductType Type, int Price);
    public record NpcProductDto(string Name, string Company, int Price, string Description);
    public record ResearchProjectDto(string Name, int Price, string Description);
}