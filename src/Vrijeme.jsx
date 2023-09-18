import React, { Component } from "react";

class Vrijeme extends Component {
  state = {
    city: "",
    weatherData: null,
    error: null,
  };

  handleChange = (e) => {
    this.setState({ city: e.target.value });
  };

  fetchWeatherData = () => {
    const { city } = this.state;
    const apiKey = "d0df035f183da18c44e84e512b971bac";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          data.main.temp = Math.round(data.main.temp);
          this.setState({ weatherData: data, error: null });
        } else {
          this.setState({ weatherData: null, error: "City not found" });
        }
      })
      .catch((error) => {
        console.error("Pogreška pri dohvačanju podataka:", error);
        this.setState({ weatherData: null, error: "Error fetching data" });
      });
  };

  render() {
    const { city, weatherData, error } = this.state;

    return (
      <div className="p-4 border rounded-md shadow-md max-w-full">
        <h2 className="text-base md:text-lg font-semibold mb-2">
          Informacije o vremenu
        </h2>
        <div className="flex flex-wrap space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Unesite grad"
            className="border px-2 py-1 rounded-md flex-grow w-11/12 sm:w-2/3"
            value={city}
            onChange={this.handleChange}
          />
          <button
            onClick={this.fetchWeatherData}
            className="bg-pink-600 text-white px-2 py-1 rounded-md border text-sm w-full sm:w-1/3">
            Dohvati
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {weatherData && (
          <div className="mt-4">
            <h3 className="text-base md:text-lg font-semibold">
              Vrijeme u {weatherData.name}, {weatherData.sys.country}
            </h3>
            <p className="text-sm md:text-base">
              Temperatura: {weatherData.main.temp}°C
            </p>
            <p className="text-sm md:text-base">
              Vrijeme: {weatherData.weather[0].description}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Vrijeme;
