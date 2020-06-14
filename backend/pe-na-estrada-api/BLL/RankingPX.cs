using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using pe_na_estrada_api.Models;

namespace pe_na_estrada_api.BLL
{
    public class RankingPX : GenericModel<TblRankingPx>
    {
        public async Task<List<TblRankingPx>> GetPointsByTripId(DbSet<TblRankingPx> pTable, int iTripId)
        {
            return await pTable.Where(x => x.IdTrip == iTripId).ToListAsync();
        }
    }
}