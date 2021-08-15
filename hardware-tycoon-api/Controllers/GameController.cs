using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using hardware_tycoon_api.DTOs;
using hardware_tycoon_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace hardware_tycoon_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {
        private readonly ILogger<GameController> _logger;

        public GameController(ILogger<GameController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public LoginResponseDto Login(LoginRequestDto request)
        {
            _logger.LogInformation($"Request Login for User: {request.CompanyName} Password: {request.CompanyName} Difficulty {request.Difficulty}");
            var playerId = GameService.GetPlayerId(request);
            _logger.LogInformation($"Username: {request.CompanyName} got PlayerId {playerId}");
            return new LoginResponseDto(playerId);
        }

        [HttpGet]
        public SimulationUpdateDto Update(int gameId)
        {
            _logger.LogInformation($"Update Request for GameId {gameId}");
            var game = GameService.GetGameById(gameId);
            _logger.LogInformation($"GameId {gameId} found, sending update for CompanyName {game.CompanyName}");
            return new SimulationUpdateDto(game.Date,game.Money,game.CurrentResearch.Progress,game.CurrentDevelopment.Progress);
        }
    }
}
