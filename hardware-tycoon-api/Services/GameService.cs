using System;
using System.Collections.Generic;
using hardware_tycoon_api.DTOs;
using hardware_tycoon_api.Simulation;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Services
{
    public static class GameService
    {
        public static (int gameId, int ceoId) CreateNewGame(LoginRequestDto requestDto)
        {
            if (string.IsNullOrEmpty(requestDto.CeoName))
                return (-1, -1);
            if (string.IsNullOrEmpty(requestDto.CompanyName))
                return (-1, -1);

            var ceoName = requestDto.CeoName.Trim();
            var companyName = requestDto.CompanyName.Trim();

            var game = new Game(requestDto.Difficulty);
            var ceo = new Ceo(game.Id, ceoName);

            game.World.AddCompany(ceo.Id, companyName);

            var intelCeo = new Ceo(game.Id, "Idk");
            game.World.AddCompany(intelCeo.Id, "Intel", "Database/Competitors/Intel.tsv");

            return (game.Id, ceo.Id);
        }

        public static Ceo GetCeoById(int gameId, int ceoId)
        {
            if (Core.Games.TryGetValue(gameId, out var game))
                if (game.World.CEOs.TryGetValue(ceoId, out var ceo))
                    return ceo;
            return null;
        }

        internal static RndProject GetResearchProjectByName(string researchProject)
        {
            if (string.IsNullOrEmpty(researchProject))
                return null;
            if (Core.ResearchProjects.TryGetValue(researchProject, out var project))
                return project.CreateCopy(); ;
            return null;
        }

        internal static Part[] GetComponentsByNames(string[] components)
        {
            List<Part> realComponents = new();
            foreach (var name in components)
            {
                if (Core.Components.TryGetValue(name, out var component))
                    realComponents.Add(component);
            }
            return realComponents.ToArray();
        }
    }
}