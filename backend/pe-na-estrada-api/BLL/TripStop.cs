using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using pe_na_estrada_api.Models;

namespace pe_na_estrada_api.BLL
{
    public class TripStop : GenericModel<TblTripStop>
    {
        public async Task<List<TblTripStop>> GetTripStopsById(DbSet<TblTripStop> pTable, int iTripId)
        {
            return await pTable.Where(x => x.IdTrip == iTripId).ToListAsync();
        }
    }
}