using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace pe_na_estrada_api.Models
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

        public virtual DbSet<TblChat> TblChat { get; set; }
        public virtual DbSet<TblChatCommunity> TblChatCommunity { get; set; }
        public virtual DbSet<TblNotifications> TblNotifications { get; set; }
        public virtual DbSet<TblPointStop> TblPointStop { get; set; }
        public virtual DbSet<TblPointStopReview> TblPointStopReview { get; set; }
        public virtual DbSet<TblRankingPx> TblRankingPx { get; set; }
        public virtual DbSet<TblTrip> TblTrip { get; set; }
        public virtual DbSet<TblTripStop> TblTripStop { get; set; }
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

            modelBuilder.Entity<TblChat>(entity =>
            {
                entity.ToTable("tbl_chat");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.IdChatCommunity).HasColumnName("id_chat_community");

                entity.Property(e => e.IdUser).HasColumnName("id_user");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasColumnName("message");

                entity.HasOne(d => d.IdChatCommunityNavigation)
                    .WithMany(p => p.TblChat)
                    .HasForeignKey(d => d.IdChatCommunity)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("tbl_chat_fk");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.TblChat)
                    .HasForeignKey(d => d.IdUser)
                    .HasConstraintName("tbl_chat_user_fk");
            });

            modelBuilder.Entity<TblChatCommunity>(entity =>
            {
                entity.ToTable("tbl_chat_community");

                entity.HasIndex(e => e.GroupName)
                    .HasName("tbl_chat_community_un2")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.GroupName)
                    .IsRequired()
                    .HasColumnName("group_name")
                    .HasMaxLength(256);

                entity.Property(e => e.HavePassword)
                    .HasColumnName("have_password")
                    .HasMaxLength(50)
                    .HasComment("se password for nulo é aberto ao publico, senao tem q fornecer a senha pra entrar");

                entity.Property(e => e.IdUserAdmin).HasColumnName("id_user_admin");

                entity.Property(e => e.UsersList)
                    .HasColumnName("users_list")
                    .HasColumnType("json")
                    .HasComment("lista de usuarios que tem permissao pra ler/escrever ... caso seja publico api so apenda ele no array, se for privado o id_user_admin que tem q adicionar");
            });

            modelBuilder.Entity<TblNotifications>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tbl_notifications");

                entity.Property(e => e.BroadcastMessage)
                    .IsRequired()
                    .HasColumnName("broadcast_message")
                    .HasComment("mensagens em brodcast, notificações pra base de usuarios");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd()
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.LatValue)
                    .HasColumnName("lat_value")
                    .HasDefaultValueSql("'-23.17944'::numeric")
                    .HasComment("sjc");

                entity.Property(e => e.LongValue)
                    .HasColumnName("long_value")
                    .HasDefaultValueSql("'-45.88694'::numeric")
                    .HasComment("sjc");

                entity.Property(e => e.NotificationRadiusKm)
                    .HasColumnName("notification_radius_km")
                    .HasDefaultValueSql("3000");
            });

            modelBuilder.Entity<TblPointStop>(entity =>
            {
                entity.ToTable("tbl_point_stop");

                entity.HasIndex(e => new { e.LatPoint, e.LongPoint })
                    .HasName("tbl_point_stop_un")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

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

                entity.HasIndex(e => new { e.IdPointStop, e.IdUser, e.CategoryType })
                    .HasName("tbl_point_stop_review_un")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.CategoryType)
                    .IsRequired()
                    .HasColumnName("category_type")
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.IdPointStop).HasColumnName("id_point_stop");

                entity.Property(e => e.IdUser).HasColumnName("id_user");

                entity.Property(e => e.Rating).HasColumnName("rating");

                entity.HasOne(d => d.IdPointStopNavigation)
                    .WithMany(p => p.TblPointStopReview)
                    .HasForeignKey(d => d.IdPointStop)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("tbl_point_stop_review_fk_1");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.TblPointStopReview)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("tbl_point_stop_review_fk");
            });

            modelBuilder.Entity<TblRankingPx>(entity =>
            {
                entity.ToTable("tbl_ranking_px");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.IdTrip)
                    .HasColumnName("id_trip")
                    .HasComment("opcional.... nem sempre a pontuação vai estar relacionada a uma viagem");

                entity.Property(e => e.IdUser).HasColumnName("id_user");

                entity.Property(e => e.Points)
                    .HasColumnName("points")
                    .HasDefaultValueSql("'-1'::integer")
                    .HasComment("caso o motorista ultrapassar a velocidade fazer negativo");

                entity.Property(e => e.TypeAction)
                    .IsRequired()
                    .HasColumnName("type_action")
                    .HasMaxLength(100)
                    .HasComment("colocar o tipo da pontuação... por exemplo, alongamento, parada descanço, almoço na hora certa, sono,...");

                entity.HasOne(d => d.IdTripNavigation)
                    .WithMany(p => p.TblRankingPx)
                    .HasForeignKey(d => d.IdTrip)
                    .HasConstraintName("tbl_ranking_px_trip_fk");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.TblRankingPx)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("tbl_ranking_px_fk");
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

                entity.Property(e => e.Destiny)
                    .HasColumnName("destiny")
                    .HasMaxLength(256);

                entity.Property(e => e.FinishedAt)
                    .HasColumnName("finished_at")
                    .HasColumnType("timestamp with time zone");

                entity.Property(e => e.IdUser).HasColumnName("id_user");

                entity.Property(e => e.MinutesTripAt)
                    .HasColumnName("minutes_trip_at")
                    .HasColumnType("time without time zone")
                    .HasComment("trigger que calcula a diff do created_at e finished_at");

                entity.Property(e => e.Origin)
                    .HasColumnName("origin")
                    .HasMaxLength(256);

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.TblTrip)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("tbl_trip_fk");
            });

            modelBuilder.Entity<TblTripStop>(entity =>
            {
                entity.ToTable("tbl_trip_stop");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.IdTrip).HasColumnName("id_trip");

                entity.Property(e => e.ReturnTripAt)
                    .HasColumnName("return_trip_at")
                    .HasColumnType("timestamp with time zone");

                entity.HasOne(d => d.IdTripNavigation)
                    .WithMany(p => p.TblTripStop)
                    .HasForeignKey(d => d.IdTrip)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("tbl_trip_stop_fk");
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
