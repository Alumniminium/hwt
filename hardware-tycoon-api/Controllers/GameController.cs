using hardware_tycoon_api.DTOs;
using hardware_tycoon_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace hardware_tycoon_api.Controllers
{
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly ILogger<GameController> _logger;

        public GameController(ILogger<GameController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("/api/login")]
        public LoginResponseDto Login(LoginRequestDto request)
        {
            _logger.LogInformation($"Request Login for User: {request.CompanyName} Password: {request.CompanyName} Difficulty {request.Difficulty}");
            var playerId = GameService.GetPlayerId(request);
            _logger.LogInformation($"CEO: {request.CeoName}, Company Name: {request.CompanyName} -> PlayerId {playerId}");
            return new LoginResponseDto(playerId);
        }

        [HttpGet]
        [Route("/api/update")]
        public SimulationUpdateDto Update(int playerId)
        {
            _logger.LogInformation($"Update Request for GameId {playerId}");
            var game = GameService.GetGameById(playerId);
            var world = game.World;
            var market = world.Market;
            var company = world.Companies[game.PlayerId];
            _logger.LogInformation($"GameId {playerId} found, sending update for CompanyName {company.Name}");
            return new SimulationUpdateDto(game.World.Date, company.Money, company.CurrentResearch.Progress, company.CurrentDevelopment.Progress, market.Products);
        }

        // [HttpPut]
        // [Route("/api/research")]
        // public SimulationUpdateDto Research(int playerId, string researchProject)
        // {
        //     _logger.LogInformation($"Research Start Request for PlayerId {playerId}: {researchProject}");
        //     var game = GameService.GetGameById(playerId);
        //     var company = game.World.Companies[game.PlayerId];
        //     _logger.LogInformation($"GameId {playerId} found, sending update for CompanyName {company.Name}");
        //     return new SimulationUpdateDto(game.World.Date, company.Money, company.CurrentResearch.Progress, company.CurrentDevelopment.Progress, market.Products);
        // }
    }
}
