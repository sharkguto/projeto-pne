using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using pe_na_estrada_api.Models;
using System.Data;
using System;

namespace pe_na_estrada_api.BLL
{
    public class RankingPX : GenericModel<TblRankingPx>
    {
        public async Task<List<TblRankingPx>> GetPointsByTripId(DbSet<TblRankingPx> pTable, int iTripId)
        {
            return await pTable.Where(x => x.IdTrip == iTripId).ToListAsync();
        }

        public async Task<List<Ranking>> GetCalculatedRanking(pneContext pContext, String nickname = null)
        {
            string sQuery = "select us.nickname as nickname, sum (trp.points ) as points, " +
            "max(trp.created_at ) as last_active_date, us.name as name, us.cellphone as  phone, " +
            "ROW_NUMBER() OVER ( order by sum(trp.points) desc, max(trp.created_at) asc ) as position " +
            "from tbl_ranking_px trp " +
            "inner join tbl_user us on trp.id_user =us.id ";
            if (nickname != null)
            {
                sQuery += " where us.nickname = '" + nickname + "' ";
            }
            sQuery += "group by us.name,us.nickname,us.cellphone ";

            List<Ranking> pRankingList = new List<Ranking>();
            using (var command = pContext.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = sQuery;
                pContext.Database.OpenConnection();

                using (var result = await command.ExecuteReaderAsync())
                {
                    while (result.Read())
                    {
                        Ranking pRanking = new Ranking();
                        pRanking.Nickname = result["nickname"].ToString();
                        pRanking.Name = result["name"].ToString();
                        if (nickname != null)
                        {
                            pRanking.Phone = result["phone"].ToString();
                            pRanking.LastActiveDate = (DateTime)result["last_active_date"];
                        }
                        pRanking.Points = (decimal)result["points"];
                        pRanking.Position = (Int64)result["position"];


                        pRankingList.Add(pRanking);
                    }

                }
            }
            return pRankingList;
        }
    }
}