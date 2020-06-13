using System;
using System.Collections.Generic;
using pe_na_estrada_api.Interfaces;

namespace pe_na_estrada_api
{
    public partial class TblPointStopReview : IGenericModel
    {
        public long Id { get; set; }
        public long IdPointStop { get; set; }
        public long IdUser { get; set; }
        public double Rating { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
