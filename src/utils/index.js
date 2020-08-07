export const shortenAddress = (address, digits = 4) => {
  return `${address.substring(0, digits + 2)}...${address.substring(address.length - digits)}`
}

export const getBackPath = (location) => {
  return (location.state && location.state.from) ? location.state.from : '/'
}

export const getId = (location, delimeter) => {
  let id = location.href.split(delimeter)[1]
  id = id.replace('/', '')
  return id
}
