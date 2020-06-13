using System;
using System.Collections.Generic;
using pe_na_estrada_api.Interfaces;

namespace pe_na_estrada_api.Models
{
    public partial class TblRankingPx:IGenericModel
    {
        public long Id { get; set; }
        public long Points { get; set; }
        public string TypeAction { get; set; }
        public long IdUser { get; set; }
        public long? IdTrip { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual TblTrip IdTripNavigation { get; set; }
        public virtual TblUser IdUserNavigation { get; set; }
    }
}
