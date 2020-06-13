using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using pe_na_estrada_api.Models;

namespace pe_na_estrada_api.BLL
{
    public class User : GenericModel<TblUser>
    {
        public async Task<TblUser> Login(DbSet<TblUser> pTable, string sCellphone, string sPassword)
        {
            return await pTable.Where(x => x.Password == sPassword && x.Cellphone == sCellphone).FirstOrDefaultAsync();
        }

        public async Task<TblUser> ForgotPassword(DbSet<TblUser> pTable, string sCellphone, string sCPF, DateTime pBirthDate)
        {
            return await pTable.Where(x => x.Cpf == sCPF && x.Cellphone == sCellphone && x.Birthday == pBirthDate).FirstOrDefaultAsync();
        }
    }
}