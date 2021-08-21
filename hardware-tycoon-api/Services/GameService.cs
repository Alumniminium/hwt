using System;
using System.Collections.Generic;
using hardware_tycoon_api.DTOs;
using hardware_tycoon_api.Simulation;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Services
{
    public static class GameService
    {
        public static int CreateNewGame(LoginRequestDto requestDto)
        {
            if (string.IsNullOrEmpty(requestDto.CeoName))
                return -1;
            if (string.IsNullOrEmpty(requestDto.CompanyName))
                return -1;

            var ceoName = requestDto.CeoName.Trim();
            var companyName = requestDto.CompanyName.Trim();

            int gameId = 0;
            while (Core.Games.ContainsKey(gameId))
                gameId++;

            int playerId = 0;
            while (Core.CEOs.ContainsKey(playerId))
                playerId++;

            var game = new Game(gameId, requestDto.Difficulty);
            Core.Games.Add(gameId, game);

            var ceo = new Ceo(playerId, ceoName);
            Core.CEOs.Add(ceo.PlayerId, ceo);

            game.World.AddCompany(ceo, companyName);

            return playerId;
        }

        public static Game GetGameByPlayerId(int playerId)
        {
            if(Core.CEOs.TryGetValue(playerId, out var ceo))
                return ceo.Game;
            else
                return null;
        }
        public static Ceo GetCeoById(int ownerId)
        {
            if (Core.CEOs.TryGetValue(ownerId, out var ceo))
                return ceo;
            else
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

        internal static Component[] GetComponentsByNames(string[] components)
        {
            List<Component> realComponents = new();
            foreach (var name in components)
            {
                if (Core.Components.TryGetValue(name, out var component))
                    realComponents.Add(component);
            }
            return realComponents.ToArray();
        }
    }
}