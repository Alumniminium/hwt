using System;
using System.Diagnostics;
using System.Threading;

namespace hardware_tycoon_api.Simulation
{
    public class GameTimer
    {
        private readonly Thread gameThread;
        private readonly Game Game;

        public GameTimer(Game game)
        {
            Game = game;
            gameThread = new Thread(Tick) { IsBackground = true };
            gameThread.Start();
        }

        private void Tick()
        {
            var sw = Stopwatch.StartNew();
            while (true)
            {
                sw.Restart();

                if(Game.GameSpeed > 0)
                    Game.SimulationStep();
                
                var iterationDuration = sw.Elapsed.TotalMilliseconds;

                var gameSpeed = Math.Max(1, Game.GameSpeed);
                var sleepTime = 1000 / gameSpeed;
                sleepTime = (int)Math.Max(1, sleepTime - iterationDuration);

                Thread.Sleep(sleepTime);
            }
        }
    }
}
