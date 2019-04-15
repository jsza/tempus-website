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
    if (leaderboard.fetching || !leaderboard.data) {
      return <i className="fa fa-spin fa-refresh fa-4x" style={{textAlign: 'center', display: 'block'}} />
    }
    else if (leaderboard.error) {
      return (
        <h4 className="text-danger">{leaderboard.error}</h4>
      )
    }
    return (
      <div>
        {[3, 4].map((playerClass, idx) =>
          <Col md={5} key={idx}>
            <Leaderboard
              data={leaderboard.data.getIn(
                ['results', CLASSINDEX_TO_NAME[playerClass].toLowerCase()])}
              tier={leaderboard.data.getIn(['tier_info', playerClass.toString()])}
              zoneInfo={leaderboard.data.get('zone_info')}
              playerClass={playerClass}
              mapData={this.props.data} />
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
