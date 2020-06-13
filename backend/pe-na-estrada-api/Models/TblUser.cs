using System;
using System.Collections.Generic;
using pe_na_estrada_api.Interfaces;

namespace pe_na_estrada_api.Models
{
    public partial class TblUser : IGenericModel
    {
        public TblUser()
        {
            TblChat = new HashSet<TblChat>();
            TblPointStopReview = new HashSet<TblPointStopReview>();
            TblRankingPx = new HashSet<TblRankingPx>();
            TblTrip = new HashSet<TblTrip>();
            TblTruck = new HashSet<TblTruck>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Cpf { get; set; }
        public string Nickname { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? Birthday { get; set; }
        public string Cellphone { get; set; }

        public virtual ICollection<TblChat> TblChat { get; set; }
        public virtual ICollection<TblPointStopReview> TblPointStopReview { get; set; }
        public virtual ICollection<TblRankingPx> TblRankingPx { get; set; }
        public virtual ICollection<TblTrip> TblTrip { get; set; }
        public virtual ICollection<TblTruck> TblTruck { get; set; }
    }
}
