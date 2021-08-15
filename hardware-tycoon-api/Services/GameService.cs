using System;
using hardware_tycoon_api.DTOs;
using hardware_tycoon_api.Simulation;

namespace hardware_tycoon_api.Services
{
    public static class GameService
    {
        public static int GetPlayerId(LoginRequestDto requestDto)
        {
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

        public static Game GetGameById(int gameId)
        {
            if(Core.Games.TryGetValue(gameId,out var game))
                return game;
            else
                throw new InvalidOperationException($"No game for Id {gameId} running.");
        }
    }
}