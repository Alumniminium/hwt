using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using hardware_tycoon_api.Simulation.Enums;

namespace hardware_tycoon_api.Simulation.Components
{
    public static class Wafer
    {
        public static int FabSizeNanoMeters = 1000;
        public static int EdgeLoss = 5;
        public static int Diameter = 300;

        public static Vector2[] FabToPrice = new Vector2[]
        {
            new Vector2(1000,107),
            new Vector2(100,1077),
            new Vector2(90,1650),
            new Vector2(65,1937),
            new Vector2(40,2274),
            new Vector2(28,2891),
            new Vector2(20,3677),
            new Vector2(16,3984),
            new Vector2(10,5992),
            new Vector2(7,9346),
            new Vector2(5,17000),
            new Vector2(1,100000),
        };
        public static int GetWaferPrice(int size, int year=1972)
        {
            var start = Vector2.One;
            var end = Vector2.One;
            for (int i = 0; i < FabToPrice.Length; i++)
            {
                var cur = FabToPrice[i];
                if (size >= cur.X)
                {
                    start = FabToPrice[i - 1];
                    end = FabToPrice[i];
                    break;
                }
            }
            var price = start.Y + (size - start.X) * (end.Y - start.Y) / (end.X - start.X);
            var inflation = Math.Abs(2020 - year) * 4;
            price = price + (price / 100 * inflation);
            return (int)price;
        }
        public static int MaxYield(int ChipSizeW, int ChipSizeH) => (int)Math.Floor(Math.PI * Math.Pow((Diameter / 2) - (Math.Pow(EdgeLoss, 2) / Diameter * 100), 2) / (ChipSizeH * ChipSizeW));
        public static int BestPricePerDie(int fabSize, int dieSizeW, int dieSizeH) => GetWaferPrice(fabSize) / MaxYield(dieSizeW, dieSizeH);
    }
}