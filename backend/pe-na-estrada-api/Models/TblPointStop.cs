using System;
using System.Collections.Generic;

namespace pe_na_estrada_api
{
    public partial class TblPointStop
    {
        public long Id { get; set; }
        public double LatPoint { get; set; }
        public double LongPoint { get; set; }
        public string StopOptionsTags { get; set; }
        public string ReviewsAvg { get; set; }
    }
}
