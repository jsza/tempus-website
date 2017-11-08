import React from 'react'
import {JUMP_CLASSES, CLASSINDEX_TO_NAME} from '../constants/TFClasses'

import {Row} from 'react-bootstrap'
import LeaderboardTitle from './mapleaderboard/LeaderboardTitle'
import ClassLeaderboard from './mapleaderboard/ClassLeaderboard'


export default class MapOverviewLeaderboard extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      { showDropdown: false
      }
  }

  renderLeaderboards() {
    const {leaderboard} = this.props
    if (leaderboard.fetching || !leaderboard.data) {
      return <i className="fa fa-spin fa-refresh fa-4x" style={{textAlign: 'center', display: 'block'}} />
    }
    else if (leaderboard.error) {
      return (
        <h4 className="text-danger">{leaderboard.error}</h4>
      )
    }
    return (
      <Row>
        {JUMP_CLASSES.map((playerClass) =>
          <ClassLeaderboard
            data={leaderboard.data.getIn(
              ['results', CLASSINDEX_TO_NAME[playerClass].toLowerCase()])}
            playerClass={playerClass} />
        )}
      </Row>
    )
  }

  render() {
    return (
      <div>
        <LeaderboardTitle
          data={this.props.data}
          leaderboard={this.props.leaderboard}
          fetchLeaderboard={this.props.fetchLeaderboard} />
        {this.renderLeaderboards()}
      </div>
    )
  }
}
