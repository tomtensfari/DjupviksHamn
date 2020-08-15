import {fetchWeather} from "./fetch.js";
let promise = fetchWeather();

//Skapa rubriker
const WEATHER_SECTION = document.getElementById('smhi');

var sectionHeader = document.createElement('h2');
sectionHeader.innerHTML = "Djupvik hamns väder";

var sectionSubHeader = document.createElement('h3');
sectionSubHeader.innerHTML = "Idag";
WEATHER_SECTION.appendChild(sectionHeader);
WEATHER_SECTION.appendChild(sectionSubHeader);

//Skapa tabellerna för idag
const WEATHER_TABEL = document.createElement('table');
WEATHER_TABEL.setAttribute('id', 'smhi_tabel');
WEATHER_SECTION.appendChild(WEATHER_TABEL);

const CLOCK_HEADER = document.createElement('th');
CLOCK_HEADER.innerHTML = 'Kl';
WEATHER_TABEL.appendChild(CLOCK_HEADER);

const TEMP_HEADER = document.createElement('th');
TEMP_HEADER.innerHTML = 'Temp';
WEATHER_TABEL.appendChild(TEMP_HEADER);

const WIND_HEADER = document.createElement('th');
WIND_HEADER.innerHTML = 'Vind';
WEATHER_TABEL.appendChild(WIND_HEADER);

const SKY_HEADER = document.createElement('th');
SKY_HEADER.innerHTML = "Himmel";
WEATHER_TABEL.appendChild(SKY_HEADER);


//Tabell för morgondagen
var sectionSubHeader = document.createElement('h3');
sectionSubHeader.innerHTML = "Imorgon";
WEATHER_SECTION.appendChild(sectionSubHeader);

const WEATHER_TABEL_TOMORROW = document.createElement('table');
WEATHER_TABEL_TOMORROW.setAttribute('id', 'smhi_tabel');
WEATHER_SECTION.appendChild(WEATHER_TABEL_TOMORROW);

const CLOCK_HEADER_TOMORROW = document.createElement('th');
CLOCK_HEADER_TOMORROW.innerHTML = 'Kl';
WEATHER_TABEL_TOMORROW.appendChild(CLOCK_HEADER_TOMORROW);

const TEMP_HEADER_TOMORROW = document.createElement('th');
TEMP_HEADER_TOMORROW.innerHTML = 'Temp';
WEATHER_TABEL_TOMORROW.appendChild(TEMP_HEADER_TOMORROW);

const WIND_HEADER_TOMORROW = document.createElement('th');
WIND_HEADER_TOMORROW.innerHTML = 'Vind';
WEATHER_TABEL_TOMORROW.appendChild(WIND_HEADER_TOMORROW);

const SKY_HEADER_TOMORROW = document.createElement('th');
SKY_HEADER_TOMORROW.innerHTML = "Himmel";
WEATHER_TABEL_TOMORROW.appendChild(SKY_HEADER_TOMORROW);


//Hämta datan
promise.then(function(data){
    return insertFunction(data); 
});

function insertFunction(weather){
    weather.forEach((item, index) =>{
    
        //Skapa datum i rätt format
        var today = new Date().toISOString().slice(0,10);
        var tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+1);
        var tomorrow = tomorrow.toISOString().slice(0,10);

        //Lokaliserar index i arrayen, eftersom positionen kan förändras
        var dateIndex = weather.map(a =>a.validTime);
        var time_index_06 = dateIndex.indexOf(today+'T06:00:00Z');
        var time_index_12 = dateIndex.indexOf(today+'T12:00:00Z');
        var time_index_18 = dateIndex.indexOf(today+'T18:00:00Z');
        var time_index_22 = dateIndex.indexOf(today+'T22:00:00Z');

        var tomorrow_time_index_06= dateIndex.indexOf(tomorrow+'T06:00:00Z');
        var tomorrow_time_index_12 = dateIndex.indexOf(tomorrow+'T12:00:00Z');
        var tomorrow_time_index_18 = dateIndex.indexOf(tomorrow+'T18:00:00Z');

        var parameterIndex = item.parameters.map(a => a.name);
        var temp_index = parameterIndex.indexOf('t');
        var wind_index = parameterIndex.indexOf('ws');
        var cloud_index = parameterIndex.indexOf('tcc_mean');
        var wind_d_index =parameterIndex.indexOf('wd');

        var timeData = document.createElement('td');
        var tempData = document.createElement('td');
        var windData = document.createElement('td');
        var skyData = document.createElement('td');
        var weatherRow = document.createElement('tr');

        function insertDataToday(item){
            
            
            timeData.innerHTML = item.validTime.slice(11,16);
            tempData.innerHTML = item.parameters[temp_index].values[0];
            var wi = item.parameters[wind_index].values[0];

            var sky = item.parameters[cloud_index].values[0];
            if (sky<=2) {
                sky= 'Klart'
            } else if (sky>2 && sky<=4){
                sky='Halvklart'
            } else if (sky>4 && sky<=6){
                sky='Molnigt'
            }else {
                sky='Mulet'
            }
            
            var wd = item.parameters[wind_d_index].values[0];
            if (wd>=0 && wd<=23||wd<=337 && wd>=360) {   
                wd='(N)'
            }else if (wd>23 && wd<=68){
                wd='(NO)'
            }else if (wd>68 && wd<=113){
                wd='(O)'
            }else if (wd>113 && wd<=158){
                wd='(SO)'
            }else if (wd>158 && wd<=203){
                wd='(S)'
            }else if (wd>203 && wd<=248){
                wd='(SV)'
            }else if (wd>248 && wd<=293){
                wd='(V)'
            }else {
                wd='(NV)'
            }

            windData.append(wi);
            windData.append(wd);
            skyData.append(sky);
            weatherRow.appendChild(timeData);
            weatherRow.appendChild(tempData);
            weatherRow.appendChild(windData); 
            weatherRow.appendChild(skyData);
            WEATHER_TABEL.appendChild(weatherRow);
            
        }

        function insertDataTomorrow(item){
            timeData.innerHTML = item.validTime.slice(11,16);
            tempData.innerHTML = item.parameters[temp_index].values[0];
            var wi = item.parameters[wind_index].values[0];

            var sky = item.parameters[cloud_index].values[0];
            if (sky<=2) {
                sky= 'Klart'
            } else if (sky>2 && sky<=4){
                sky='Halvklart'
            } else if (sky>4 && sky<=6){
                sky='Molnigt'
            }else {
                sky='Mulet'
            }
            
            var wd = item.parameters[wind_d_index].values[0];
            if (wd>=0 && wd<=23||wd<=337 && wd>=360) {   
                wd='(N)'
            }else if (wd>23 && wd<=68){
                wd='(NO)'
            }else if (wd>68 && wd<=113){
                wd='(O)'
            }else if (wd>113 && wd<=158){
                wd='(SO)'
            }else if (wd>158 && wd<=203){
                wd='(S)'
            }else if (wd>203 && wd<=248){
                wd='(SV)'
            }else if (wd>248 && wd<=293){
                wd='(V)'
            }else {
                wd='(NV)'
            }

            windData.append(wi);
            windData.append(wd);
            skyData.append(sky);
            weatherRow.appendChild(timeData);
            weatherRow.appendChild(tempData);
            weatherRow.appendChild(windData); 
            weatherRow.appendChild(skyData);
            WEATHER_TABEL_TOMORROW.appendChild(weatherRow);
        }
//----------------------Dagens väder-----------------------------
        //Klockan 06 idag
        if (index===time_index_06) {
            insertDataToday(item);
        }
        //Klockan 12 idag
        if (index===time_index_12) {
            insertDataToday(item);
        }
        //Klockan 18 idag
        if (index===time_index_18) {
            insertDataToday(item);
        }
        //Klockan 22 idag
        if (index===time_index_22) {
            insertDataToday(item);
        }
//----------------------Morgondagens väder-----------------------------
        if (index===tomorrow_time_index_06) {
            insertDataTomorrow(item);
        }
        if (index===tomorrow_time_index_12) {
            insertDataTomorrow(item);
        }
        if (index===tomorrow_time_index_18) {
            insertDataTomorrow(item);
        }
    });
}


