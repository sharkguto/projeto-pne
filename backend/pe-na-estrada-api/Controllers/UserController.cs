using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace pe_na_estrada_api.Controllers
{
    [Route("user")]
    public class UserController : Controller
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<TblUser>>> Get([FromServices] pneContext context)
        {
            var pUsers = await context.TblUser.ToListAsync();
            return pUsers;
        }
    }
}