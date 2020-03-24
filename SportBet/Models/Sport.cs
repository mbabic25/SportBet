using System;
using System.Collections.Generic;

namespace SportBet.Models
{
    public partial class Sport
    {
        public Sport()
        {
            Match = new HashSet<Match>();
        }

        public int ID { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Match> Match { get; set; }
    }
}
