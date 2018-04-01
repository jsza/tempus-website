import React from 'react'
import P from 'prop-types'
import IP from 'react-immutable-proptypes'
import cx from 'classnames'
import {connect} from 'react-redux'
import {loadRecordOverview} from './services/recordOverview/actions'
import {prettyZoneName, formatTime} from 'root/utils/TempusUtils'
import {Link} from 'react-router-dom'
import SteamAvatar from 'root/components/SteamAvatar'
import {CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import DocumentTitle from 'react-document-title'
import Throbber from 'root/components/Throbber'
import TimeAgo from 'react-timeago'

import './styles.styl'


class RecordOverview extends React.Component {
  componentDidMount() {
    this.props.loadRecordOverview(this.props.match.params.id)
  }

  render() {
    const {fetching, error, data} = this.props
    let content
    if (error) {
      content = <p className="text-danger">{error}</p>
    }
    else if (fetching || !data) {
      content = <p><Throbber /></p>
    }
    else {
      const playerInfo = data.get('player_info').toJS()
      const recordInfo = data.get('record_info').toJS()
      const zoneInfo = data.get('zone_info').toJS()
      const tierInfo = data.get('tier_info').toJS()
      const mapInfo = data.get('map_info').toJS()
      const demoInfo = data.get('demo_info').toJS()
      const zoneName = prettyZoneName(zoneInfo.type, zoneInfo.zoneindex)
      console.log(demoInfo)
      const iconClasses = cx(
        { 'tf-icon': true
        , 'mini': true
        , 'soldier': recordInfo.class === 3
        , 'demoman': recordInfo.class === 4
        })

      content = (
        <DocumentTitle title={`Tempus - ${playerInfo.name} on ${mapInfo.name} - ${zoneName}`}>
          <div>
            <span className="text-muted pull-right">
              <TimeAgo date={recordInfo.date * 1000} />
            </span>
            <span className="steamavatar-container">
              <SteamAvatar steamID={playerInfo.steamid} size="medium" />
            </span>
            <h1>
              <Link to={`/players/${playerInfo.id}`}>{playerInfo.name}</Link>
            </h1>
            <br />
            <h4>
              <span> on </span>
              <span className={iconClasses} /> <Link to={`/maps/${mapInfo.name}`}>{mapInfo.name}</Link>
              <span> </span>
              {zoneName}
            </h4>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <div className="info-panel">
                  <table className="info-table">
                    <tbody>
                      <tr>
                        <td className="info-label">Time</td>
                        <td className="duration">
                          {formatTime(recordInfo.duration)}
                        </td>
                      </tr>
                      <tr>
                        <td className="info-label">Class</td>
                        <td>
                          <span className={iconClasses} /> {CLASSINDEX_TO_NAME[recordInfo.class]}
                        </td>
                      </tr>
                      <tr>
                        <td className="info-label">Tier</td>
                        <td>
                          {tierInfo.tier}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-panel">
                  <table className="info-table">
                    <tbody>
                      <tr>
                        <td className="info-label">Demo</td>
                        <td>
                          <Link to={`/demos/${demoInfo.id}`}>
                            {demoInfo.filename}.dem
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="info-label">Start Tick</td>
                        <td>
                          {recordInfo.demo_start_tick}
                        </td>
                      </tr>
                      <tr>
                        <td className="info-label">End Tick</td>
                        <td>
                          {recordInfo.demo_end_tick}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </DocumentTitle>
      )
    }


    return (
      <DocumentTitle title={'Tempus - Player Record'}>
        <div className="RecordOverview container">
          {content}
        </div>
      </DocumentTitle>
    )
  }
}


RecordOverview.propTypes = {
  loadRecordOverview: P.func.isRequired,
  fetching: P.bool.isRequired,
  error: P.string,
  data: IP.map
}


function mapStateToProps(state) {
  const {fetching, error, data} = state.recordOverview
  return {fetching, error, data}
}


export default connect(
  mapStateToProps,
  {loadRecordOverview}
)(RecordOverview)
