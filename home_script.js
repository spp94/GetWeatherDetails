$(document).ready(function (){ 
    // function for on click of submit button to fetch weather data
    $("#btnSubmit").click(function () {
        getWeather(); // calling getWeather function, to fetch all the weather report for a city
    });
});
// function to fetch all the weather details for a city
function getWeather() {
    var city = $("#city").val(); // variable to store the city value for which report needs to be generated
    // condition to check if city field is not empty
    if (city != '') {
        // doing an AJAX call to get weather report, we have used an API "https://api.openweathermap.org/data/2.5/weather?q=" for this
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=c10bb3bd22f90d636baa008b1529ee25",
            type: "GET",
            dataType: "json",
            success: function (data) {  // if ajax call is successful, we bind the response data into our html
                var widget = showResults(data); // calling function which shall return the html equivalent code of data
                $("#showWeather").html(widget);  // displaying the html code in div
                $("#city").val(''); // emptying the textbox value after displaying the result
            },
            failure: function (data) {   // if the ajax call fails due to any reason
                alert('Failed'); // we give an alert popup showing failed message
            }
        });
    } else {
        // if city value is null or empty then displaying the empty city error using a span
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>");
    }
}
// function to bind Ajax call returned data into an html code
function showResults(data) {
    return '<h3 style="font-weight:bold; font-size:20px; padding-top:20px;" class="text-center">Current Weather for ' + data.name + ', ' + data.sys.country + '</h3>' +
            "<h4 style='padding-left:40px;'><strong>Weather</strong>: " + data.weather[0].main + "</h4>" +
            "<h4 style='padding-left:40px;'><strong>Description</strong>:<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'> " + data.weather[0].description + "</h4>" +
            "<h4 style='padding-left:40px;'><strong>Temperature</strong>: " + data.main.temp + " &deg;C</h4>" +
            "<h4 style='padding-left:40px;'><strong>Pressure</strong>: " + data.main.pressure + " hpa</h4>" +
            "<h4 style='padding-left:40px;padding-bottom: 20px;'><strong>Humidity</strong>: " + data.main.humidity + "%</h4>";
}
