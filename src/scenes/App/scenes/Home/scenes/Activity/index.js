import React from 'react'
import cx from 'classnames'
import {mapScreenshot, formatTime, prettyZoneName} from 'root/utils/TempusUtils'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import SteamAvatar from 'root/components/SteamAvatar'
import {Scrollbars} from 'react-custom-scrollbars'
import Throbber from 'root/components/Throbber'
import {connect} from 'react-redux'
import {loadActivity} from './actions'


class Activity extends React.Component {
  componentDidMount() {
    this.props.loadActivity()
  }

  render() {
    if (!this.props.data || this.props.fetching) {
      return (
        <div>Loading...</div>
      )
    }
    const items = this.props.data.get('map_wrs').map((i, idx) => {
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
        <tr key={idx}>
          <td className="shrink">
            <span className="text-muted">
              <TimeAgo date={ri.get('date') * 1000} />
            </span>
          </td>
          <td className="expand">
            <SteamAvatar steamID={pi.get('steamid')} size="tiny" />
            <span> </span>
            <Link to={`/players/${pi.get('id')}`}>
               {pi.get('name')}
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
      <table className="activity-table">
        <tbody>
          {items}
        </tbody>
      </table>
    )
  }
}


function mapStateToProps(state) {
  const {activity} = state
  const {fetching, error, data} = activity
  return {fetching, error, data}
}


export default connect(
  mapStateToProps,
  {loadActivity}
)(Activity)
