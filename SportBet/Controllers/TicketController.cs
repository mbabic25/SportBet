using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportBet.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SportBet.Controllers
{
    [Route("api/[controller]")]
    public class TicketController : Controller
    {
        TicketDataAccessLayer objTicket = new TicketDataAccessLayer();
        // GET: api/<controller>

        [HttpGet("[action]")]
        [Route("api/Ticket/Index")]
        public IEnumerable<Ticket> Index()
        {
            return objTicket.GetAllTickets();
        }


        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }



        // POST api/<controller>
        [HttpPost("[action]")]
        [Route("api/Ticket/Create")]
        public int Create([FromBody]Ticket ticket)
        {
            return objTicket.AddTicket(ticket);
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
