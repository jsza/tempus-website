import React from 'react'
import {JUMP_CLASSES, CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import RunSelection from './components/RunSelection'
import Leaderboard from './components/Leaderboard'

import './styles.styl'


export default class LeaderboardContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      { showDropdown: false
      }
  }

  renderLeaderboards() {
    const {leaderboard} = this.props
    if (leaderboard.error) {
      return (
        <Col md={10}>
          <div className="panel panel-dark">
            <div className="panel-body">
              <span className="text-danger"><i className="fa fa-exclamation-circle" /> {leaderboard.error}</span>
            </div>
          </div>
        </Col>
      )
    }
    else if ((leaderboard.fetching && !leaderboard.data) || !leaderboard.data) {
      return (
        <div className="container">
          <i className="fa fa-spin fa-refresh fa-4x" style={{textAlign: 'center', display: 'block'}} />
        </div>
      )
    }
    return (
      <div>
        {[3, 4].map((playerClass, idx) =>
          <Col md={5} key={idx}>
            <Leaderboard
              fetching={leaderboard.fetching}
              data={leaderboard.data.getIn(
                ['results', CLASSINDEX_TO_NAME[playerClass].toLowerCase()])}
              tier={leaderboard.data.getIn(['tier_info', playerClass.toString()])}
              zoneInfo={leaderboard.data.get('zone_info')}
              playerClass={playerClass}
              mapData={this.props.data}
              fetchMoreLeaderboard={this.props.fetchMoreLeaderboard} />
          </Col>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="MapOverview-LeaderboardContainer">
        {this.renderLeaderboards()}
      </div>
    )
  }
}
