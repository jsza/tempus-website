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

  var rankElement
  if (rank <= 3) {
    rankElement = (
      <span>
        <i className="fa fa-trophy" /> {rank}.
      </span>
    )
  }
  else {
    rankElement = `${rank}.`
  }

  return (
    <tr className={'MapOverview-LeaderboardContainer-Leaderboard-LeaderboardItem rank-' + rank}>
      <td className="rank shrink text-right">
        {rankElement}
      </td>
      <td className="duration shrink">
        <Link to={`/records/${data.get('id')}`}>
          {formatTime(data.get('duration'))}
        </Link>
      </td>
      <td className="comparison shrink hidden">
        {rank === 1 ? <div className="text-center">&mdash;</div> :
          <span>(+{formatTime(data.get('duration') - firstPlace.get('duration'))})</span>
        }
      </td>
      <td className="name expand">
        <div style={{position: 'relative'}}>
          <span className="name-inner">
            <SteamAvatar steamID={pi.get('steamid')} size="tiny" />
            <Link to={`/players/${pi.get('id')}`}>
              {pi.get('name')}
            </Link>
          </span>
        </div>
      </td>
      <td className="date shrink hidden-xs">
        <TimeAgo date={data.get('date') * 1000} />
      </td>
    </tr>
  )
}
//          <div style={{position: 'absolute', top: 0, left: 0}}>
//            <SteamAvatar steamID={pi.get('steamid')} size="tiny" />
//            <Link to={`/players/${pi.get('id')}`}>
//              {pi.get('name')}
//            </Link>
//          </div>
