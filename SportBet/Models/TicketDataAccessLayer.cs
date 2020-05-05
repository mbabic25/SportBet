using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SportBet.Models
{
    public class TicketDataAccessLayer
    {
        OnlineBetContext05bc56b9c2dd44e99bb9affd514b6329Context db = new OnlineBetContext05bc56b9c2dd44e99bb9affd514b6329Context();

        public IEnumerable<Ticket> GetAllTickets()
        {
            try
            {
                return db.Ticket.ToList();
            }
            catch
            {
                throw;
            }
        }

        public int AddTicket(Ticket ticket)
        {
            try
            {
                db.Ticket.Add(ticket);
                db.SaveChanges();
                return ticket.ID;
            }
            catch
            {
                throw;
            }
        }
    }
}
