import React from 'react'
import {CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import {Col} from 'react-bootstrap'
import LeaderboardItem from './components/LeaderboardItem'

import './styles.styl'


export default class Leaderboard extends React.Component {
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
      <table>
        <tbody>
          {data.map((data, idx) =>
            <LeaderboardItem
              data={data}
              firstPlace={firstPlace}
              />
          )}
        </tbody>
      </table>
    )
  }

  render() {
    const {playerClass, tier} = this.props
    const tfClass = CLASSINDEX_TO_NAME[playerClass]
    const tfClassLower = tfClass.toLowerCase()
    // console.log(this.props)

    return (
      <Col lg={6}>
        <div className="MapOverview-LeaderboardContainer-Leaderboard">
          <header className="clearfix">
            <h4>
              <span className={'tf-icon sm  ' + tfClassLower} /> {tfClass}
              <span> | </span>
              <span className={'tier tier-' + tier}>Tier {tier}</span>
            </h4>
          </header>
          <main>
            {this.renderLeaderboard()}
          </main>
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
