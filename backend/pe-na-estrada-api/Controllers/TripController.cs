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
    [Route("trip")]
    public class TripController : GenericController<TblTrip, Trip>
    {
        [HttpGet]
        [Route("user/{id:int}")]
        public async Task<ActionResult<List<TblTrip>>> GetUserTrips([FromServices] pneContext pContext, int id)
        {
            return await new Trip().GetTripsById(pContext.TblTrip, id);
        }
    }
}