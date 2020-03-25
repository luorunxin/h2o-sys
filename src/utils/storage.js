export default {
  setSession: (key,value) => {
    sessionStorage.setItem(key,JSON.stringify(value))
  },
  getSession: key => {
    return JSON.parse(sessionStorage.getItem(key))
  },
  removeSession: key => {
    sessionStorage.removeItem(key)
  },
  setLocal: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getLocal: key => {
    return JSON.parse(localStorage.getItem(key))
  },
  removeLocal: key => {
    localStorage.removeItem(key)
  }
}