using System;

namespace hardware_tycoon_api
{
    public class Project
    {
        public string Name;
        public int Progress;
    }
    
    public class Game
    {
        public int OwnerId { get; set; }
        public string CompanyName {get;set;}
        public string Difficulty  {get;set;}
        public DateTime Date { get; set; }

        public long Money {get;set;}
        public Project CurrentResearch { get; set; }
        public Project CurrentDevelopment { get; set; }

        internal void SimulationStep()
        {
            Date = Date.AddDays(1);

            if(CurrentResearch!=null)
                CurrentResearch.Progress++;
            if(CurrentDevelopment != null)
                CurrentDevelopment.Progress++;
        }
    }
}
