using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Common;
using Shared.Constants;
using Shared.DTOs;

namespace Projekat_Backend.Controllers
{
    [Route("api/items")]
    [ApiController]
    public class ItemController : Controller
    {
        private readonly IItemService _itemService;
        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet("allItems")]
        public IActionResult GetAll()
        {
            ResponsePackage<IEnumerable<ItemDTO>> response = _itemService.GetAll();
            if (response.Status == ResponseStatus.OK)
                return Ok(response.Data);
            else
                return Problem(response.Message);
        }

        [HttpPost("addNew")]
        [Authorize(Roles = "Seller")]
        public async Task<IActionResult> AddNewItem([FromForm]NewItemDTO itemDTO, IFormFile? file = null)
        {
            if (ModelState.IsValid)
            {
                string filePath;
                if (file != null && file.Length > 0)
                {
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                    string uploadPath = "ItemImages";
                    Console.WriteLine(uploadPath);

                    if (!Directory.Exists(uploadPath))
                    {
                        Directory.CreateDirectory(uploadPath);
                    }

                    filePath = Path.Combine(uploadPath, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }
                else
                {
                    filePath = Path.Combine(Directory.GetCurrentDirectory(), "ItemImages");
                    filePath = Path.Combine(filePath, "noPhoto.png");
                }

                var task =  _itemService.AddItem(itemDTO,filePath);
                if (task.Status == ResponseStatus.OK)
                    return Ok(task.Message);
                else if (task.Status == ResponseStatus.InvalidEmail)
                    ModelState.AddModelError("email", task.Message);
                else if (task.Status == ResponseStatus.InvalidUsername)
                    ModelState.AddModelError("username", task.Message);
                else if (task.Status == ResponseStatus.InternalServerError)
                    ModelState.AddModelError(String.Empty, task.Message);
                else
                    ModelState.AddModelError(String.Empty, task.Message);
            }
            return Problem();
        }




    }
}
