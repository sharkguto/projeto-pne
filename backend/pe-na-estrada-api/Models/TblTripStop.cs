using System;
using System.Collections.Generic;
using pe_na_estrada_api.Interfaces;

namespace pe_na_estrada_api.Models
{
    public partial class TblTripStop:IGenericModel
    {
        public long Id { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ReturnTripAt { get; set; }
        public long IdTrip { get; set; }

        public virtual TblTrip IdTripNavigation { get; set; }
    }
}
