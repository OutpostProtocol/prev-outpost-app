import Box from '3box'
import {
  useState, useEffect
} from 'react'

export const use3boxProf = (did) => {
  const [profImage, setProfImage] = useState(null)
  const [name, setName] = useState(null)

  useEffect(() => {
    const setProfile = async () => {
      const profile = await Box.getProfile(did)

      if (profile.name) {
        setName(profile.name)
      }

      const hash = profile.image ? profile.image[0].contentUrl['/'] : ''
      if (hash) {
        const imgSrc = `https://ipfs.infura.io/ipfs/${hash}`
        setProfImage(imgSrc)
      }
    }

    setProfile()
  }, [did])

  return {
    profImage,
    name
  }
}
