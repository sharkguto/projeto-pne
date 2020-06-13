using System;
using System.Collections.Generic;
using pe_na_estrada_api.Interfaces;

namespace pe_na_estrada_api.Models
{
    public partial class TblChatCommunity:IGenericModel
    {
        public TblChatCommunity()
        {
            TblChat = new HashSet<TblChat>();
        }

        public long Id { get; set; }
        public long IdUserAdmin { get; set; }
        public string UsersList { get; set; }
        public string GroupName { get; set; }
        public DateTime CreatedAt { get; set; }
        public string HavePassword { get; set; }

        public virtual ICollection<TblChat> TblChat { get; set; }
    }
}
