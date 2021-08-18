namespace hardware_tycoon_api.Simulation
{
    public class ResearchProject
    {
        private int _currentPoints;
        public string Name;
        public string Description;
        public int Price;
        public int Progress => CurrentPoints / RequiredPoints * 100;
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
