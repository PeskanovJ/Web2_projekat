using AutoMapper;
using BLL.Services.Interfaces;
using DAL.Repository.IRepository;
using Shared.Common;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Implementations
{
    public class OrderService : IItemService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public OrderService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public ResponsePackage<bool> AddItem(NewItemDTO itemDTO, string filePath)
        {
            throw new NotImplementedException();
        }

        public ResponsePackage<bool> DeleteItem(int id)
        {
            throw new NotImplementedException();
        }

        public ResponsePackage<IEnumerable<ItemDTO>> GetAll(string? includeProperties = null)
        {
            throw new NotImplementedException();
        }

        public ResponsePackage<IEnumerable<ItemDTO>> GetByUser(int UserId, string? includeProperties = null)
        {
            throw new NotImplementedException();
        }

        public ResponsePackage<ItemDTO> GetItem(int id, string? includeProperties = null)
        {
            throw new NotImplementedException();
        }

        public ResponsePackage<bool> UpdateItem(ItemDTO itemDTO)
        {
            throw new NotImplementedException();
        }
    }
}
