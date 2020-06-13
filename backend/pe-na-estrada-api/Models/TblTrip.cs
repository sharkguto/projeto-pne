using System;
using System.Collections.Generic;

namespace pe_na_estrada_api
{
    public partial class TblTrip
    {
        public long Id { get; set; }
        public double LatBegin { get; set; }
        public double LongBegin { get; set; }
        public double LatEnd { get; set; }
        public double LongEnd { get; set; }
        public long IdUser { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual TblUser IdUserNavigation { get; set; }
    }
}
