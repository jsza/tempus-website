import React from 'react'
import styled from 'styled-components'

import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import SteamAvatar from 'root/components/SteamAvatar'
import TFIcon from 'root/components/TFIcon'
import SteamAvatarMedal from './components/SteamAvatarMedal'
import WorldRecord from './components/WorldRecord'

import './styles.styl'


const StyledPedestal = styled.span`
  width: 220px;
  height: 32px;
  background: rgba(255, 255, 255, 0.5);
  display: inline-block;
`


function Pedestal({ children, height, ...props }) {
  return (
    <div css={`display: inline-block; margin-left: 4px;`}>
      <div className="text-center">
        <div css={`
          display: inline-block;
          padding: 0 20px 0px 0px;
          margin-bottom: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 32px;
          box-shadow 0 2px 4px black;
        `}>
          {children}
        </div>
      </div>
      <StyledPedestal css={`
        height: ${height};
        box-shadow 0 2px 4px black;
      `} />
    </div>
  )
}


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
    <div className="MapOverview-Overview panel panel-default panel-dark">
      <div className="panel-body">
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div className="wr-icon-left">
            <i className="fas fa-trophy" />
          </div>
          <WorldRecord
            tfClass="soldier"
            runInfo={s.rank1}
          />
          <WorldRecord
            tfClass="demoman"
            runInfo={d.rank1}
          />
          <div className="wr-icon-right">
            <i className="fas fa-trophy" />
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
