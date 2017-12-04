import React from 'react'
import {formatTime} from 'root/utils/TempusUtils'

import {Link} from 'react-router-dom'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import TimeAgo from 'react-timeago'
import SteamAvatar from 'root/components/SteamAvatar'

import './styles.styl'


export default function LeaderboardItem({data, firstPlace}) {
  const pi = data.get('player_info')
  const rank = data.get('rank')
  let rankIcon = `#${rank}`
  if (rank <= 3) {
    rankIcon = <i className="fa fa-trophy" />
  }
  let avatarSize = 'tiny'

  return (
    <tr className={'MapOverview-LeaderboardContainer-Leaderboard-LeaderboardItem rank-' + rank}>
      <td className="rank shrink">
        {rankIcon}
      </td>
      <td className="duration shrink">
        <Link to={`/records/${data.get('id')}`}>
          {formatTime(data.get('duration'))}
        </Link>
      </td>
      <td className="name expand">
        <SteamAvatar steamID={pi.get('steamid')} size={avatarSize} />
        <Link to={`/players/${pi.get('id')}`}>{pi.get('name')}</Link>
      </td>
    </tr>
  )
}
