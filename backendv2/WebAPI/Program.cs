using Core;
using Core.Data.Calendar;

const string corsAllowDevLocalhost = "DevLocalhostOrigins";

var builder = WebApplication.CreateBuilder(args);

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

BackendServer.Instance.OnStartup();

//app.UseHttpsRedirection();

app.MapGet("/api/calendar/getall", () =>
{
    var calendars = DsbCalendarController.Instance.GetAll();
    return calendars;
})
.WithName("GetAllCalendars")
.WithOpenApi();

app.Run();
