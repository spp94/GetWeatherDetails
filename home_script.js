$(document).ready(function (){

    $("#btnSubmit").click(function () {
        getWeather();
    });


});

function getWeather() {
    debugger;
    var city = $("#city").val();

    if (city != '') {
        debugger;
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=c10bb3bd22f90d636baa008b1529ee25",
            type: "GET",
            dataType: "json",
            success: function (data) {
                debugger;
                var widget = showResults(data);
                $("#showWeather").html(widget);
                $("#city").val('');
            },
            failure: function (data) {
                debugger;
                alert('Failed');
            }
        });
    } else {
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>");
    }

}


function showResults(data) {
    return '<h3 style="font-weight:bold; font-size:20px; padding-top:20px;" class="text-center">Current Weather for ' + data.name + ', ' + data.sys.country + '</h3>' +
            "<h4 style='padding-left:40px;'><strong>Weather</strong>: " + data.weather[0].main + "</h4>" +
            "<h4 style='padding-left:40px;'><strong>Description</strong>:<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'> " + data.weather[0].description + "</h4>" +
            "<h4 style='padding-left:40px;'><strong>Temperature</strong>: " + data.main.temp + " &deg;C</h4>" +
            "<h4 style='padding-left:40px;'><strong>Pressure</strong>: " + data.main.pressure + " hpa</h4>" +
            "<h4 style='padding-left:40px;padding-bottom: 20px;'><strong>Humidity</strong>: " + data.main.humidity + "%</h4>";
}
