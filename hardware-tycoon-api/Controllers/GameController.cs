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
            var playerId = GameService.GetPlayerId(request);
            return new LoginResponseDto(playerId);
        }

        [HttpGet]
        public SimulationUpdateDto Update(int gameId)
        {
            
        }
    }
}
