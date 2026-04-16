import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMultipleWeatherData } from '../store/weatherSlice';
import useMultipleWeatherInfo from '../hooks/useMultipleWeatherInfo';
import { AutoSearchCard } from './index'
import useAutoLocationSearch from '../hooks/useAutoLocationSearch';

function MultipleSearch() {
    const [inputLocation, setInputLocation] = useState('');
    const [locationList, setLocationList] = useState([])
    const multipleWeatherData = useMultipleWeatherInfo(locationList);
    const autoLocationSearchData = useAutoLocationSearch(inputLocation);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const dispatch = useDispatch();

    const getMultipleWeather = () => {
        if (inputLocation.trim() !== '') {
            let refinedList = locationList.filter((location) => (
                location.toLowerCase() !== inputLocation.toLowerCase() ||
                !(location.toLowerCase().startsWith(inputLocation.toLowerCase())) ||
                !(inputLocation.toLowerCase().startsWith(location.toLowerCase()))
            ))
            setLocationList([...refinedList, inputLocation])
            setInputLocation('')
            setShowSuggestions(false)
        }
    };

    const resetLocations = () => {
        setLocationList([])
    };

    // Dispatch weather data to Redux store when it updates
    useEffect(() => {
        if (multipleWeatherData) {
            dispatch(setMultipleWeatherData(multipleWeatherData));
        }
    }, [multipleWeatherData]);

    // storing and restoring data in the local storage

    // restoring
    useEffect(() => {
        const oldLocationList = JSON.parse(localStorage.getItem("locationList"));
        if (oldLocationList) {
            setLocationList(oldLocationList)
        }
    }, [])

    // storing
    useEffect(() => {
        localStorage.setItem("locationList", JSON.stringify(locationList))
    }, [locationList])

    // auto-search location click handler
    const locationClickHandler = (e) => {
        let selectedLocation = e.target.innerText
        let refinedList = locationList.filter((location) => (
            location.toLowerCase() !== selectedLocation.toLowerCase() ||
            !(location.toLowerCase().startsWith(selectedLocation.toLowerCase())) ||
            !(selectedLocation.toLowerCase().startsWith(location.toLowerCase()))
        ))
        setLocationList([...refinedList, selectedLocation])
        setInputLocation('')
        setShowSuggestions(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getMultipleWeather();
        }
    };

    return (
        <div className="animate-fade-in mb-3">
            <div className='text-center my-5 mt-10'>
                <p className='text-white/50 text-sm font-light tracking-wide'>
                    Enter multiple locations &
                    <span className='gradient-text font-medium'> Compare weather!</span>
                </p>
            </div>
            <div className="flex flex-col items-center gap-3 px-4">
                <div className="flex flex-col items-center md:flex-row gap-3">
                    <input
                        id="compare-search-field"
                        type="text"
                        spellCheck="false"
                        value={inputLocation}
                        onChange={(e) => {
                            setInputLocation(e.target.value)
                            setShowSuggestions(true)
                        }}
                        onKeyDown={handleKeyDown}
                        className="search-input"
                        placeholder="Add a city to compare..."
                        autoComplete='off'
                    />
                    <div className="flex gap-2">
                        <button onClick={getMultipleWeather} className="btn-primary">
                            Add
                        </button>
                        <button onClick={resetLocations} className="btn-secondary">
                            Reset
                        </button>
                    </div>
                </div>


                {showSuggestions && (
                    <AutoSearchCard autoSearchData={autoLocationSearchData} onClickHandler={locationClickHandler} />
                )}
            </div>
        </div>
    );
}

export default MultipleSearch;
