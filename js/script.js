// Variáveis e seleção de elementos
const api ="cbd22d33bb13bffeae2b324d5d1059bf";
const country = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector('#city-input');
const search = document.querySelector('#search');

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector('#weather-data')

const errorMessageContainer = document.querySelector("#error-message");


// Funções

const getWeatherData = async(city) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}&lang=pt_br`

    const res = await fetch(apiWeatherURL);
    const data = await res.json();


    return data;
}

// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
};

const showWeatherData = async (city) =>{
    hideInformation();
    const data = await getWeatherData(city);

    if (data.cod === "404") {
        showErrorMessage();
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryElement.setAttribute("src", country + data.sys.country)
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    // Change bg image

    weatherContainer.classList.remove("hide")
}

// Eventos
search.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value

        showWeatherData(city)
    }
})