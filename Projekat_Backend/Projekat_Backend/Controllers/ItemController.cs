using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Projekat_Backend.Controllers
{
    public class ItemController : Controller
    {
        private readonly IItemService _itemService;
        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
