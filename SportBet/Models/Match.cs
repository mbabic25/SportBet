using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportBet.Models
{
    public partial class Match
    {

        public int id { get; set; }
        public string name { get; set; }
        public int SportID { get; set; }
        public decimal player1 { get; set; }
        public decimal player2 { get; set; }
        public decimal x { get; set; }

        [ForeignKey("SportID")]
        public virtual Sport Sport { get; set; }
        public IList<TicketMatch> TicketMatch { get; set; }

    }
}
