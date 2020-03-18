import Axios from "./interceptor.js"

export default {
  install: vue => {
    vue.prototype.$ajax = function(url, data, method, headers) {
      if (!url) {
        return console.error("请求url错误: ", url)
      }
      let options = {
        method: method || "post",
        url,
        data,
        headers: Object.assign(
          {
            "Content-Type": "application/json;charset=utf-8"
          },
          headers
        )
      };
      return new Promise((resovle, reject) => {
        Axios(options)
          .then(res => {
            resovle(res.data);
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}