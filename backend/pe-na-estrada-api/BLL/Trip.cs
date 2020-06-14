using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using pe_na_estrada_api.Models;

namespace pe_na_estrada_api.BLL
{
    public class Trip : GenericModel<TblTrip>
    {
        public async Task<List<TblTrip>> GetTripsById(DbSet<TblTrip> pTable, int iUserId)
        {
            return await pTable.Where(x => x.IdUser == iUserId).ToListAsync();
        }
    }
}