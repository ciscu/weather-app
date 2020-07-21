
class Forecast{
    constructor(){
        this.key = "Enter your api key here";
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/'; 
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city) {
        const cityDetail = await this.getCity(city);
        const weather = await this.getWeatherCondition(cityDetail.Key);
        return {
            cityDetail,
            weather
        };
    }
    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    async getWeatherCondition(locationKey){ 
        const query = `${locationKey}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
}

