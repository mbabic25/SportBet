using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportBet.Models
{
    public partial class Wallet
    {
        public Wallet()
        {
            Ticket = new HashSet<Ticket>();
            Date = DateTime.Now;
        }
        public int ID { get; set; }
        public decimal? Amount { get; set; }     


        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm}")]
        public DateTime Date { get; set; }


        public virtual ICollection<Ticket> Ticket { get; set; }
    }
}
