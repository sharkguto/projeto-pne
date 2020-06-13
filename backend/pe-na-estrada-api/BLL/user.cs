using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace pe_na_estrada_api.BLL
{
    public class User
    {
        public async Task<List<TblUser>> GetAll(pneContext pContext)
        {
            return await pContext.TblUser.ToListAsync();
        }

        public async Task<TblUser> Get(pneContext pContext, int iId)
        {
            return await pContext.TblUser.Where(x => x.Id == iId).FirstOrDefaultAsync();
        }

        public async Task<TblUser> Create(pneContext pContext, TblUser pUser)
        {
            pContext.TblUser.Add(pUser);
            await pContext.SaveChangesAsync();
            return pUser;
        }
    }
}