using Core;

const string corsAllowDevLocalhost = "DevLocalhostOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsAllowDevLocalhost, policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:3000");
    });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(corsAllowDevLocalhost);
}

app.UseWebSockets();

BackendServer.Instance.OnStartup();


app.MapControllers();

app.Run();
