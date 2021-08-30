using System;
using System.Collections.Generic;
using hardware_tycoon_api.Simulation.Enums;

namespace hardware_tycoon_api.Simulation.Components
{
    public static class Wafer
    {
        public static int FabSizeNanoMeters = 1000;
        public static int EdgeLoss = 5;
        public static int Diameter = 300;

        static Dictionary<int,int> FabSizeToPrice = new()
        {
            [1000] = 350,
            [800] = 500,
            [600] = 700,
            [350] = 1000,
            [250] = 1400,
            [180] = 1800,
            [150] = 2000,
            [100] = 3500,
            [90] = 3700,
            [65] = 4000,
            [40] = 4500,
            [28] = 5000,
            [20] = 5700,
            [16] = 6000,
            [12] = 7000,
            [10] = 8000,
            [7] = 11000,
            [5] = 17000,
            [3] = 30000,
            [2] = 45000,
            [1] = 90000,
        };

        public static int MaxYield(int ChipSizeW, int ChipSizeH) => (int)Math.Floor(Math.PI * Math.Pow((Diameter / 2) - (Math.Pow(EdgeLoss, 2) / Diameter * 100), 2) / (ChipSizeH * ChipSizeW));
        public static int BestPricePerDie(int dieSizeW, int dieSizeH) => FabSizeToPrice[FabSizeNanoMeters] / MaxYield(dieSizeW,dieSizeH);
    }
    public class Component
    {
        public string Name;
        public int Cost;
        public int PowerUsage;
        public int PerformanceAdd;
        public ProductType CompatibleProducts;

        public Component(string name, int cost, int powerUsage, int performanceAdd, ProductType compatibleProducts)
        {
            Name=name;
            Cost=cost;
            PowerUsage = powerUsage;
            PerformanceAdd = performanceAdd;
            CompatibleProducts=compatibleProducts;
        }
    }
}