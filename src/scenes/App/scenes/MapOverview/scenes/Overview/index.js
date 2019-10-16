import React from 'react'
import styled from 'styled-components'

import {connect} from 'react-redux'

import SteamAvatar from 'root/components/SteamAvatar'


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
          padding: 0 8px 0px 0px;
          margin-bottom: 4px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 32px;
          box-shadow 0 2px 4px black;

          & .steamavatar {
            border-radius: 50%;
          }
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
  const {soldier_runs} = data.toObject()
  const rank1 = soldier_runs.get(0).toObject()
  const rank2 = soldier_runs.get(1).toObject()
  const rank3 = soldier_runs.get(2).toObject()
  return (
    <div>
      <Pedestal height="96px">
        <SteamAvatar steamID={rank2.steamid} size="mini" /> {rank2.name}
      </Pedestal>
      <Pedestal height="128px">
        <SteamAvatar steamID={rank1.steamid} size="mini" /> {rank1.name}
      </Pedestal>
      <Pedestal height="64px">
        <SteamAvatar steamID={rank3.steamid} size="mini" /> {rank3.name}
      </Pedestal>
    </div>
  )
}

function mapStateToProps(state) {
  const {data} = state.app.mapOverview.mapOverview
  return {data}
}


export default connect(
  mapStateToProps
)(Overview)
