using Shared.Common;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IOrderService
    {
        ResponsePackage<OrderDTO> GetOrder(long id);
        ResponsePackage<bool> AddOrder(OrderDTO itemDTO);
        ResponsePackage<bool> UpdateOrder(long id);
        ResponsePackage<IEnumerable<OrderDTO>> GetAll();
        ResponsePackage<IEnumerable<OrderDTO>> GetByUser(long UserId);
    }
}
