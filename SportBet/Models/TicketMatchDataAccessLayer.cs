using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportBet.Models
{
    public class TicketMatchDataAccessLayer
    {
        OnlineBetContext05bc56b9c2dd44e99bb9affd514b6329Context db = new OnlineBetContext05bc56b9c2dd44e99bb9affd514b6329Context();

        public IEnumerable<TicketMatch> GetAllTicketMatches()
        {
            try
            {
                return db.TicketMatch.ToList();
            }
            catch
            {
                throw;
            }
        }

        public int AddTicketMatch(TicketMatch ticketMatch)
        {
            try
            {
                db.TicketMatch.Add(ticketMatch);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
