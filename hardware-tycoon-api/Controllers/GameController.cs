using System.Collections.Generic;
using System.Linq;
using hardware_tycoon_api.DTOs;
using hardware_tycoon_api.Services;
using hardware_tycoon_api.Simulation;
using hardware_tycoon_api.Simulation.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.JSInterop.Implementation;

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

            var researchProgress = company.CurrentResearch != null ? company.CurrentResearch.Progress : 0;
            var developmentProgress = company.CurrentDevelopment != null ? company.CurrentDevelopment.Progress : 0;

            return new SimulationUpdateDto(game.World.Date, company.Money, researchProgress, developmentProgress, market.Products);
        }

        [HttpGet]
        [Route("/api/availableResearch")]
        public IEnumerable<ResearchProjectDto> AvailableResearch(int playerId)
        {
            _logger.LogInformation($"Available Research Projects Requested for GameId {playerId}");
            var game = GameService.GetGameById(playerId);
            var world = game.World;
            var company = world.Companies[game.PlayerId];

            var availableResearch = Core.ResearchProjects.Values.Where(p => p.PreRequititeResearch == null || company.UnlockedResearch.ContainsKey(p.PreRequititeResearch)).ToArray();
            _logger.LogInformation($"{company.Name} found, sending {availableResearch.Length} available research projects...");

            foreach (var project in availableResearch)
                yield return new ResearchProjectDto(project.Name, project.Price, project.Description);
        }

        [HttpPut]
        [Route("/api/research")]
        public ResearchOrDevelopRequestResponseDto Research(int playerId, string researchProject)
        {
            _logger.LogInformation($"Research Start Request for PlayerId {playerId}: {researchProject}");
            var game = GameService.GetGameById(playerId);
            var company = game.World.Companies[game.PlayerId];

            var project = GameService.GetResearchProjectByName(researchProject);
            if (project == null)
                return new ResearchOrDevelopRequestResponseDto(false, $"The Research Project '{researchProject}' doesn't exist.");

            if (project.PreRequititeResearch != null && !company.UnlockedResearch.ContainsKey(project.PreRequititeResearch))
                return new ResearchOrDevelopRequestResponseDto(false, $"The Research Project '{project.Name}' requires '{project.PreRequititeResearch}' to be researched first");

            if (project.Price <= company.Money)
            {
                if (company.CurrentResearch == null)
                {
                    company.CurrentResearch = project;
                    company.Money -= project.Price;
                }
                else
                    return new ResearchOrDevelopRequestResponseDto(false, $"You can't research {project.Name} until you finished researching {company.CurrentResearch.Name}$");
            }
            else
                return new ResearchOrDevelopRequestResponseDto(false, $"You can't afford to research {project.Name}. It costs {project.Price} but {company.Name} only has {company.Money}$");

            _logger.LogInformation($"Company {company.Name} started researching {project.Name}");
            return new ResearchOrDevelopRequestResponseDto(true);
        }

        [HttpPut]
        [Route("/api/develop")]
        public ResearchOrDevelopRequestResponseDto Develop(int playerId, ProductDto product)
        {
            _logger.LogInformation($"Product Development Start Request for PlayerId {playerId}");
            if (product == null)
                return new ResearchOrDevelopRequestResponseDto(false, $"The Product is null");

            var game = GameService.GetGameById(playerId);
            var company = game.World.Companies[game.PlayerId];
            var components = GameService.GetComponentsByNames(product.Components);
            var developmentPrice = components.Sum(c => c.Cost) * 100;

            if (developmentPrice <= company.Money)
            {
                if (company.CurrentResearch == null)
                {
                    var newProduct = new Product(company, product.Name, product.Price, components, product.Type);
                    company.DevelopingProducts.Add(newProduct.Name, newProduct);
                    company.CurrentDevelopment = new Simulation.ResearchProject
                    {
                        Name = newProduct.Name,
                        Price = developmentPrice,
                        RequiredPoints = developmentPrice / 10
                    };
                    company.Money -= developmentPrice;
                }
                else
                    return new ResearchOrDevelopRequestResponseDto(false, $"You can't develop a new product untilyou finished developing {company.CurrentDevelopment.Name}$");

            }
            else
                return new ResearchOrDevelopRequestResponseDto(false, $"You can't afford to research {product.Name}. It costs {developmentPrice} but {company.Name} only has {company.Money}$");

            _logger.LogInformation($"Company {company.Name} started researching {product.Name}");
            return new ResearchOrDevelopRequestResponseDto(true);
        }
    }
}
