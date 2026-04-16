import React, { useState, useEffect } from 'react'
import useWeatherInfo from '../hooks/useWeatherInfo'
import useAutoLocationSearch from '../hooks/useAutoLocationSearch';
import { useDispatch } from 'react-redux'
import { setCurrentWeatherData } from '../store/weatherSlice';
import { AutoSearchCard } from './index'

function SearchContainer() {
    const [location, setLocation] = useState('');
    const [currentLocation, setCurrentLocation] = useState('new delhi');
    const weatherData = useWeatherInfo(currentLocation);
    const autoLocationSearchData = useAutoLocationSearch(location);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const dispatch = useDispatch();

    const getWeather = () => {
        if (location.trim() !== '') {
            setCurrentLocation(location.trim());
            setLocation('');
            setShowSuggestions(false) 
        }
    };

    // Re-fetch the weather for the current location
    const refreshWeather = () => {
        setCurrentLocation(prevLocation => (prevLocation + " "));
    };
    // adding " " at the end to change the state of currentLocation with the same location, passing same location implicitly will not change the state

    // dispatching current weather data into store
    useEffect(() => {
        if (weatherData) {
            dispatch(setCurrentWeatherData(weatherData))
        }
    }, [weatherData, location, currentLocation])

    // auto-search location click handler
    const locationClickHandler = (e) => {
        let selectedLocation = e.target.innerText
        setCurrentLocation(selectedLocation);
        setLocation('')
        setShowSuggestions(false) // stop showing suggestions now
    }

    // storing and restoring data in local-storage
    //restoring
    useEffect(() => {
        const oldLocation = localStorage.getItem("currentLocation")
        if (oldLocation) {
            setCurrentLocation(oldLocation);
        }
    }, [])

    // storing
    useEffect(() => {
        localStorage.setItem("currentLocation", currentLocation)
    }, [currentLocation])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getWeather();
        }
    };

    return (
        <div className="animate-fade-in">
            <div className='text-center my-5 mt-10'>
                <p className='text-white/50 text-sm font-light tracking-wide'>
                    Enter your location &
                    <span className='gradient-text font-medium'> Stay Updated!</span>
                </p>
            </div>
            <div className="flex flex-col items-center gap-3 px-4">
                <div className="flex flex-col items-center md:flex-row gap-3">
                    <input
                        id="search-field"
                        type="text"
                        spellCheck="false"
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value)
                            setShowSuggestions(true) // start showing suggestions again
                        }}
                        onKeyDown={handleKeyDown}
                        className="search-input"
                        placeholder="Search for a city..."
                        autoComplete='off'
                    />
                    <div className="flex gap-2">
                        <button onClick={getWeather} className="btn-primary">
                            Search
                        </button>
                        <button onClick={refreshWeather} className="btn-secondary">
                            Refresh
                        </button>
                    </div>
                </div>
                {showSuggestions && (
                    <AutoSearchCard autoSearchData={autoLocationSearchData} onClickHandler={locationClickHandler} />
                )}
            </div>
        </div>
    )
}

export default SearchContainer;
