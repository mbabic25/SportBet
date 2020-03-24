using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportBet.Models
{
    public class MatchDataAccessLayer
    {
        OnlineBetContext05bc56b9c2dd44e99bb9affd514b6329Context db = new OnlineBetContext05bc56b9c2dd44e99bb9affd514b6329Context();
        public IEnumerable<Match> GetAllMatches()
        {
            try
            {
                return db.Match.ToList();
            }
            catch
            {
                throw;
            }
        }
        //To Add new match record     
        public int AddMatch(Match match)
        {
            try
            {
                db.Match.Add(match);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update the records of a particluar match    
        public int UpdateMatch(Match match)
        {
            try
            {
                db.Entry(match).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a particular match    
        public Match GetMatchData(int id)
        {
            try
            {
                Match match = db.Match.Find(id);
                return match;
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record of a particular match    
        public int DeleteMatch(int id)
        {
            try
            {
                Match mat = db.Match.Find(id);
                db.Match.Remove(mat);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Get the list of Sports    
        public List<Sport> GetSports()
        {
            List<Sport> lstSport = new List<Sport>();
            lstSport = (from SportList in db.Sport select SportList).ToList();
            return lstSport;
        }
    }
}
