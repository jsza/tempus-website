import React from 'react'
import cx from 'classnames'
import {mapScreenshot, formatTime, prettyZoneName} from 'root/utils/TempusUtils'
import {Link} from 'react-router-dom'

import Table from 'react-bootstrap/lib/Table'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

import TimeAgo from 'react-timeago'
import SteamAvatar from 'root/components/SteamAvatar'


export default class ActivityTopList extends React.Component {
  render() {
    const items = this.props.data.map((i) => {
      const rank = i.get('rank')
      const pi = i.get('player_info')
      const mi = i.get('map_info')
      const zi = i.get('zone_info')
      const ri = i.get('record_info')
      const iconClasses = cx(
        { 'tf-icon': true
        , 'mini': true
        , 'soldier': ri.get('class') === 3
        , 'demoman': ri.get('class') === 4
        })
      return (
        <tr>
          <td className="shrink">
            <span className={iconClasses} />
            {' '}
            <OverlayTrigger animation={false} placement="bottom" overlay={<div className="app-tooltip"><img width="160" className="img-thumbnail" src={mapScreenshot(mi.get('name'), '160p')} /></div>}>
              <Link to={`/maps/${mi.get('name')}`}>
                {mi.get('name') + (
                  zi.get('type') !== 'map'
                  ? '/' + prettyZoneName(zi.get('type'), zi.get('zoneindex'))
                  : ''
                )}
              </Link>
            </OverlayTrigger>
          </td>
          <td className="shrink">
            <strong className="activity-duration">
              #{rank}
            </strong>
          </td>
          <td className="shrink">
            <span className="activity-player-container">
              <span style={{marginRight: '6px'}}>
                <SteamAvatar steamID={pi.get('steamid')} size="mini" />
              </span>
              <Link to={`/players/${pi.get('id')}`}>
                {pi.get('name')}
              </Link>
            </span>
          </td>
          <td className="expand">
            <span className="pull-right text-muted">
              <TimeAgo date={ri.get('date') * 1000} />
            </span>
          </td>
        </tr>
      )
    })

    return(
      <Table className="activity-table">
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}
