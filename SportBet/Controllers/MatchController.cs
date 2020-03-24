using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SportBet.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SportBet.Controllers
{
    [Route("api/[controller]")]
    public class MatchController : Controller
    {
        MatchDataAccessLayer objmatch = new MatchDataAccessLayer();

        // GET: api/<controller>
        [HttpGet("[action]")]
        [Route("api/Match/Index")]
        public IEnumerable<Match> Index()
        {
            return objmatch.GetAllMatches();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        [Route("api/Match/{id}")]
        public Match Details (int id)
        {
            return objmatch.GetMatchData(id);
        }

        // POST api/<controller>
        [HttpPost]
        [Route("api/Match/Details/Create")]
        public int Create(Match match)
        {
            return objmatch.AddMatch(match);
        }

        // PUT api/<controller>/5
        [HttpPut]
        [Route("api/Match/Edit")]
        public int Edit(Match match)
        {
            return objmatch.UpdateMatch(match);
        }

        // DELETE api/<controller>/5
        [HttpDelete]
        [Route("api/Match/Delete/{id}")]
        public int Delete(int id)
        {
            return objmatch.DeleteMatch(id);
        }

        //GET Sports
        [HttpGet("[action]")]
        [Route("api/Match/GetSportList")]
        public IEnumerable<Sport> Details()
        {
            return objmatch.GetSports();
        }
    }
}
