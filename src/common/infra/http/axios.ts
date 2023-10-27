import Axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { API_ROUTES } from '../../constants/routes';
import { COOKIES } from '../../constants/cookies';
import { ERROR_CODE } from '../../constants/errors';

// import { API_ROUTES, ERROR_CODE, PREFS_KEY } from '../../../utils/constants'

const baseURL =`http://localhost:9000`;
//   import.meta.env.VITE_BASE_URL !== '[VITE_BASE_URL]'
//     ? import.meta.env.VITE_BASE_URL
//     : 'http://localhost:9000'
const axios = Axios.create({
  baseURL: baseURL,
  withCredentials: true,
  responseType: 'json' as const,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
})

function requestInterceptor(config: InternalAxiosRequestConfig<any>):InternalAxiosRequestConfig<any> {
  // Authorization header
  let token

  if (config.url === API_ROUTES.refreshToken) {
    token = Cookies.get(COOKIES.refreshToken)
  } else {
    token = Cookies.get(COOKIES.accessToken)
  }

  if (token !== undefined) {
    (config.headers as AxiosHeaders).set("Authorization",`Bearer ${token}`);
    // headers = {
    //   ...config.headers,
    //   ...{ Authorization: `Bearer ${token}` },
    // }
  }

    return config

}

// Interceptor for request using AxiosRequestConfig and response
axios.interceptors.request.use(requestInterceptor)
axios.interceptors.response.use(
  (response) => {
    const cookies = response.headers['set-cookie']
    if (cookies) {
    }
    return response
  },
  (error) => {
    if (error instanceof AxiosError) {
      // Axios bug: https://github.com/axios/axios/issues/5126
      // We can not use HttpStatusCode enum, must use raw value
      if (error.response?.status === 401) {
        const data = error.response?.data
        if (data && 'data' in data) {
          const errorCode = data.data.code
          if (
            [
              ERROR_CODE.InvalidToken,
              ERROR_CODE.InvalidCredential,
              ERROR_CODE.EmailSendLimit,
              ERROR_CODE.UnverifiedOnly,
            ].includes(errorCode)
          ) {
            return Promise.reject(error)
          }
        }

        console.error(
          `Receive 401 from request:\n ${
            error.config?.url
          }\n Response : ${JSON.stringify(error.response.data)}`
        )

        if (typeof window !== 'undefined') {
          window.location.href = '/approval-request-list'
        }
      }
    }
    return Promise.reject(error)
  }
)

export default axios
