using DAL.Context;
using DAL.Model;
using DAL.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        private ApplicationDbContext _db;

        public OrderRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Save()
        {
            _db.SaveChanges();
        }

        public void Update(Order obj,OrderItem itm)
        {
            var objFromDb = _db.Orders.FirstOrDefault(u => u.Id == obj.Id);
            if (objFromDb != null)
            {
                if(objFromDb.OrderItems.Contains(itm))
                {
                    objFromDb.OrderItems.Append(itm);
                }
            }
        }
    }
}
