using System.Text;
using bookstore_be.Data;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var BookStoreSpecificOrigins = "_bookStoreSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: BookStoreSpecificOrigins,
                        builder =>
                        {
                            // builder.WithOrigins("http://localhost:3000", "http://localhost:3000/*")
                            builder.AllowAnyOrigin()
                                                .AllowAnyHeader()
                                                .AllowAnyMethod();
                        });
});

// Add services to the container.

builder.Services.AddTransient<DataSeeder>();

builder.Services.AddControllers();
builder.Services.AddDbContext<DatabaseContext>(options => 
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(s => {
    s.SwaggerDoc(
        "v1",
        new OpenApiInfo
        {
            Title = "SwaggerDemo",
            Version = "v1"
        });
    s.CustomSchemaIds(type => type.FullName);
});
builder.Services.AddMediatR(typeof(Program).Assembly);


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = false,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidateAudience = false,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidateLifetime = true,
        
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

var app = builder.Build();

SeedData(app);

//Seed Data
void SeedData(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

    using (var scope = scopedFactory.CreateScope())
    {
        var service = scope.ServiceProvider.GetService<DataSeeder>();
        service.Seed();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(BookStoreSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseAuthentication();

app.MapControllers();

// Migrate db 
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<DatabaseContext>();
    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }
}

app.Run();
