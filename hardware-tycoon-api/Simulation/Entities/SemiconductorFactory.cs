using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using hardware_tycoon_api.Simulation.Components;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;

namespace hardware_tycoon_api.Simulation
{
    public class ProcessExperience
    {
        public int Process;
        public int Experience;
        public int Level;
    }
    public class SemiconductorFactory
    {
        public int SemiconductorFactoryId;
        public Dictionary<int,ProcessExperience> ProcessExperiences = new ();

        public void FabricateDie(int dieWidth, int dieHeight, int dieProcess)
        {
            var maxYield = Wafer.MaxYield(dieWidth,dieHeight);
            
            for(int i = 0; i<maxYield; i++)
            {
                
            }
        }
    }
}