namespace hardware_tycoon_api.Simulation
{
    public class ResearchProject
    {
        private int _currentPoints;
        public string Name;
        public string Description;
        public int Price;
        public int Progress => (int)((float)CurrentPoints / (float)RequiredPoints * 100f);
        public int RequiredPoints;
        public int CurrentPoints
        {
            get => _currentPoints;
            set
            {
                if (value <= RequiredPoints)
                    _currentPoints = value;
            }
        }
        public string PreRequititeResearch;
    }
}
