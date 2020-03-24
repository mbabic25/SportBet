using System;
using System.Collections.Generic;

namespace SportBet.Models
{
    public partial class Wallet
    {
        public Wallet()
        {
            Ticket = new HashSet<Ticket>();
        }

        public int ID { get; set; }
        public decimal? Amount { get; set; }

        public virtual ICollection<Ticket> Ticket { get; set; }
    }
}
