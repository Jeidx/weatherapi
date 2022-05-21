
const weatherBlock = document.querySelector('#weather');
const selected = document.querySelector('#select');
const start =  document.querySelector('.start');

const choseCity = document.querySelector('.opt');

let towns = [
    {name: "Lviv"},
    {name: "Kyiv"},
    {name: "London"},
    {name: "Zaporizhzhia"},
    {name: "Moscow"},
    {name: "Miami"},
    {name: "Kozenca"},
    {name: "Tokyo"}
];
selected.innerHTML = towns.map(e => {return `<option class="opt" value="${e.name}">${e.name}</option>`})


start.addEventListener('click',

async function loadWeather(e){
    const select = document.querySelector('#select').value;
    weatherBlock.innerHTML = `
        <div class="weather__loading>
            <img src="img/loading.gif" alt="Loading...">
        </div>`;
    
        const server = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="+`${select}`+"&appid=54a1e7aa21541b78ca56e5af1759b21b";
        console.log(server);
 

    const response = await fetch(server, {
        method: 'GET',
    });
    const responseResult = await response.json();
    
    if(response.ok){
        getWeather(responseResult);
    }else{
        weatherBlock.innerHTML = responseResult.message;
    }    
}
);
function getWeather(data){
    // console.log(data);
    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;


    const template = `
        <div class="weather__main">
        <div class="weather__city">${location}</div>
        <div class="weather__status">${weatherStatus}</div>
        </div>
        <div class="weather__icon">
            <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
        </div>
        </div>
        <div class="weather__temp">${temp}</div>
        <div class="weather__feels-like">Feels like: ${feelsLike}</div>`;

        weatherBlock.innerHTML = template;

}

// if (weatherBlock){
//     loadWeather();
// }