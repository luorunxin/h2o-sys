import Axios from 'axios'
import BASEURL from '@/utils/baseURL.js'
import Storage from '@/utils/storage.js'
import { Notification } from 'element-ui'
import router from '@/router/index.js'

let axios = Axios.create({
  baseURL: BASEURL.sys,
  timeout: 10000
})

function getAccessToken(config) {
  return new Promise((resolve,reject) => {
    let userInfo = Storage.getLocal('user_info')
    if(!userInfo) return router.push('/login')
    let params = {
        refresh_token: userInfo.refresh_token,
        phone: userInfo.phone,
        password: userInfo.password
      }
      axios.post('/refreshToken',params).then(res => {
        if(res.data.status == 200) {
          userInfo.access_token = res.data.result.access_token
          axios.post(config.url,JSON.parse(config.data)).then(re => {
            resolve(re)
          })
          Storage.setLocal('user_info', userInfo)
        }
        if(res.data.status == 401){
          if(!Storage.getLocal('keep_pwd')){
            Notification.error({
              title: '提示',
              message: res.data.message
            })
          }
          axios.post('/logout',{phone: userInfo.phone}).then(() => {
            router.push('/login')
          }).catch(err => {reject(err)})
        }
      }).catch(err => {reject(err)})
  })
}

axios.interceptors.request.use(req => {
  let userInfo = Storage.getLocal('user_info')
  req.headers.access_token = userInfo && userInfo.access_token
  // req.headers.refresh_token = userInfo.refresh_token
  return req
},err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(res => {
  return res
},err => {
  switch (err.response.status) {
    case 401:
      return getAccessToken(err.response.config)
  }
  return Promise.reject(err.response.data)
})

export default axios