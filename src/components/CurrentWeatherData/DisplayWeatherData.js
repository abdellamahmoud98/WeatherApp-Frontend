import React, { useState, useEffect } from 'react'
import { BsEye, BsThermometer, BsWater, BsWind } from 'react-icons/bs'
import {
  WiCelsius,
  WiSunrise,
  WiSunset,
  WiWindDeg,
  WiBarometer,
  WiDegrees,
} from 'react-icons/wi'

import { TbWorldLatitude, TbWorldLongitude } from 'react-icons/tb'
import { FiStar } from 'react-icons/fi'
import {
  createFavouriteCityApi,
  getFavouriteCitiesApi,
} from '../../util/ApiUtil'
import toast from 'react-hot-toast'

const DisplayWeatherData = ({ apiResponse, currentUser }) => {
  // Extract necessary data
  const {
    city,
    icon,
    updatedOn,
    temp,
    description,
    cloudsAll,
    visibility,
    feelsLike,
    humidity,
    windSpeed,
    tempMin,
    tempMax,
    sunrise,
    sunset,
    windDirection,
    pressure,
  } = apiResponse

  // Generate icon URL
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`

  const [isFavouriteCity, setIsFavouriteCity] = useState(false)

  const [favData, setFavData] = useState([])

  const onAddFavouriteCity = async (favouriteCityId) => {
    const response = await createFavouriteCityApi(currentUser, favouriteCityId)

    if (response.status === 1) {
      toast(
        'The city has been added to your favourite. You can now view it on your favourite cities page'
      )
    } else {
      toast(response.payLoad)
    }
  }

  const getFavouriteCity = async (currentUser) => {
    getFavouriteCitiesApi(currentUser)
      .then((res) => {
        console.log(res, 'res')
        setFavData(res.payLoad)
        console.log(favData)
      })
      .catch((err) => {
        toast(err.response.data)
      })
  }

  useEffect(() => {
    getFavouriteCity(currentUser)
  }, [favData])

  useEffect(() => {
    setTimeout(() => {
      if (favData?.favouriteCities) {
        checkIfCityFavourite(city.cityId)
      }
    }, 1000)
  }, [favData, city.cityId])

  const checkIfCityFavourite = (cityId) => {
    const isFavourite = favData?.favouriteCities.some(
      (val) => val.city?.cityId === cityId
    )
    setIsFavouriteCity(isFavourite)
  }

  return (
    <div className='weather-card border p-6 rounded-lg shadow-lg'>
      {/* Card Top */}
      <div className='flex items-center gap-x-5'>
        <div className='text-[87px]'>
          <img src={iconUrl} alt='Weather Icon' />
        </div>
        <div>
          <div className='text-2xl font-semibold'>
            {city.name}, {city.country.countryCode}
          </div>
          <div>Last Updated: {updatedOn}</div>
        </div>

        <div className='mx-40'>
          <FiStar
            className={`text-[20px] ${
              isFavouriteCity ? 'fill-yellow-300' : 'fill-blue-500'
            } cursor-pointer`}
            onClick={() => onAddFavouriteCity(city.cityId)}
          />
        </div>
      </div>

      {/* Card Body */}
      <div className='my-20'>
        <div className='flex justify-center items-center'>
          <div className='text-[144px] leading-none font-light'>
            {parseInt(temp)}
          </div>
          <div className='text-6xl'>
            <WiCelsius />
          </div>
        </div>
        <div className='capitalize text-center'>
          {description}
          <br />
          Cloudiness {cloudsAll} %
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
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center gap-x-2'>
            <BsEye className='text-[20px]' />
            <div>
              Visibility<span className='ml-2'>{visibility / 1000} km</span>
            </div>
          </div>
          <div className='flex items-center gap-x-2'>
            <BsThermometer className='text-[20px]' />
            <div className='flex'>
              Feels like
              <div className='flex ml-2 text-3xl'>
                {parseInt(feelsLike)}
                <WiCelsius />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center gap-x-2'>
            <BsWater className='text-[20px]' />
            <div>
              Humidity<span className='ml-2'>{humidity} %</span>
            </div>
          </div>
          <div className='flex items-center gap-x-2'>
            <BsWind className='text-[20px]' />
            <div>
              Wind Speed<span className='ml-2'>{windSpeed} m/s</span>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center gap-x-2'>
            <BsThermometer className='text-[20px]' />
            <div className='flex'>
              Min Temp
              <div className='flex ml-2 text-3xl'>
                {parseInt(tempMin)}
                <WiCelsius />
              </div>
            </div>
          </div>
          <div className='flex items-center gap-x-2'>
            <BsThermometer className='text-[20px]' />
            <div className='flex'>
              Max Temp
              <div className='flex ml-2 text-3xl'>
                {parseInt(tempMax)}
                <WiCelsius />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center gap-x-2'>
            <WiSunrise className='text-[20px]' />
            <div>
              Sunrise
              <div className='flex ml-2 text-1xl'>
                {new Date(sunrise).toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className='flex items-center gap-x-2'>
            <WiSunset className='text-[20px]' />
            <div>
              Sunset
              <div className='flex ml-2 text-1xl'>
                {new Date(sunset).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center gap-x-2'>
            <WiWindDeg className='text-[20px]' />
            <div className='flex'>
              Wind Direction
              <div className='flex ml-2 text-1xl'>
                {windDirection}
                <WiDegrees />
              </div>
            </div>
          </div>
          <div className='flex items-center gap-x-2'>
            <WiBarometer className='text-[20px]' />
            <div className='flex'>
              Pressure
              <div className='flex ml-2 text-1xl'>{pressure} hPa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayWeatherData
