import React from 'react'

import TimeAgo from 'react-timeago'

import SteamAvatar from 'root/components/SteamAvatar'
import TFIcon from 'root/components/TFIcon'
import SteamAvatarMedal from '../SteamAvatarMedal'
import {capitalize, formatTime} from 'root/utils/TempusUtils'
import {Link} from 'react-router-dom'

import './styles.styl'


export default function WorldRecord({ tfClass, runInfo }) {
  return (
    <div className="Overview-WorldRecord">
      <div className="worldrecord-container">
        <div className="info-container">
          <div style={{display: 'flex'}}>
            <div className="avatar-link-container">
              <Link
                className="avatar-link"
                to={`/players/${runInfo.player_info.get('id')}`}
              >
                <SteamAvatar
                  noLink
                  innerBorder
                  steamID={runInfo.steamid}
                  size="small" />
              </Link>
            </div>
            <div className="player-link-container">
              <Link
                className="player-link"
                to={`/players/${runInfo.player_info.get('id')}`}
              >
                {runInfo.name}
              </Link>
              <div className="run-info-item run-duration">
                <Link to={`/records/${runInfo.id}`}>
                  {formatTime(runInfo.duration)}
                </Link>
              </div>
            </div>
          </div>
          <SteamAvatarMedal>
            <span className="tf-icon-container">
              <TFIcon tfClass={tfClass} size="medium" />
            </span>
          </SteamAvatarMedal>
          <div className="run-date">
            <TimeAgo date={runInfo.date * 1000} />
          </div>
        </div>
      </div>
    </div>
  )
}
