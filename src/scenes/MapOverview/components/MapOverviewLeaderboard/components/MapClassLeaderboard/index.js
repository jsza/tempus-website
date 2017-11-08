import React from 'react'
import {CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import {Col} from 'react-bootstrap'
import MapLeaderboardItem from './components/MapLeaderboardItem'


export default class MapClassLeaderboard extends React.Component {
  renderLeaderboard() {
    const {data} = this.props
    if (data.size === 0) {
      return (
        <div className="no-records">
          No records found.
        </div>
      )
    }
    const firstPlace = data.get(0)
    return (
      <table className="map-leaderboard-list">
        <tbody>
          {data.map((data, idx) =>
            <MapLeaderboardItem
              data={data}
              firstPlace={firstPlace}
              />
          )}
        </tbody>
      </table>
    )
  }

  render() {
    const {playerClass} = this.props
    const tfClass = CLASSINDEX_TO_NAME[playerClass]
    const tfClassLower = tfClass.toLowerCase()

    return (
      <Col className={'leaderboards-' + tfClassLower} lg={6}>
        <div className="leaderboard-container clearfix">
          <div className="leaderboard-header">
            <h4 className="map-leaderboard-header">
              <span className={'tf-icon sm ' + tfClassLower} /> {tfClass} <small>Very Easy (T1)</small>
            </h4>
          </div>
          <div className="leaderboard-body">
            {this.renderLeaderboard()}
          </div>
          <div className="leaderboard-pager clearfix">
            <button className="lb-pager-btn prev">
              <i className="fa fa-arrow-circle-left" /> Prev
            </button>
            <button className="lb-pager-btn next">
              Next <i className="fa fa-arrow-circle-right" />
            </button>
          </div>
        </div>
      </Col>
    )
  }
}
