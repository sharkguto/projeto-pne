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
    [Route("user")]
    public class UserController : GenericController<TblUser, User>
    {
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<TblUser>> Login([FromServices] pneContext pContext, [FromBody] TblUser pUser)
        {
            return await new User().Login(pContext.TblUser, pUser.Cellphone, pUser.Password);
        }

        [HttpPost]
        [Route("forgot")]
        public async Task<ActionResult<TblUser>> ForgotPassword([FromServices] pneContext pContext, [FromBody] TblUser pUser)
        {
            return await new User().ForgotPassword(pContext.TblUser, pUser.Cellphone, pUser.Cpf, (DateTime)pUser.Birthday);
        }
    }
}