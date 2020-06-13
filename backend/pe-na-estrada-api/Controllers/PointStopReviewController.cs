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
    [Route("pointreview")]
    public class PointStopReviewController : Controller
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<TblPointStopReview>>> Get([FromServices] pneContext pContext)
        {
            return await new PointStopReview().GetAll(pContext.TblPointStopReview);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<TblPointStopReview>> Get([FromServices] pneContext pContext, int id)
        {
            return await new PointStopReview().Get(pContext.TblPointStopReview, id);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<TblPointStopReview>> Post([FromServices] pneContext pContext, [FromBody]TblPointStopReview pPointStopReview)
        {
            if (ModelState.IsValid)
            {
                return await new PointStopReview().Create(pContext.TblPointStopReview, pContext, pPointStopReview);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}