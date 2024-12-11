import axios from "axios";
import { API_BASE_URL } from "../common/constants";

const frametoken = (token) => `Bearer ${token}`;

const frameResponse = (
  reqStatus = 0,
  reqPayload = "Invalid request. Please try again later."
) => {
  return {
    status: reqStatus,
    payload: reqPayload,
  };
};
export const signUpApi = async (
  firstName,
  lastName,
  username,
  phone,
  emailId,
  password
) => {
  let response = frameResponse();
  try {
    const url =  `${API_BASE_URL}/user/signup`;
    const apiResponse = await axios.post( url,  {
       firstName,
       lastName,
       username,
       phone,
       emailId,
       password,
    });
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
