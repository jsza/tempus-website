import React, {PropTypes as P} from 'react'
import {Col} from 'react-bootstrap'
import cx from 'classnames'

import {CLASSINDEX_TO_NAME} from '../constants/TFClasses'


export default class PlayerOverviewClassStats extends React.Component {
  render() {
    const {data, playerClass} = this.props
    const cri = data.class_rank_info[playerClass]
    const playerClassName = CLASSINDEX_TO_NAME[this.props.playerClass]
    const classes = cx(
      { 'player-overview-class-container': true
      , 'site-panel': true
      , [playerClassName.toLowerCase()]: true
      })
    return (
      <Col lg={4}>
        <div className={classes}>
          <div className="inner">
            <h4>Rank {cri.rank} <a>{playerClassName}</a></h4>
            <ul className="player-overview-class-stats">
              <li>
                <i className="fa fa-fw fa-trophy fa-lg" /> {`${Math.floor(cri.points)} Points`}
              </li>
              <li>
                <i className="fa fa-fw fa-map-marker fa-lg" /> {`Rank ${cri.rank} in`} <a>{data.player_info.country}</a>
              </li>
            </ul>
          </div>
        </div>
      </Col>
    )
  }
}


PlayerOverviewClassStats.propTypes =
  { data: P.object.isRequired
  , playerClass: P.number.isRequired
  }
