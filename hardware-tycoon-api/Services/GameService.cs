using System;
using System.Collections.Generic;
using hardware_tycoon_api.DTOs;
using hardware_tycoon_api.Simulation;
using hardware_tycoon_api.Simulation.Components;

namespace hardware_tycoon_api.Services
{
    public static class GameService
    {
        public static int GetPlayerId(LoginRequestDto requestDto)
        {
            if(string.IsNullOrEmpty(requestDto.CeoName))
                return -1;
            if(string.IsNullOrEmpty(requestDto.CompanyName))
                return -1;
                
            foreach(var kvp in Core.Games)
            {
                foreach(var kvp2 in kvp.Value.World.Companies)
                {
                    if(kvp2.Value.CEO.Name == requestDto.CeoName)
                        return kvp2.Key;
                }
            }

            int gameId = 0;
            while(Core.Games.ContainsKey(gameId))
                gameId++;

            int playerId = 0;
            while(Core.CEOs.ContainsKey(playerId))
                playerId++;

            var game = new Game(gameId, requestDto.Difficulty);
            Core.Games.Add(gameId, game);

            var ceo = new Ceo(playerId, requestDto.CeoName);
            Core.CEOs.Add(ceo.PlayerId,ceo);
            
            game.World.AddCompany(ceo, requestDto.CompanyName);

            return playerId;
        }

        public static Game GetGameById(int ownerId)
        {
            if(Core.Games.TryGetValue(ownerId,out var game))
                return game;
            else
                return null;
        }

        internal static RndProject GetResearchProjectByName(string researchProject)
        {
            if(string.IsNullOrEmpty(researchProject))
                return null;
            if(Core.ResearchProjects.TryGetValue(researchProject,out var project))
                return project.CreateCopy();;
            return null;
        }

        internal static Component[] GetComponentsByNames(string[] components)
        {
            List<Component> realComponents = new ();
            foreach (var name in components)
            {
                if(Core.Components.TryGetValue(name,out var component))
                    realComponents.Add(component);
            }
            return realComponents.ToArray();
        }
    }
}