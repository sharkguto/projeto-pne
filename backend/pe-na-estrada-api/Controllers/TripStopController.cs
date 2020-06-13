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
    public class TripStopController: GenericController<TblTrip, Trip>
    {
    }
}