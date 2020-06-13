using System;
using System.Collections.Generic;
using pe_na_estrada_api.Interfaces;

namespace pe_na_estrada_api.Models
{
    public partial class TblNotifications:IGenericModel
    {
        public long Id { get; set; }
        public string BroadcastMessage { get; set; }
        public DateTime CreatedAt { get; set; }
        public double? LatValue { get; set; }
        public double? LongValue { get; set; }
        public long NotificationRadiusKm { get; set; }
    }
}
