using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using pe_na_estrada_api.BLL;
using pe_na_estrada_api.Models;

namespace pe_na_estrada_api.Controllers
{
    [Route("trip-stop")]
    public class TripStopController : GenericController<TblTrip, Trip>
    {
        [HttpGet]
        [Route("trip/{id:int}")]
        public async Task<ActionResult<List<TblTripStop>>> GetTripStopsById([FromServices] pneContext pContext, int id)
        {
            return await new TripStop().GetTripStopsById(pContext.TblTripStop, id);
        }
    }
}