import React, {useEffect, useState} from 'react'
import P from 'prop-types'
import {connect} from 'react-redux'
import cx from 'classnames'
import steam from 'steamidconvert'

import {queueAvatar} from './actions'

import './styles.styl'


const Steam = steam()


const url = 'https://static.tempus.xyz/website/img/avatar_'
const defaultAvatars = {
  tiny:        url + '32x32.jpg',
  mini:        url + '32x32.jpg',
  small:       url + '32x32.jpg',
  medium:      url + '64x64.jpg',
  mediumlarge: url + '64x64.jpg',
  large:       url + '184x184.jpg'
}


function getAvatarURL(steamInfo, size) {
  if (steamInfo) {
    if (['mini', 'tiny'].includes(size)) {
      return steamInfo.avatar['small']
    }
    else if (size === 'mediumlarge') {
      return steamInfo.avatar['large']
    }
    else if (size === 'small') {
      return steamInfo.avatar['medium']
    }
    return steamInfo.avatar[size]
  }
  else {
    return defaultAvatars[size]
  }
}


function SteamAvatar({ steamID, steamID64, size, noLink, innerBorder=false, avatars, queueAvatar, style }) {
  const sid = steamID64 ? steamID64 : Steam.convertTo64(steamID)
  const steamInfo = avatars ? avatars[sid] : undefined
  const avatarURL = getAvatarURL(steamInfo, size)

  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    queueAvatar(sid)
  }, [])

  useEffect(() => {
    let unmounted = false
    if (steamInfo && !imgLoaded && !imgError) {
      const image = new Image()
      image.onload = () => { if (!unmounted) setImgLoaded(true) }
      image.onerror = () => { if (!unmounted) setImgError(true) }
      image.src = getAvatarURL(steamInfo, size)
    }
    return () => unmounted = true
  }, [steamInfo])

  const steamStatus = (steamInfo && imgLoaded) ? steamInfo.status : 'offline'
  let classes = cx(
    size,
    { 'steamavatar': true
    , [steamStatus]: true
    , 'steamavatar-default': true
    , 'inner-border': innerBorder
    })
  const body = (
    <span className="steamavatar-image-container" style={style}>
      <img className={classes + ' steamavatar-default'} src={defaultAvatars[size]} style={{opacity: imgLoaded ? 0 : 100}} />
      <img className={classes + ' steamavatar-image'} src={imgLoaded ? avatarURL : null} style={{opacity: imgLoaded ? 100 : 0}} />
    </span>
  )
  if (!noLink)
    return (
      <a
        href={`http://steamcommunity.com/profiles/${sid}`}
        onClick={(e) => e.stopPropagation()}
        target="_blank"
        rel="noopener noreferrer"
      >
        {body}
      </a>
    )
  return body
}


SteamAvatar.propTypes =
{ steamID: P.string
, steamID64: P.string
, size: P.oneOf(['tiny', 'mini', 'small', 'medium', 'mediumlarge', 'large'])
, queueAvatar: P.func.isRequired
, innerBorder: P.bool
}


function mapStateToProps(state) {
  const {steamAvatars} = state
  const {data} = steamAvatars.toJS()
  return {avatars: data}
}


export default connect(
  mapStateToProps,
  {queueAvatar}
)(SteamAvatar)
