using System;
using System.Collections.Generic;
using pe_na_estrada_api.Interfaces;

namespace pe_na_estrada_api.Models
{
    public partial class TblPointStop:IGenericModel
    {
        public TblPointStop()
        {
            TblPointStopReview = new HashSet<TblPointStopReview>();
        }

        public long Id { get; set; }
        public double LatPoint { get; set; }
        public double LongPoint { get; set; }
        public string StopOptionsTags { get; set; }
        public string ReviewsAvg { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual ICollection<TblPointStopReview> TblPointStopReview { get; set; }
    }
}
