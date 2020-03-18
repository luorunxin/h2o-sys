import Vue from 'vue'

/**
 *  日期转换
 */
Vue.filter('date', (val,format) => {
  let value = val
  if(value) {
    let date = new Date(val)
    let [yyyy,MM,dd,hh,mm,ss] = [
      date.getFullYear(),
      date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1,
      date.getDate()<10?'0'+date.getDate():date.getDate(),
      date.getHours()<10?'0'+date.getHours():date.getHours(),
      date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes(),
      date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()
    ]
    if(format) {
      if(format.indexOf('yyyy') != -1){
        format = format.replace(/yyyy/g, yyyy)
      }
      if(format.indexOf('MM') != -1){
        format = format.replace(/MM/g, MM)
      }
      if(format.indexOf('dd') != -1){
        format = format.replace(/dd/g, dd)
      }
      if(format.indexOf('hh') != -1){
        format = format.replace(/hh/g, hh)
      }
      if(format.indexOf('mm') != -1){
        format = format.replace(/mm/g, mm)
      }
      if(format.indexOf('ss') != -1){
        format = format.replace(/ss/g, ss)
      }
      value = format
    }else{
      value = [yyyy,MM,dd].join('-') +' '+ [hh,mm,ss].join(':')
    }
  }
  return value
})