using System;

namespace hardware_tycoon_api.Simulation
{
    public class RndProject
    {
        public string Name;
        public string Description;
        public int Price;
        public string PreRequititeResearch;
        public int CurrentPoints;
        public int RequiredPoints;

        public int Progress => (int)((float)CurrentPoints / RequiredPoints * 100f);

        internal RndProject CreateCopy()
        {
            return new RndProject
            {
                Name = Name,
                Description = Description,
                Price = Price,
                RequiredPoints = RequiredPoints,
                CurrentPoints = CurrentPoints,
                PreRequititeResearch = PreRequititeResearch
            };
        }
    }
}
