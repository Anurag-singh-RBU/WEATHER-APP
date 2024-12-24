const City = document.querySelector('input');

const Key = 'fd48517c7fba433b8d109d7e38af421c';

const DnT = document.getElementById('realTime');
const temp = document.getElementById('celcius');
const rh = document.getElementById('RH');
const wind = document.getElementById('hawa');
const Prep = document.getElementById('prep');
const pollution = document.getElementById('aqi');

async function fetchData(){

    try{

        const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${City.value.trim()}&key=${Key}`);

        if(!response.ok){

            throw new error("Could not fetch resource");

        }

        const data = await response.json();
        const Temp = data.data[0].app_temp;
        const AQI = data.data[0].aqi;
        const Humidity = data.data[0].rh;
        const pani = data.data[0].precip;
        const Wind = ((data.data[0].wind_spd)*3.6).toFixed(2);
        const secs = data.data[0].ts * 1000;
        const date = new Date(secs);
        const timezone = data.data[0].timezone;
        const options = {
          weekday: 'long', 
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',   
          minute: '2-digit', 
          second: '2-digit', 
          timeZone: timezone, 
          timeZoneName: 'short' 
        };

        const localTimeFormatter = new Intl.DateTimeFormat('en-US', options);
        const localTime = localTimeFormatter.format(date);

        DnT.innerText = localTime.split("G")[0];
        temp.innerText =  "Temperature : " + Temp + " degrees";
        rh.innerText = "Humidity : " + Humidity + " %";
        wind.innerText = "Wind : " + Wind + " km/hr";
        Prep.innerText = "Precipitation : " + pani + " %";
        pollution.innerText = "AQI : " + AQI;

    }

    catch(error){

        console.error(error);

    }

}