import React from 'react'
import cx from 'classnames'
import {mapScreenshot, formatTime, prettyZoneName} from 'root/utils/TempusUtils'
import {Link} from 'react-router'
import {Table, OverlayTrigger} from 'react-bootstrap'
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
          <td className="expand">
            <span className="text-muted pull-right">
              <TimeAgo date={ri.get('date') * 1000} />
            </span>
          </td>
        </tr>
      )
    })

    return(
      <Scrollbars style={{height: 100}}>
        <Table className="activity-table">
          <tbody>
            {items}
          </tbody>
        </Table>
      </Scrollbars>
    )
  }
}