/*
    //Skapar raden för kl06
    if (time_index_06>=0) {
        var parameterIndex06 = weather[time_index_06].parameters.map(a => a.name);
        var temp_index06 = parameterIndex06.indexOf('t');
        var wind_index06 = parameterIndex06.indexOf('ws');
        var cloud_index06 = parameterIndex06.indexOf('tcc_mean');

        timeData.innerHTML = weather[time_index_06].validTime.slice(11,16);
        tempData.innerHTML = weather[time_index_06].parameters[temp_index06].values[0];
        windData.innerHTML = weather[time_index_06].parameters[wind_index06].values[0] + weather[time_index_06].parameters[wind_index06].unit;
        skyData.innerHTML = weather[time_index_06].parameters[cloud_index06].values[0];
        
        WEATHER_TABEL.appendChild(weatherRow);
        weatherRow.appendChild(timeData);
        weatherRow.appendChild(tempData);
        weatherRow.appendChild(windData);
    }

    //Skapar raden för kl12
    if (time_index_12>=0) {
        var parameterIndex12 = weather[time_index_12].parameters.map(a => a.name);
        var temp_index12 = parameterIndex12.indexOf('t');
        var wind_index12 = parameterIndex12.indexOf('ws');
        var cloud_index12 = parameterIndex12.indexOf('tcc_mean');

        timeData.innerHTML = weather[time_index_12].validTime.slice(11,16);
        tempData.innerHTML = weather[time_index_12].parameters[temp_index12].values[0];
        windData.innerHTML = weather[time_index_12].parameters[wind_index12].values[0] + weather[time_index_12].parameters[wind_index12].unit;
        skyData.innerHTML = weather[time_index_12].parameters[cloud_index12].values[0];
        
        WEATHER_TABEL.appendChild(weatherRow);
        weatherRow.appendChild(timeData);
        weatherRow.appendChild(tempData);
        weatherRow.appendChild(windData);
    }
     
    //Skapar raden för kl18
    if (time_index_18>=0){
        var parameterIndex18 = weather[time_index_18].parameters.map(a => a.name);
        var temp_index18 = parameterIndex18.indexOf('t');
        var wind_index18 = parameterIndex18.indexOf('ws'); 
        var cloud_index18 = parameterIndex18.indexOf('tcc_mean');

        timeData.innerHTML = weather[time_index_18].validTime.slice(11,16);
        tempData.innerHTML = weather[time_index_18].parameters[temp_index18].values[0];
        windData.innerHTML = weather[time_index_18].parameters[wind_index18].values[0] + weather[time_index_18].parameters[wind_index18].unit;
        skyData = weather[time_index_18].parameters[cloud_index18].values[0];

        
        if (skyData<=2) {
            skyData= 'Klart'
        } else if (skyData>2 && skyData<=5){
            skyData='Enstaka moln'
        } else {
            skyData='Molnigt'
        }
        
        WEATHER_TABEL.appendChild(weatherRow);

        weatherRow.appendChild(timeData);
        weatherRow.appendChild(tempData);
        weatherRow.appendChild(windData);
        weatherRow.appendChild(document.createTextNode(skyData));
    }*/