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
    [Route("point")]
    public class PointStopController : Controller
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<TblPointStop>>> Get([FromServices] pneContext pContext)
        {
            return await new PointStop().GetAll(pContext.TblPointStop);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<TblPointStop>> Get([FromServices] pneContext pContext, int id)
        {
            return await new PointStop().Get(pContext.TblPointStop, id);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<TblPointStop>> Post([FromServices] pneContext pContext, [FromBody]TblPointStop pPointStop)
        {
            if (ModelState.IsValid)
            {
                return await new PointStop().Create(pContext.TblPointStop, pContext, pPointStop);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}