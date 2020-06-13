using System;
using System.Collections.Generic;
using pe_na_estrada_api.Interfaces;

namespace pe_na_estrada_api
{
    public partial class TblTruck : IGenericModel
    {
        public long Id { get; set; }
        public string TruckNickname { get; set; }
        public string TruckPlate { get; set; }
        public DateTime? LicensingDate { get; set; }
        public long? IdUser { get; set; }

        public virtual TblUser IdUserNavigation { get; set; }
    }
}
