using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using pe_na_estrada_api.BLL;

namespace pe_na_estrada_api.Controllers
{
    [Route("truck")]
    public class TruckController : Controller
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<TblTruck>>> Get([FromServices] pneContext pContext)
        {
            return await new truck().GetAll(pContext.TblTruck);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<TblTruck>> Get([FromServices] pneContext pContext, int id)
        {
            return await new truck().Get(pContext.TblTruck, id);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<TblTruck>> Post([FromServices] pneContext pContext, [FromBody]TblTruck pTruck)
        {
            if (ModelState.IsValid)
            {
                return await new truck().Create(pContext.TblTruck, pContext, pTruck);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}