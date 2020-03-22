import Axios from 'axios'
import BASEURL from '@/utils/baseURL.js'

let axios = Axios.create({
  baseURL: BASEURL.sys,
  timeout: 10000
})

axios.interceptors.request.use(req => {
  return req
},err => {
  console.error(err)
})

axios.interceptors.response.use(res => {
  return res
},err => {
  console.error(err)
})

export default axios