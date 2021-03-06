using System;
using System.Collections.Generic;
using System.Linq;
using hardware_tycoon_api.DTOs;
using hardware_tycoon_api.Services;
using hardware_tycoon_api.Simulation;
using hardware_tycoon_api.Simulation.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace hardware_tycoon_api.Controllers
{
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly ILogger<GameController> _logger;
        public GameController(ILogger<GameController> logger) => _logger = logger;

        [HttpPost]
        [Route("/api/login")]
        public LoginResponseDto Login(LoginRequestDto request)
        {
            _logger.LogInformation($"Request Login for User: {request.CompanyName} Password: {request.CompanyName} Difficulty {request.Difficulty}");
            var (gameId, playerId) = GameService.CreateNewGame(request);
            _logger.LogInformation($"CEO: {request.CeoName}, Company Name: {request.CompanyName} -> PlayerId {playerId}");
            return new LoginResponseDto(gameId, playerId);
        }

        [HttpGet]
        [Route("/api/update")]
        public SimulationUpdateDto Update(int gameId, int ceoId)
        {
            _logger.LogInformation($"Update Request for GameId {gameId}");
            var ceo = GameService.GetCeoById(gameId, ceoId);
            if (ceo == null)
                return null;

            _logger.LogInformation($"GameId {gameId} found, sending update for CompanyName {ceo.Company.Name}");

            var npcProducts = new List<NpcProductDto>();
            foreach (var kvp in ceo.Game.World.Market.Products)
            {
                npcProducts.Add(new NpcProductDto(kvp.Key, kvp.Value.Company, kvp.Value.Price, kvp.Value.Description));
            }

            return new SimulationUpdateDto(ceo.Game.World.Date, ceo.Game.GameSpeed == 0 ? 0 : 1000 / Math.Max(1, ceo.Game.GameSpeed), ceo.Company.Money, npcProducts);
        }

        [HttpPost]
        [Route("/api/update")]
        public void Update(UpdateDto updateDto)
        {
            if (updateDto == null)
                return;

            var ceo = GameService.GetCeoById(updateDto.GameId, updateDto.CeoId);
            if (ceo == null)
                return;

            ceo.Game.GameSpeed = updateDto.GameSpeed;
        }

        [HttpGet]
        [Route("/api/research")]
        public IEnumerable<ResearchProjectDto> Research(int gameId, int ceoId)
        {
            _logger.LogInformation($"Available Research Projects Requested for GameId {gameId}");
            var ceo = GameService.GetCeoById(gameId, ceoId);
            if (ceo == null)
                yield break;

            if (ceo.Company is PlayerCompany)
            {
                List<RndProject> availableResearch = new();
                var company = ceo.Company as PlayerCompany;

                foreach (var kvp in Core.ResearchProjects)
                {
                    var name = kvp.Key;
                    var project = kvp.Value;

                    if (company.UnlockedResearch.ContainsKey(name))
                        continue;
                    if (project.PreRequititeResearch == null)
                        availableResearch.Add(project);
                    else if (company.UnlockedResearch.ContainsKey(project.PreRequititeResearch))
                        availableResearch.Add(project);
                }

                _logger.LogInformation($"{ceo.Company.Name} found, sending {availableResearch.Count} available research projects...");

                foreach (var project in availableResearch)
                    yield return new ResearchProjectDto(project.Name, project.Price, project.Description);
                foreach (var project in company.UnlockedResearch)
                    yield return new ResearchProjectDto(project.Key, 0, project.Value.Description);
            }
            yield break;
        }

        [HttpPut]
        [Route("/api/research")]
        public ResearchOrDevelopRequestResponseDto Research([FromBody] ResearchRequestDto researchRequest)
        {
            _logger.LogInformation($"Research Start Request for PlayerId {researchRequest.CeoId}: {researchRequest.ResearchProject}");

            var ceo = GameService.GetCeoById(researchRequest.GameId, researchRequest.CeoId);
            if (ceo == null)
                return null;

            var project = GameService.GetResearchProjectByName(researchRequest.ResearchProject);
            if (project == null)
                return new ResearchOrDevelopRequestResponseDto(false, -1, $"The Research Project '{researchRequest.ResearchProject}' doesn't exist.");

            if (ceo.Company is PlayerCompany)
            {
                var company = ceo.Company as PlayerCompany;
                if (project.PreRequititeResearch != null && !company.UnlockedResearch.ContainsKey(project.PreRequititeResearch))
                    return new ResearchOrDevelopRequestResponseDto(false, -1, $"The Research Project '{project.Name}' requires '{project.PreRequititeResearch}' to be researched first");
                if (company.UnlockedResearch.ContainsKey(researchRequest.ResearchProject))
                    return new ResearchOrDevelopRequestResponseDto(false, -1, $"The Research Project '{project.Name}' is already unlocked.");
                if (project.Price > company.Money)
                    return new ResearchOrDevelopRequestResponseDto(false, -1, $"You can't afford to research {project.Name}. It costs {project.Price} but {ceo.Company.Name} only has {ceo.Company.Money}$");
                if (company.CurrentResearch != null)
                    return new ResearchOrDevelopRequestResponseDto(false, -1, $"You can't research {project.Name} until you finished researching {company.CurrentResearch.Name}");

                company.CurrentResearch = project;
                company.Money -= project.Price;

                _logger.LogInformation($"Company {ceo.Company.Name} started researching {project.Name}");
                return new ResearchOrDevelopRequestResponseDto(true, company.CurrentResearch.RequiredPoints);
            }
            return new ResearchOrDevelopRequestResponseDto(false, -1, $"hax");
        }

        [HttpPut]
        [Route("/api/develop")]
        public ResearchOrDevelopRequestResponseDto Develop([FromBody] ProductDto product)
        {
            if (product == null)
                return new ResearchOrDevelopRequestResponseDto(false, -1, $"The Product is null");

            _logger.LogInformation($"Product Development Start Request for PlayerId {product.CeoId}");

            var ceo = GameService.GetCeoById(product.GameId, product.CeoId);
            if (ceo == null)
                return null;

            if (ceo.Company is PlayerCompany)
            {
                var company = ceo.Company as PlayerCompany;
                var components = GameService.GetComponentsByNames(product.Components);
                var developmentPrice = components.Sum(c => c.ProductionCost) * 100;

                if (developmentPrice > ceo.Company.Money)
                    return new ResearchOrDevelopRequestResponseDto(false, -1, $"You can't afford to research {product.Name}. It costs {developmentPrice} but { ceo.Company.Name} only has { ceo.Company.Money}$");

                if (company.CurrentResearch != null)
                    return new ResearchOrDevelopRequestResponseDto(false, -1, $"You can't develop a new product untilyou finished developing { company.CurrentDevelopment.Name}");

                //var newProduct = new Product(ceo.Company, product.Name, product.Price, components, product.Type);
                // ceo.Company.DevelopingProducts.Add(newProduct.Name, newProduct);
                // ceo.Company.CurrentDevelopment = new RndProject
                //{
                //    Name = newProduct.Name,
                //    Price = developmentPrice,
                //    RequiredPoints = developmentPrice / 10
                //};
                //ceo.Company.Money -= developmentPrice;

                _logger.LogInformation($"Company { ceo.Company.Name} started researching {product.Name}");
                return new ResearchOrDevelopRequestResponseDto(true, company.CurrentDevelopment.RequiredPoints);
            }
            return new ResearchOrDevelopRequestResponseDto(false, -1, $"hax");
        }
    }
}
