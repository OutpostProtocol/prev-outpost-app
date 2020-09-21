export const shortenAddress = (address, digits = 4) => {
  return `${address.substring(0, digits + 2)}...${address.substring(address.length - digits)}`
}

export const getBackPath = (location) => {
  return (location.state && location.state.from) ? location.state.from : '/'
}

export const getId = (location, delimeter) => {
  if (!location.href) return null
  let id = location.href.split(delimeter)[1]
  id = id.replace('/', '')
  return id
}

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const isMobile = () => {
  if (typeof navigator === 'undefined') return false
  return /Mobi|Android/i.test(navigator.userAgent)
}

export const isProduction = () => {
  return process.env.NODE_ENV === 'production'
}

export const isValidURL = (url) => {
  const link = document.createElement('a')
  link.href = url
  return link.host && link.host !== window.location.host
}

export const storageAvailable = (type) => {
  var storage
  try {
    storage = window[type]
    var x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0)
  }
}
