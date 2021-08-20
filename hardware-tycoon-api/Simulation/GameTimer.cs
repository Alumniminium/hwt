using System;
using System.Diagnostics;
using System.Threading;

namespace hardware_tycoon_api.Simulation
{
    public class GameTimer
    {
        private readonly Thread gameThread;

        public GameTimer()
        {
            gameThread = new Thread(Tick) { IsBackground = true };
            gameThread.Start();
        }

        private void Tick()
        {
            var sw = Stopwatch.StartNew();
            while (true)
            {
                sw.Restart();

                foreach (var kvp in Core.Games)
                    kvp.Value.SimulationStep();

                var iterationDuration = sw.Elapsed.TotalMilliseconds;
                Thread.Sleep((int)(Math.Max(1, 1000 - iterationDuration)));
            }
        }
    }
}
