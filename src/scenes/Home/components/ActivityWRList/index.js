import React from 'react'
import cx from 'classnames'
import {mapScreenshot, formatTime, prettyZoneName} from 'root/utils/TempusUtils'
import {Link} from 'react-router'
import {Table} from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import SteamAvatar from 'root/components/SteamAvatar'
import {Scrollbars} from 'react-custom-scrollbars'


export default class ActivityWRList extends React.Component {
  render() {
    const items = this.props.data.map((i) => {
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
      console.log(pi.toJS())
      return (
        <tr>
          <td className="shrink">
            <span className="text-muted">
              <TimeAgo date={ri.get('date') * 1000} />
            </span>
          </td>
          <td className="expand">
            <Link to={`/players/${pi.get('id')}`}>
              <SteamAvatar steamID={pi.get('steamid')} size="tiny" /> {pi.get('name')}
            </Link>
            <span> </span>
            beat the <span className={iconClasses} /> record on
            <span> </span>
            <Link to={`/maps/${mi.get('name')}`}>
              {mi.get('name') + (
                zi.get('type') !== 'map'
                ? '/' + prettyZoneName(zi.get('type'), zi.get('zoneindex'))
                : ''
              )}
            </Link>
            <span> </span>
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
