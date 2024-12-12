import axios from 'axios'
import { API_BASE_URL } from '../common/constants'

const frameToken = (token) => `Bearer ${token}`

const frameResponse = (
  reqStatus = 0,
  reqPayload = 'Invalid request. Please try again later.'
) => {
  return {
    status: reqStatus,
    payload: reqPayload,
  }
}

export const signUpApi = async (
  firstName,
  lastName,
  username,
  phone,
  emailId,
  password
) => {
  let response = frameResponse()
  try {
    const url = `${API_BASE_URL}/user/signup`
    const apiResponse = await axios.post(url, {
      firstName,
      lastName,
      username,
      phone,
      emailId,
      password,
    })
    if (apiResponse.status === 200) {
      response = frameResponse(1)
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message)
    }
    console.log(err)
  } finally {
    return response
  }
}
//integrate the verifyemail api
export const verifyEmailApi = async (token) => {
  let response = frameResponse()

  try {
    const url = `${API_BASE_URL}/user/verify/email`
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    })

    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data)
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message)
    }
    console.log(err)
  } finally {
    return response
  }
}

// Integrate resetEmailLink Api
export const resetEmailLinkApi = async (emailId) => {
  let response = frameResponse()
  try {
    const url = `${API_BASE_URL}/user/reset/${emailId}`
    const apiResponse = await axios.get(url)
    if (apiResponse.status === 200) {
      response = frameResponse(1)
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message)
    }
    console.log(err)
  } finally {
    return response
  }
}

export const resetPasswordApi = async (token, password) => {
  // setting the insital value of status to 0 and payload to "invalid request. please try again later"
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/reset?password=${password}`;
    const headers = { headers: { Authorization: frameToken(token) } };
// in POST the second paramater is body, since we dont have it, its set to null
    const apiResponse = await axios.post(url, null, headers);


    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};
