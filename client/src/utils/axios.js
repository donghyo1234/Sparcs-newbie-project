import _axios from "axios"

export const axios = _axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.BACKEND_URL,
  timeout: 2000,
  withCredentials: true,
})