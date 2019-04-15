import React from 'react'
import {CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import Col from 'react-bootstrap/lib/Col'
import LeaderboardItem from './components/LeaderboardItem'
import {Scrollbars} from 'react-custom-scrollbars'
import {prettyZoneName, formatTime} from 'root/utils/TempusUtils'
import Difficulties from 'root/constants/Difficulties'
import TFIcon from 'root/components/TFIcon'


import './styles.styl'


export default class Leaderboard extends React.Component {
  loadMore() {
    console.log(this.props.playerClass)
  }

  renderLeaderboard() {
    const {data} = this.props
    if (data.size === 0) {
      return (
        <div className="no-records">
          No one has completed this.
        </div>
      )
    }
    const firstPlace = data.get(0)
    return (
      <table className="table table-condensed table-mapoverview">
        <tbody>
          {data ? data.toArray().map((data, idx) =>
            <LeaderboardItem
              key={idx}
              data={data}
              firstPlace={firstPlace}
              />
          ) : 'nothing'}
        </tbody>
      </table>
    )
  }

  render() {
    const {playerClass, tier, zoneInfo} = this.props
    const tfClass = CLASSINDEX_TO_NAME[playerClass]
    const tfClassLower = tfClass.toLowerCase()
    const zoneName = prettyZoneName(zoneInfo.get('type'), zoneInfo.get('zoneindex'))

    return (
      <div className="panel panel-dark">
        <div className="panel-heading">
          <i className={'tf-icon medium pull-left ' + tfClassLower} style={{marginRight: '8px', height: '40px', width: '40px'}} />
          <div className="" style={{fontWeight: 'bold'}}> {zoneName}</div>
          <div><span>{Difficulties[tier]} (Tier {tier})</span></div>
        </div>
        <div className="panel-body">
          {this.renderLeaderboard()}
        </div>
      </div>
    )
  }
}
// <div className="load-more-button-container">
  // <button className="load-more-button" onClick={this.loadMore.bind(this)}>
    // Load more
  // </button>
// </div>
