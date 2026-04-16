import React from 'react'

function AutoSearchCard({ autoSearchData, onClickHandler }) {

    if (autoSearchData && autoSearchData.length > 0) {
        return (
            <div className='glass-card-static w-80 p-2 animate-fade-in'>
                <div className='text-center py-1.5 text-xs text-white/30 uppercase tracking-widest font-medium'>
                    Suggestions
                </div>
                <div className='flex flex-col gap-0.5'>
                    {autoSearchData.map((locationData, index) => {
                        return (
                            <div
                                key={index}
                                onClick={onClickHandler}
                                className='suggestion-item'
                            >
                                <span className='text-white/80 font-medium'>{locationData.name}</span>
                                <span className='text-white/35'>, {locationData.country}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default AutoSearchCard