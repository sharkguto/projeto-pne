using System;
using System.Collections.Generic;
using pe_na_estrada_api.Interfaces;

namespace pe_na_estrada_api.Models
{
    public partial class Ranking
    {
        public string Nickname { get; set; }
        public string Name { get; set; }
        public decimal Points { get; set; }
        public Int64 Position { get; set; }
        public DateTime LastActiveDate { get; set; }

    }
}
