
const geoLocation = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = data => {
    const cityDetails = data.cityDetail;
    const weather = data.weather;
     
    //const { cityDetails, weather } = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div    `

    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);


    let timeSrc = null;
    if (weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
}



geoLocation.addEventListener("submit", e => {
    e.preventDefault();
    
    // Get City Value
    const city = geoLocation.city.value.trim();
    geoLocation.reset();

    // Update UI with requested city
    forecast.updateCity(city)
        .then(data => {
            updateUI(data);
        })
        .catch(err => {
            console.log(err);
        })
    // set local storage
    localStorage.setItem('city', city)

});

if (localStorage.city) {
    forecast.updateCity(localStorage.city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    };
