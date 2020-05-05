using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SportBet.Models
{
    public partial class OnlineBetContext05bc56b9c2dd44e99bb9affd514b6329Context : DbContext
    {
        public OnlineBetContext05bc56b9c2dd44e99bb9affd514b6329Context()
        {
        }

        public OnlineBetContext05bc56b9c2dd44e99bb9affd514b6329Context(DbContextOptions<OnlineBetContext05bc56b9c2dd44e99bb9affd514b6329Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Match> Match { get; set; }
        public virtual DbSet<Sport> Sport { get; set; }
        public virtual DbSet<Ticket> Ticket { get; set; }
        public virtual DbSet<Wallet> Wallet { get; set; }
        public virtual DbSet<TicketMatch> TicketMatch { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-SRDUH0M;Database=OnlineBetContext-05bc56b9-c2dd-44e9-9bb9-affd514b6329;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.3-servicing-35854");

            modelBuilder.Entity<Match>(entity =>
            {
                entity.Property(e => e.id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.player1).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.player2).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.x).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Sport)
                    .WithMany(p => p.Match)
                    .HasForeignKey(d => d.SportID)
                    .OnDelete(DeleteBehavior.ClientSetNull)                    
                    .HasConstraintName("FK__Match__Sport__2D27B809");                
            });

            modelBuilder.Entity<Sport>(entity =>
            {
                entity.Property(e => e.SportID)
                    .HasColumnName("SportID")
                    .ValueGeneratedNever();

                entity.Property(e => e.SportName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.Property(e => e.ID)
                    .HasColumnName("ID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Cfc)
                       .HasColumnName("CFC")
                       .HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Amount)
                      .HasColumnName("Amount");



                entity.Property(e => e.Return).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.WalletId).HasColumnName("Wallet_ID")
                        .ValueGeneratedNever(); 

                entity.HasOne(d => d.Wallet)
                    .WithMany(p => p.Ticket)
                    .HasForeignKey(d => d.WalletId)
                    .HasConstraintName("FK__Ticket__Wallet_I__35BCFE0A");

                
            });

            modelBuilder.Entity<Wallet>(entity =>
            {
                entity.Property(e => e.ID)
                      .HasColumnName("ID")
                      .ValueGeneratedOnAdd();

                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.Date).HasColumnType("datetime");
            });

            modelBuilder.Entity<TicketMatch>(entity =>
            {
                entity.HasKey(tm => new { tm.TicketID, tm.Matchid });
                entity.Property(e => e.TicketID).HasColumnName("Ticket_ID")
                      .ValueGeneratedNever();

                entity.Property(e => e.Matchid).HasColumnName("Match_ID")
                      .ValueGeneratedNever();

                entity.HasOne(d => d.Ticket)
                    .WithMany(p => p.TicketMatch)
                    .HasForeignKey(d => d.TicketID)
                    .HasConstraintName("FK__TicketMat__Ticke__151B244E");

                entity.HasOne(d => d.Match)
                    .WithMany(p => p.TicketMatch)
                    .HasForeignKey(d => d.Matchid)
                    .HasConstraintName("FK__TicketMat__Match__14270015");

                entity.Property(e => e.Selected)
                     .HasColumnName("Selected");
            });

        }
    }
}
