using System;
using System.Collections.Generic;
using pe_na_estrada_api.Interfaces;

namespace pe_na_estrada_api.Models
{
    public partial class TblChat : IGenericModel
    {
        public long Id { get; set; }
        public long IdChatCommunity { get; set; }
        public long? IdUser { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual TblChatCommunity IdChatCommunityNavigation { get; set; }
        public virtual TblUser IdUserNavigation { get; set; }
    }
}
