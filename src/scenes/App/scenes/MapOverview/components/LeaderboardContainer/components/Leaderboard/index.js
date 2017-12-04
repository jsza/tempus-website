import React from 'react'
import {CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import Col from 'react-bootstrap/lib/Col'
import LeaderboardItem from './components/LeaderboardItem'
import {Scrollbars} from 'react-custom-scrollbars'

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
      <table>
        <tbody>
          {data.map((data, idx) =>
            <LeaderboardItem
              key={idx}
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

    return (
      <div className="MapOverview-LeaderboardContainer-Leaderboard">
        <header className="clearfix">
          <h4>
            <span className={'tf-icon sm  ' + tfClassLower} /> {tfClass}
            <span> | </span>
            <span className={'tier tier-' + tier}>Tier {tier}</span>
          </h4>
        </header>
        <main>
          <Scrollbars renderThumbVertical={({style, ...props}) =>
                <div {...props}
                     style={{...style,
                             backgroundColor: 'rgba(255, 255, 255, 0.4)',
                             cursor: 'pointer',
                             borderRadius: '4px'
                            }}
                  />
              }>
            {this.renderLeaderboard()}
          </Scrollbars>
        </main>
        <div className="leaderboard-footer">
        &nbsp;
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
