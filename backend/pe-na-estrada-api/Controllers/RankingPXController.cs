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
    [Route("ranking-px")]
    public class RankingPXController : GenericController<TblRankingPx, RankingPX>
    {
        [HttpGet]
        [Route("trip/{id:int}")]
        public async Task<ActionResult<List<TblRankingPx>>> GetTripStopsById([FromServices] pneContext pContext, int id)
        {
            return await new RankingPX().GetPointsByTripId(pContext.TblRankingPx, id);
        }

        [HttpGet]
        [Route("list")]
        public async Task<ActionResult<List<Ranking>>> GetCalculatedRanking([FromServices] pneContext pContext)
        {
            return await new RankingPX().GetCalculatedRanking(pContext);
        }
    }
}