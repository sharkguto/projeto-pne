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
    [Route("user")]
    public class UserController : Controller
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<TblUser>>> Get([FromServices] pneContext pContext)
        {
            return await new User().GetAll(pContext.TblUser);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<TblUser>> Get([FromServices] pneContext pContext, int id)
        {
            return await new User().Get(pContext.TblUser, id);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<TblUser>> Post([FromServices] pneContext pContext, [FromBody]TblUser pUser)
        {
            if (ModelState.IsValid)
            {
                return await new User().Create(pContext.TblUser, pContext, pUser);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}