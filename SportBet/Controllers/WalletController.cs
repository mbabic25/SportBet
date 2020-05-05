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
    public class WalletController : Controller
    {
        WalletDataAccessLayer objwallet = new WalletDataAccessLayer();

        // GET: api/<controller>
        [HttpGet("[action]")]
        [Route("api/Wallet/Index")]
        public IEnumerable<Wallet> Index()
        {
            return objwallet.GetAllTransactions();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>

        [HttpPost("[action]")]
        [Route("api/Wallet/Create")]
        public int Create([FromBody]Wallet wallet)
        {
            return objwallet.AddWallet(wallet);
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
