import React from "react";
import axios from "axios";
import { useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import TimeAndLocation from "./components/TimeAndLocation.jsx";
import TemperatureAndDetails from "./components/TemperatureAndDetails.jsx";
import Spinner from "./components/Spinner";

let num;

const App = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.REACT_APP_WEATHER_KEY}`;
    let thresHold = 0;

    const fetchWeather = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .get(url)
            .then((response) => {
                setWeather(response.data);
                thresHold = ((response.data.main.temp - 32) * 5) / 9;
                formatBackground(thresHold);
                console.log(thresHold);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setCity("");
        setLoading(false);
    };

    const handleClick = (e) => {
        e.preventDefault();
        fetchWeather(e);
    };

    const formatBackground = (n) => {
        if (n) {
            num = n;
        }
        if (num > 28) {
            return "from-yellow-700 to-orange-700";
        } else {
            return "from-cyan-700 to-blue-700";
        }
    };

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div className="App">
                <div
                    className={`mx-auto max-w-screen-md mt-20 mb-6 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-800 rounded-md ${formatBackground(0)}`}
                >
                    <div className="flex flex-row justify-center my-6">
                        <div className="flex flex-row w-3/4 justify-center items-center space-x-4">
                            <form className="w-[100%]" onSubmit={(e) => fetchWeather(e)}>
                                <input
                                    type="text"
                                    className="text-xl font-light p-2 w-full shadow-xl rounded-md capitalize placeholder:lowercase focus:outline-none"
                                    placeholder="!!! Search for city !!!"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </form>
                            <UilSearch
                                size={25}
                                className="text-white cursor-pointer transition ease-out hover:scale-125"
                                onClick={(e) => handleClick(e)}
                            />
                        </div>
                    </div>
                    {weather.main && <TimeAndLocation data={weather} />}
                    {weather.main && <TemperatureAndDetails data={weather} />}
                </div>
            </div>
        );
    }
};

export default App;
