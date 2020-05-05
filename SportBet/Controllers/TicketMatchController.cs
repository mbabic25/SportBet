using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SportBet.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SportBet.Controllers
{

    [Route("api/[controller]")]
    public class TicketMatchController : Controller
    {

        TicketMatchDataAccessLayer objticketmatch = new TicketMatchDataAccessLayer();
        // GET: api/<controller>
        [HttpGet("[action]")]
        [Route("api/TicketMatch/Index")]
        public IEnumerable<TicketMatch> Index()
        {
            return objticketmatch.GetAllTicketMatches();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost("[action]")]
        [Route("api/TicketMatch/Create")]
        public int Create([FromBody]TicketMatch ticketMatch)
        {
            return objticketmatch.AddTicketMatch(ticketMatch);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
