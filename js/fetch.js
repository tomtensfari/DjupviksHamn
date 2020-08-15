export function fetchWeather() {
    return fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.1489/lat/57.3081/data.json')
    
    .then(function(response){
       return response.json(); 
    })
    //fetch gör om det till ett json objekt, färdigbyggd funktionalitet
    .then(function(response){
        console.log(response.timeSeries);
        return response.timeSeries;
    });
}