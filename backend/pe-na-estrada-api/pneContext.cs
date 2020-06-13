using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace pe_na_estrada_api
{
    public partial class pneContext : DbContext
    {
        public pneContext()
        {
        }

        public pneContext(DbContextOptions<pneContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblPointStop> TblPointStop { get; set; }
        public virtual DbSet<TblPointStopReview> TblPointStopReview { get; set; }
        public virtual DbSet<TblTrip> TblTrip { get; set; }
        public virtual DbSet<TblTruck> TblTruck { get; set; }
        public virtual DbSet<TblUser> TblUser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(Environment.GetEnvironmentVariable("CONNECTION_STRING"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresEnum(null, "category_type_c", new[] { "security", "price", "clean", "quality" });

            modelBuilder.Entity<TblPointStop>(entity =>
            {
                entity.ToTable("tbl_point_stop");

                entity.HasIndex(e => new { e.LatPoint, e.LongPoint })
                    .HasName("tbl_point_stop_un")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.LatPoint).HasColumnName("lat_point");

                entity.Property(e => e.LongPoint).HasColumnName("long_point");

                entity.Property(e => e.ReviewsAvg)
                    .IsRequired()
                    .HasColumnName("reviews_avg")
                    .HasColumnType("json")
                    .HasDefaultValueSql("'{\"security\":0, \"price\":0, \"clean\":0,\"quality\":0}'::json");

                entity.Property(e => e.StopOptionsTags)
                    .HasColumnName("stop_options_tags")
                    .HasColumnType("json")
                    .HasComment("campo tipo json....recomendo usar como list array ['comida','combustivel']");
            });

            modelBuilder.Entity<TblPointStopReview>(entity =>
            {
                entity.ToTable("tbl_point_stop_review");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.IdPointStop).HasColumnName("id_point_stop");

                entity.Property(e => e.IdUser).HasColumnName("id_user");

                entity.Property(e => e.Rating).HasColumnName("rating");
            });

            modelBuilder.Entity<TblTrip>(entity =>
            {
                entity.ToTable("tbl_trip");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.IdUser).HasColumnName("id_user");

                entity.Property(e => e.LatBegin).HasColumnName("lat_begin");

                entity.Property(e => e.LatEnd).HasColumnName("lat_end");

                entity.Property(e => e.LongBegin).HasColumnName("long_begin");

                entity.Property(e => e.LongEnd).HasColumnName("long_end");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.TblTrip)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("tbl_trip_fk");
            });

            modelBuilder.Entity<TblTruck>(entity =>
            {
                entity.ToTable("tbl_truck");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.IdUser).HasColumnName("id_user");

                entity.Property(e => e.LicensingDate)
                    .HasColumnName("licensing_date")
                    .HasColumnType("date");

                entity.Property(e => e.TruckNickname)
                    .IsRequired()
                    .HasColumnName("truck_nickname")
                    .HasMaxLength(100);

                entity.Property(e => e.TruckPlate)
                    .HasColumnName("truck_plate")
                    .HasMaxLength(20);

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.TblTruck)
                    .HasForeignKey(d => d.IdUser)
                    .HasConstraintName("tbl_truck_fk");
            });

            modelBuilder.Entity<TblUser>(entity =>
            {
                entity.ToTable("tbl_user");

                entity.HasIndex(e => e.Nickname)
                    .HasName("tbl_user_un")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.Birthday)
                    .HasColumnName("birthday")
                    .HasColumnType("date");

                entity.Property(e => e.Cellphone)
                    .HasColumnName("cellphone")
                    .HasMaxLength(100);

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasColumnName("cpf")
                    .HasMaxLength(30);

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(256);

                entity.Property(e => e.Nickname)
                    .IsRequired()
                    .HasColumnName("nickname")
                    .HasMaxLength(100);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(200);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
