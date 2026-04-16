import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from "react-router-dom";

function Header() {
  const currentWeatherData = useSelector((state) => state.weather.currentWeatherData)

  let isday = true; // default value
  if (currentWeatherData && currentWeatherData.current) {
    isday = Boolean(currentWeatherData.current.is_day)
  }

  const emoji = isday ? '☀️' : '🌙';

  return (
    <header className='glass-card-static lg:mx-5 mt-4 mb-6 px-4 py-3 md:px-6 md:py-4'>
      <nav className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0'>
        <h1 className='flex items-center gap-3'>
          <Link to="/" className='font-display text-2xl md:text-3xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity duration-200'>
            Weather
            <span className='gradient-text'> Updates</span>
            <span className='ml-2 text-2xl'>{emoji}</span>
          </Link>
        </h1>
        <div className='flex items-center gap-1'>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active text-emerald-300" : "text-slate-200 hover:text-white"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active text-emerald-300" : "text-slate-200 hover:text-white"}`
            }
          >
            Compare
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header