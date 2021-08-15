
namespace hardware_tycoon_api.DTOs
{
    public record LoginRequestDto(string CompanyName, string Difficulty);
    public record LoginResponseDto(int Id);
}