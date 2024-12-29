using Microsoft.EntityFrameworkCore;
using MovieReviewApp.Data;
using MovieReviewApp.Repositories;
using MovieReviewApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<MovieReviewContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MovieReviewApp")));
builder.Services.AddScoped<IMovieReviewRepository, MovieReviewRepository>();
builder.Services.AddScoped<IMovieReviewService, MovieReviewService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("MovieReviewAppPolicy",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("MovieReviewAppPolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();