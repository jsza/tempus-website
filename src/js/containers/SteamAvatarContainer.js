import React, {PropTypes as P} from 'react'
import {connect} from 'react-redux'
import cx from 'classnames'
import steam from 'steamidconvert'

import {queueAvatar} from '../redux/avatars'


const Steam = steam()


const defaultAvatars = {
  'mini': '/static/img/avatar_32x32.jpg',
  'small': '/static/img/avatar_32x32.jpg',
  'medium': '/static/img/avatar_64x64.jpg',
  'mediumlarge': '/static/img/avatar_64x64.jpg',
  'large': '/static/img/avatar_184x184.jpg'
}


class SteamAvatar extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.queueAvatar([this.getSteamID()])
  }

  getSteamID() {
    return Steam.convertTo64(this.props.steamID)
  }

  getSteamInfo() {
    if (this.props.avatars) {
      return this.props.avatars[this.getSteamID()]
    }
  }

  getAvatarURL() {
    const steamInfo = this.getSteamInfo()
    if (steamInfo) {
      if (this.props.size === 'mini') {
        return steamInfo.avatar['small']
      }
      if (this.props.size === 'mediumlarge') {
        return steamInfo.avatar['large']
      }
      return steamInfo.avatar[this.props.size]
    }
    else {
      return defaultAvatars[this.props.size]
    }
  }

  makeURL() {
    return 'http://steamcommunity.com/profiles/' + this.getSteamID()
  }

  onClick(event) {
    event.stopPropagation()
  }

  getStatus() {
    const steamInfo = this.getSteamInfo()
    return !steamInfo ? 'offline' : steamInfo.status
  }

  render() {
    let classes = cx(
      { 'steamavatar': true
      , 'online': this.getStatus() === 'online'
      , 'offline': this.getStatus() === 'offline'
      , 'in-game': this.getStatus() === 'in-game'
      , 'mini': this.props.size === 'mini'
      , 'small': this.props.size === 'small'
      , 'medium': this.props.size === 'medium'
      , 'mediumlarge': this.props.size === 'mediumlarge'
      , 'large': this.props.size === 'large'
      })
    return (
      <a href={this.makeURL()} onClick={this.onClick}>
        <img className={classes} src={this.getAvatarURL()} />
      </a>
    )
  }
}


SteamAvatar.propTypes =
{ steamID: P.string.isRequired
, size: P.oneOf(['mini', 'small', 'medium', 'mediumlarge', 'large'])
, queueAvatar: P.func.isRequired
}


function mapStateToProps(state) {
  const {avatars} = state
  const {data} = avatars.toJS()
  return {avatars: data}
}


export default connect(
  mapStateToProps,
  {queueAvatar}
)(SteamAvatar)
