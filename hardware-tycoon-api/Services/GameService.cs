using System.Linq;
using hardware_tycoon_api.DTOs;

namespace hardware_tycoon_api.Services
{
    public static class GameService
    {
        public static int GetPlayerId(LoginRequestDto requestDto)
        {
            var game = Core.Games.Values.Where(g=> g.CompanyName == requestDto.CompanyName).FirstOrDefault();
            if(game != null)
                return game.OwnerId;

            int id = 0;
            while(Core.Games.ContainsKey(id))
                id++;

            Core.Games.Add(id,new Game 
                { 
                    OwnerId = id,
                    CompanyName = requestDto.CompanyName, 
                    Difficulty = requestDto.Difficulty 
                });

            return id;
        }

    }
}