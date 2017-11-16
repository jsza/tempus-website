import React from 'react'
import IP from 'react-immutable-proptypes'
import cx from 'classnames'
import {prettyZoneName} from 'root/utils/TempusUtils'
import {Link} from 'react-router-dom'
import TimeAgo from 'react-timeago'
import SteamAvatar from 'root/components/SteamAvatar'


export default class ActivityList extends React.Component {
  render() {
    const {data, zoneType} = this.props
    var result
    if (zoneType === 'all') {
      result =
        data.get('map_wrs').concat(
        data.get('course_wrs')).concat(
        data.get('bonus_wrs'))
        .sortBy((r) => r.getIn(['record_info', 'date']))
        .reverse()
    }
    else {
      result = data.get(`${zoneType}_wrs`)
    }

    const items = result.map((i, idx) => {
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
      const mapName = mi.get('name')
      return (
        <tr key={idx}>
          <td className="shrink">
            <span className="text-muted">
              <TimeAgo date={ri.get('date') * 1000} />
            </span>
          </td>
          <td className="shrink">
            <SteamAvatar steamID={pi.get('steamid')} size="tiny" />
            <span> </span>
            <Link to={`/players/${pi.get('id')}`}>
               <span>{pi.get('name')}</span>
            </Link>
          </td>
          <td className="shrink">
            <span className={iconClasses} />
          </td>
          <td className="shrink">
            <Link to={`/maps/${mapName}`}>
              <span>{mapName}</span>
            </Link>
          </td>
          <td className="expand">
            <span>
              {zi.get('type') !== 'map'
               ? prettyZoneName(zi.get('type'), zi.get('zoneindex'))
               : 'Map'
               }
            </span>
          </td>
        </tr>
      )
    })

    return (
      <table className="App-Home-Activity-ActivityList">
        <tbody>
          {items}
        </tbody>
      </table>
    )
  }
}


ActivityList.propTypes =
  { data: IP.Map
  }
