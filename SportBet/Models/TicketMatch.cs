using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SportBet.Models
{
    public class TicketMatch
    {
        public int TicketID { get; set; }
        [ForeignKey("TicketID")]
        public Ticket Ticket { get; set; }

        public int Matchid { get; set; }
        [ForeignKey("Matchid")]
        public Match Match { get; set; }

        public string Selected { get; set; }
    }
}
