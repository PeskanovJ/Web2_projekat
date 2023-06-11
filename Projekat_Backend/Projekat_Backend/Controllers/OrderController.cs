using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Projekat_Backend.Controllers
{
    [Route("api/items")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
