import React from 'react';

const TimeAndLocation = ({ data }) => {

    const dt = data.dt;
    let day = new Date(dt * 1000);

    return (
        <div>
            <div className='flex items-center justify-center my-6'>
                <p className='text-pink-200 text-2xl font-semibold shadow-md text-center px-2 py-4'>{day.toDateString()}</p>
            </div>
            <div className='flex items-center justify-center my-3'>
                <p className='text-white text-4xl font-medium'>{data.name}, {data.sys.country}</p>
            </div>
        </div>
    )
}

export default TimeAndLocation;