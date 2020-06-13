using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using pe_na_estrada_api.BLL;
using pe_na_estrada_api.Interfaces;
using pe_na_estrada_api.Models;

namespace pe_na_estrada_api.Controllers
{
    public class GenericController<T1, T2> : Controller where T2 : class where T1 : class
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<T1>>> Get([FromServices] pneContext pContext)
        {
            string sPropertyName = typeof(T1).ToString().Split('.')[typeof(T1).ToString().Split('.').Length - 1];
            return await ((GenericModel<T1>)Activator.CreateInstance(typeof(T2))).GetAll((DbSet<T1>)pContext.GetType().GetProperty(sPropertyName).GetValue(pContext));
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<T1>> Get([FromServices] pneContext pContext, int id)
        {
            string sPropertyName = typeof(T1).ToString().Split('.')[typeof(T1).ToString().Split('.').Length - 1];
            return await ((GenericModel<T1>)Activator.CreateInstance(typeof(T2))).Get((DbSet<T1>)pContext.GetType().GetProperty(sPropertyName).GetValue(pContext), id);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<T1>> Post([FromServices] pneContext pContext, [FromBody]T1 pObject)
        {
            if (ModelState.IsValid)
            {
                string sPropertyName = typeof(T1).ToString().Split('.')[typeof(T1).ToString().Split('.').Length - 1];
                return await ((GenericModel<T1>)Activator.CreateInstance(typeof(T2))).Create((DbSet<T1>)pContext.GetType().GetProperty(sPropertyName).GetValue(pContext), pContext, pObject);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost]
        [Route("update")]
        public async Task<ActionResult<T1>> Update([FromServices] pneContext pContext, [FromBody]T1 pObject)
        {
            if (ModelState.IsValid)
            {
                string sPropertyName = typeof(T1).ToString().Split('.')[typeof(T1).ToString().Split('.').Length - 1];
                return await ((GenericModel<T1>)Activator.CreateInstance(typeof(T2))).Update((DbSet<T1>)pContext.GetType().GetProperty(sPropertyName).GetValue(pContext), pContext, pObject);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}