using System;
using System.Collections.Generic;

namespace SportBet.Models
{
    public partial class Match
    {
        public int id { get; set; }
        public string name { get; set; }
        public int sport { get; set; }
        public decimal player1 { get; set; }
        public decimal player2 { get; set; }
        public decimal x { get; set; }

        public virtual Sport sportNavigation { get; set; }
    }
}
