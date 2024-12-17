import React, { useState, useEffect } from 'react'
import NoHistoryWeatherPresent from './NoHistoryWeatherPresent'
import toast from 'react-hot-toast'
import { getHistoryWeatherDataApi } from '../../util/ApiUtil'
import DisplayWeatherData from '../CurrentWeatherData/DisplayWeatherData'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'

import TokenExpirationPage from "../TokenExpirationPage/TokenExpirationPage";

const HistoryWeatherData = ({ currentUser }) => {
  const [results, setResults] = useState([])
  const [tokenExpired, setTokenExpired] = useState(false)
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyResults()
  }, [])

  const getMyResults = async () => {
    setLoading(true)
    const apiResponse = await getHistoryWeatherDataApi(currentUser.token)
    console.log(apiResponse)
    if (apiResponse.status === 1 && apiResponse.payLoad.length > 0) {
      setResults(apiResponse.payLoad)
      console.log(results)
      setData(true)
      setLoading(false)
    } else if (apiResponse.status === 1 && apiResponse.payLoad.length === 0) {
      setData(false)
      setLoading(false)
    } else if (
      apiResponse.status === 0 &&
      apiResponse.payLoad === 'Token has Expired'
    ) {
      setTokenExpired(true)
      setLoading(false)
    } else {
      toast(apiResponse.payLoad)
    }
  }

  if (loading) {
    return <LoadingIndicator />
  }

//if the session has expired render TokenExpirationPage
if (tokenExpired) {
  return <TokenExpirationPage />;
}
  if (data === false) {
    return (
      <div flex items-center justify-center>
        <NoHistoryWeatherPresent />
      </div>
    )
  } else {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ga-4 p-4'>
        {results.map((item, index) => (
          <div
            key={index}
            className='bg-black/20 text-purple-900 backdrop-blur-[80px] py-12 px-6 rounded-lg overflow-hidden'
          >
            <DisplayWeatherData apiResponse={item} currentUser={currentUser.token}/>
          </div>
        ))}
      </div>
    )
  }
}

export default HistoryWeatherData
