import React, {Component, PropTypes} from 'react'
import cx from 'classnames'



const defaultAvatars = {
  'mini': '/static/img/avatar_32x32.jpg',
  'small': '/static/img/avatar_32x32.jpg',
  'medium': '/static/img/avatar_64x64.jpg',
  'large': '/static/img/avatar_184x184.jpg'
}



class SteamAvatar extends Component {
  constructor(props) {
    super(props)
  }


  getAvatarURL() {
    if (this.props.steamInfo) {
      if (this.props.size === 'mini') {
        return this.props.steamInfo.avatar['small']
      }
      return this.props.steamInfo.avatar[this.props.size]
    }
    else {
      return defaultAvatars[this.props.size]
    }
  }


  makeURL() {
    return 'http://steamcommunity.com/profiles/' + this.props.steamid64
  }


  onClick(event) {
    event.stopPropagation()
  }


  getStatus() {
    return this.props.steamInfo === null ? 'offline' : this.props.steamInfo.status
  }


  render() {
    let classes = cx({
      'media-object': true,
      'steamavatar': true,
      'online': this.getStatus() === 'online',
      'offline': this.getStatus() === 'offline',
      'in-game': this.getStatus() === 'in-game',
      'mini': this.props.size === 'mini',
      'small': this.props.size === 'small',
      'medium': this.props.size === 'medium',
      'large': this.props.size === 'large'
    })
    return (
      <a href={this.makeURL()} onClick={this.onClick}>
        <img className={classes} src={this.getAvatarURL()} />
      </a>
    )
  }
}



SteamAvatar.propTypes = {
  steamInfo: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'medium', 'large'])
}



export default SteamAvatar
