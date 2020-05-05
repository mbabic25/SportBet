using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SportBet.Models
{
    public class WalletDataAccessLayer
    {
        OnlineBetContext05bc56b9c2dd44e99bb9affd514b6329Context db = new OnlineBetContext05bc56b9c2dd44e99bb9affd514b6329Context();
        
        public IEnumerable<Wallet> GetAllTransactions()
        {
            try
            {
                return db.Wallet.ToList();
            }
            catch
            {
                throw;
            }
        }

        public int AddWallet(Wallet wallet)
        {
            try
            {
                db.Wallet.Add(wallet);
                db.SaveChanges();

                return wallet.ID;
            }
            catch
            {
                throw;
            }
        }
    }
}
