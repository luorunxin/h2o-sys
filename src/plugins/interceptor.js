import Axios from 'axios'
import BASEURL from '@/utils/baseURL.js'

let axios = Axios.create({
  baseURL: BASEURL.sys,
  timeout: 10000
})

axios.interceptors.request.use(req => {
  console.log(req)
},err => {
  console.log(err)
})

axios.interceptors.response.use(res => {
  console.log(res)
},err => {
  console.log(err)
})

export default axios