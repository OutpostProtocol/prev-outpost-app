export const shortenAddress = (address, digits = 4) => {
  return `${address.substring(0, digits + 2)}...${address.substring(42 - digits)}`
}
