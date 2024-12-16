import React, { useState, useEffect } from 'react'
import {
  getFavouriteCitiesApi,
  deleteFavouriteCityApi,
} from '../../util/ApiUtil'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import TokenExpirationPage from '../TokenExpirationPage/TokenExpirationPage'
import DisplayFavouriteCity from './DisplayFavouriteCity'
import NoFavouriteCityPresent from './NoFavouriteCityPresent'
import toast from 'react-hot-toast'

const FavouriteCities = ({ currentUser }) => {
  const [loading, setLoading] = useState(false)
  const [tokenExpired, setTokenExpired] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [results, setResults] = useState([])
  const [data, setData] = useState(false)

  const onDeleteButton = async (favouriteCityId) => {
    const response = await deleteFavouriteCityApi(
      currentUser.token,
      favouriteCityId
    )
    if (response.status === 1) {
      setData(false)
      toast('user deleted successfully')
    } else {
      setData(true)
      toast(response.payLoad)
    }
  }

  useEffect(() => {
    setLoading(true)
    getFavouriteCitiesApi(currentUser.token)
      .then((res) => {
        setTimeout(() => {
          setData(true)
          setResults(res.payLoad)
          setLoading(false)
        }, 100)
      })
      .catch((err) => {
        setLoading(false)
        setErrorMsg(err)
        if (err.response.data.httpStatusCode === 401) {
          setTokenExpired(true)
        }
      })
  }, [data])

  // error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('')
    }, 3000)
    // clear timer
    return () => clearTimeout(timer)
  }, [errorMsg])

  if (tokenExpired) {
    return <TokenExpirationPage />
  }

  if (loading) {
    return (
      <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <div>
          <LoadingIndicator />
        </div>
      </div>
    )
  }

  if (results?.favouriteCities?.length === 0) {
    return (
      <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <div>
          <NoFavouriteCityPresent />
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ga-4 p-4'>
      {results?.favouriteCities?.map((item, index) => (
        <div
          key={index}
          className='bg-black/20 text-purple-900 backdrop-blur-[80px] py-12 px-6 rounded-lg overflow-hidden'
        >
          <DisplayFavouriteCity
            apiResponse={item}
            onDeleteButton={onDeleteButton}
          />
        </div>
      ))}
    </div>
  )
}

export default FavouriteCities
