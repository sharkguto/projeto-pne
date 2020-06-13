using System;
using System.Collections.Generic;
using pe_na_estrada_api.Interfaces;

namespace pe_na_estrada_api.Models
{
    public partial class TblTrip:IGenericModel
    {
        public TblTrip()
        {
            TblRankingPx = new HashSet<TblRankingPx>();
            TblTripStop = new HashSet<TblTripStop>();
        }

        public long Id { get; set; }
        public long IdUser { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Origin { get; set; }
        public string Destiny { get; set; }
        public DateTime? FinishedAt { get; set; }
        public TimeSpan? MinutesTripAt { get; set; }

        public virtual TblUser IdUserNavigation { get; set; }
        public virtual ICollection<TblRankingPx> TblRankingPx { get; set; }
        public virtual ICollection<TblTripStop> TblTripStop { get; set; }
    }
}
