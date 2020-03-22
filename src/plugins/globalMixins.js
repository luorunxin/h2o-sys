export default {
  data() {
    return {

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