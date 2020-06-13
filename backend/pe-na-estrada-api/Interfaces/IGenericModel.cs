using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;

namespace pe_na_estrada_api.Interfaces
{
    public interface IGenericModel
    {
        long Id { get; set; }
    }
}