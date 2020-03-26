import Storage from '@/utils/storage.js'
export default {
  data() {
    let permissions = Storage.getLocal('user_permissions')
    if(permissions){
      let arr = {}
      permissions.forEach(item => {
        arr[item.identify] = true
      })
      permissions = arr
    }
    return {
      permissions: permissions
    }
  },
  methods: {
    /**
     *  产品参数转换成对象数组
     */
    getParameters(val) {
      let arr = []
      if(val.indexOf(';') != -1){
        val.split(';').forEach(item => {
          let obj = {}
          obj.key = item.split(':')[0]
          obj.value = item.split(':')[1]
          arr.push(obj)
        })
      }else{
        let obj = {}
        obj.key = val.split(':')[0]
        obj.value = val.split(':')[1]
        arr.push(obj)
      }
      return arr
    }
  }
}