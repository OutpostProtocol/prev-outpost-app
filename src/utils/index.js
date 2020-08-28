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
