import React, {useEffect, useState} from 'react'
import P from 'prop-types'

import './styles.styl'


export default function Background({ mapName }) {
  const imgURL = `http://tempus.site.nfoservers.com/web/screenshots/raw/${mapName}_1080p.jpeg`
  const [imgLoaded, setImgLoaded] = useState(false)
  useEffect(() => {
    let unmounted = false
    const image = new Image()
    image.onload = () => {
      if (!unmounted)
        setImgLoaded(true)
    }
    image.src = imgURL
    return () => unmounted = true
  }, [mapName])

  const styles = {
    opacity: 0
  }
  if (imgLoaded) {
    styles.backgroundImage = `url(${imgURL})`
    styles.opacity = 100
  }
  return (
    <div className="MapOverview-background" style={ styles } />
  )
}


Background.propTypes =
  { mapName: P.string.isRequired
  }
