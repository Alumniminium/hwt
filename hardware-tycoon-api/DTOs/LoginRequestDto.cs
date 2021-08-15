
namespace hardware_tycoon_api.DTOs
{
    public record LoginRequestDto(string CompanyName, int Difficulty);
    public record LoginResponseDto(int Id);
}