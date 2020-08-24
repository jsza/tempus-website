import React from 'react'
import styled from 'styled-components'

import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import SteamAvatar from 'root/components/SteamAvatar'
import TFIcon from 'root/components/TFIcon'
import ZoneIcon from 'root/components/ZoneIcon'
import SteamAvatarMedal from './components/SteamAvatarMedal'
import WorldRecord from './components/WorldRecord'
import LeaderboardIconCol from './components/LeaderboardIconCol'
import Authors from '../Authors'

import './styles.styl'


const Overview = ({ data }) => {
  const {soldier_runs, demoman_runs} = data.toObject()
  const mapName = data.getIn(['map_info', 'name'])
  const s =
    { rank1: soldier_runs.get(0).toObject()
    , rank2: soldier_runs.get(1).toObject()
    , rank3: soldier_runs.get(2).toObject()
    }
  const d =
    { rank1: demoman_runs.get(0).toObject()
    , rank2: demoman_runs.get(1).toObject()
    , rank3: demoman_runs.get(2).toObject()
    }
  return (
    <>
    <div className="container flex-row">

      <div className="MapOverview-Overview panel panel-default panel-dark">
        <div className="panel-heading">
          <span>
            <i className="fas fa-trophy" style={{color: 'gold'}} />
          </span> <strong>World Records</strong>
        </div>
        <div className="panel-body">
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className="inner-body">
              <WorldRecord
                tfClass="soldier"
                runInfo={s.rank1}
              />
              <WorldRecord
                tfClass="demoman"
                runInfo={d.rank1}
              />
            </div>
          </div>
        </div>
        <div className="panel-footer">
          <Link
            className="leaderboard-link"
            to={`/maps/${mapName}/leaderboards`}
          >
            View all
          </Link>
        </div>
      </div>
      <Authors authors={data.get('authors')} />
    </div>
    </>
  )
}

function mapStateToProps(state) {
  const {data} = state.app.mapOverview.mapOverview
  return {data}
}


export default connect(
  mapStateToProps
)(Overview)
