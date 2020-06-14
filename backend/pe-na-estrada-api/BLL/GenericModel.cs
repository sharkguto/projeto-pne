using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using pe_na_estrada_api.Interfaces;
using pe_na_estrada_api.Models;

namespace pe_na_estrada_api.BLL
{
    public class GenericModel<T> where T : class
    {
        public async Task<List<T>> GetAll(DbSet<T> pTable)
        {
            return await pTable.ToListAsync();
        }

        public async Task<T> Get(DbSet<T> pTable, int iId)
        {
            return await pTable.Where(x => ((IGenericModel)x).Id == iId).FirstOrDefaultAsync();
        }

        public async Task<T> Create(DbSet<T> pTable, pneContext pContext, T pUser)
        {
            pTable.Add(pUser);
            await pContext.SaveChangesAsync();
            return pUser;
        }

        public async Task<T> Update(DbSet<T> pTable, pneContext pContext, T pUser)
        {
            // var pObject = await pTable.Where(x => ((IGenericModel)x).Id == ((IGenericModel)pUser).Id).FirstOrDefaultAsync();
            // pObject = pUser;
            pTable.Update(pUser);
            await pContext.SaveChangesAsync();
            return pUser;
        }
    }
}