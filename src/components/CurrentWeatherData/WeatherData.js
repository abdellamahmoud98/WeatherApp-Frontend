import React, { useState, useEffect } from "react";

// Import the IoMdSearch icon from the react-icons/io library to be used in search bar
import { IoMdSearch } from "react-icons/io";

// Import the LoadingIndicator component to be used when weather data is being loaded
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

// Import the DisplayWeatherData component to be used when weather data is ready to be displayed
import DisplayWeatherData from "./DisplayWeatherData";

// Import the getWeatherDataApi function from the ApiUtil file
import { getWeatherDataApi } from "../../util/ApiUtil";



const WeatherData = () => {
  // - data: used to store weather data fetched from the API
  const [data, setData] = useState(null);
  // - location: used to track the current location for which to fetch weather data
  const [location, setLocation] = useState("toronto");
  // - inputValue: used to track the value of the user's search input
  const [inputValue, setInputValue] = useState ("");
  // - animate: used to trigger animation effects when data is updated
  const [animate, setAnimate] = useState(false);
  // - loading: used to track whether or not a weather data fetch is currently in progress
  const [loading, setLoading] = useState(false);
  // - errorMsg: used to store any error message returned from the API
  const [errorMsg, setErrorMsg] = useState("");
  // - tokenExpired: used to track whether or not the user's authentication token has expired
  const [tokenExpired, setTokenExpired] = useState(false);
  // the default weather which comes up in Weather record don't save to database
  const [save, setSave] = useState(false);



  // Define the handleInput this for the search bar 
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };


  const handleSubmit = (e) => {
    // if input value is not empty
    if (inputValue !== "") {

    // set location
    setLocation (inputValue); 
    setSave(true); // save the weather record to the database when user search for a city
    }

    // select input
    const input = document. querySelector ("input");

    // if input value is empty
    if (input.value === "") 
    toast("Please enter a city name");
    // set animate to true
    setAnimate(true);
    // after 500 ms set animate to false
    setTimeout(() => {
      setAnimate(false);
    }, 500);

    // clear input
    input.value = "";
    // prevent defaults
    e. preventDefault();
    };
   



//   // fetch the data
// useEffect (() => {
//   // set loading to true
//   setLoading (true) ;

//   getWeatherDataApi(currentUser.token, location, save)
//    .then ((res) => {
//   // set the data after 100 ms
//   setTimeout (() => {
//     setData (res.data) ;

//   // set loading to false
//   setLoading(false);
//    }, 100);
//   })
//   .catch ((err) => { 
//   setLoading(false);
//   setErrorMsg(err);
//   console.log(err);
//   if (err.response.data.httpStatusCode === 401){
//     setTokenExpired(true);
//   }
//   }) ;
// }, [location]);


// // error message
// useEffect(() => {
//   const timer = setTimeout(() => {
//   setErrorMsg("");
// }, 3000);
//   // clear timer
//   return () => clearTimeout (timer);
//   }, [errorMsg]);


//   // if data is false show the loading icon
  
  
// }
}
export default WeatherData;