import React from 'react'
import {formatTime} from '../../utils/TempusUtils'

import {Link} from 'react-router'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import SteamAvatar from 'root/components/SteamAvatar'


export default class LeaderboardItem extends React.Component {
  renderDuration() {
    const {data, firstPlace} = this.props
    const rank = data.get('rank')
    const durationFormatted = formatTime(data.get('duration'))

    let tooltip
    if (rank > 1) {
      tooltip = (
        <Tooltip>
          <span className="duration-compared-tooltip">
            +{formatTime(data.get('duration') - firstPlace.get('duration'))}
          </span>
          <br />
          <i><TimeAgo date={data.get('date') * 1000} /></i>
        </Tooltip>
      )
    }
    else {
      tooltip = (
        <Tooltip>
          <i><TimeAgo date={data.get('date') * 1000} /></i>
        </Tooltip>
      )
    }
    return (
      <OverlayTrigger placement="bottom" animation={false} overlay={tooltip}>
        <span>
          {durationFormatted}
        </span>
      </OverlayTrigger>
    )
  }

  render() {
    const {data} = this.props
    const pi = data.get('player_info')
    const rank = data.get('rank')
    let rankIcon = rank
    if (rank <= 3) {
      rankIcon = <i className="fa fa-trophy" />
    }
    let avatarSize = 'tiny'

    return (
      <tr className={'lb-row lb-rank-' + rank}>
        <td className="lb-rank shrink">
          {rankIcon}
        </td>
        <td className="lb-avatar shrink">
          <span className="pull-right">
            <SteamAvatar steamID={pi.get('steamid')} size={avatarSize} />
          </span>
        </td>
        <td className="lb-name shrink">
          <Link to={`/players/${pi.get('id')}`}>{pi.get('name')}</Link>
        </td>
        <td className="lb-duration expand">
          {this.renderDuration()}
        </td>
      </tr>
    )
  }
}
