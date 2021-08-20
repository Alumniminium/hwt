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
                    if(kvp2.Value.CEO == requestDto.CeoName)
                        return kvp2.Key;
                }
            }

            int id = 0;
            while(Core.Games.ContainsKey(id))
                id++;

            var game = new Game(id, requestDto.CeoName, requestDto.CompanyName,requestDto.Difficulty);
            Core.Games.Add(id,game);

            return game.PlayerId;
        }

        public static Game GetGameById(int ownerId)
        {
            if(Core.Games.TryGetValue(ownerId,out var game))
                return game;
            else
                return null;
        }

        internal static ResearchProject GetResearchProjectByName(string researchProject)
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