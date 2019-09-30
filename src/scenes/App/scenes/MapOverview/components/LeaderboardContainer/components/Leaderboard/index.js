import React from 'react'
import {CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import Col from 'react-bootstrap/lib/Col'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import LeaderboardItem from './components/LeaderboardItem'
import PersonalRecord from './components/PersonalRecord'
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
      <div>
        <table className="table table-condensed table-mapoverview">
          <thead>
            <tr>
              <th className="rank sortable selected shrink">rank <i className="fa fa-caret-down" /></th>
              <th className="duration shrink"></th>
              <th className="player expand"></th>
              <th className="date sortable shrink hidden-xs">date</th>
            </tr>
          </thead>
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
        <button className="load-more-button" onClick={() => this.props.fetchMoreLeaderboard(this.props.playerClass)}>
            Load more
        </button>
      </div>
    )
  }

  render() {
    const {fetching, playerClass, tier, zoneInfo} = this.props
    const tfClass = CLASSINDEX_TO_NAME[playerClass]
    const tfClassLower = tfClass.toLowerCase()
    const zoneName = prettyZoneName(zoneInfo.get('type'), zoneInfo.get('zoneindex'))
    const customZoneName = zoneInfo.get('custom_name')

    return (
      <div>
        {/* TODO: Finish this up for small viewports
          <div className="classtabs">
            <span className="classtab">
              <i className={'tf-icon medium soldier'} style={{height: '24px', width: '24px'}} /> Soldier
            </span>
            <span className="classtab">
              <i className={'tf-icon medium demoman'} style={{height: '24px', width: '24px'}} /> Demoman
            </span>
          </div>
        */}
        <div className="MapOverview-LeaderboardContainer-Leaderboard panel panel-dark">
          {fetching ? <div className="loading-overlay" /> : null}
          <div className="panel-heading">
            <div className="pull-right hidden">
              <ButtonGroup>
                <Button className="active">All</Button>
                <Button disabled>Me</Button>
              </ButtonGroup>
            </div>
            <i className={'tf-icon medium pull-left ' + tfClassLower} style={{marginRight: '8px', height: '40px', width: '40px'}} />
            <strong> {zoneName}</strong> {customZoneName ? <small>({customZoneName})</small> : ''}
            <div><span>{Difficulties[tier]} (Tier {tier})</span></div>
          </div>
          <div className="panel-body">
            <PersonalRecord />
            {this.renderLeaderboard()}
          </div>
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
