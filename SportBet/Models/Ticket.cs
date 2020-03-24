using System;
using System.Collections.Generic;

namespace SportBet.Models
{
    public partial class Ticket
    {
        public int ID { get; set; }
        public decimal Cfc { get; set; }
        public int Amount { get; set; }
        public decimal Return { get; set; }
        public int? WalletId { get; set; }
        public bool? Successful { get; set; }

        public virtual Wallet Wallet { get; set; }
    }
}
