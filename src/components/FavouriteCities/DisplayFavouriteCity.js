import React from 'react'
import { TbWorldLatitude, TbWorldLongitude } from 'react-icons/tb'
import { FiTrash2 } from 'react-icons/fi'

const DisplayFavouriteCity = ({ apiResponse, onDeleteButton }) => {
  const { favouriteCityId, city, createdOn } = apiResponse

  return (
    <div className='weather-card border p-6 rounded-lg shadow-lg'>
      {/* Card Top */}
      <div className='flex items-center gap-x-5'>
        <div>
          <div className='text-2xl font-semibold'>
            {city.name}, {city.country.countryCode}
          </div>
        </div>
      </div>

      {/* Card Bottom */}
      <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-x-2'>
            <TbWorldLatitude className='text-[20px]' />
            <div>
              Latitude<span className='ml-2'>{city.latitude}</span>
            </div>
          </div>
          <div className='flex items-center gap-x-2'>
            <TbWorldLongitude className='text-[20px]' />
            <div>
              Longitude<span className='ml-2'>{city.longitude}</span>
            </div>
          </div>

          <div className='flex items-center gap-x-2'>
            <div>Last Updated: {createdOn}</div>
          </div>
        </div>

        <div className='flex items-center gap-x-5'>
          <FiTrash2
            className='text-[20px] cursor-pointer'
            onClick={() => onDeleteButton(favouriteCityId)}
          />
        </div>
      </div>
    </div>
  )
}

export default DisplayFavouriteCity
