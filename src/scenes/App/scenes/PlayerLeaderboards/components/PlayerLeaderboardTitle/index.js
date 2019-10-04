import React from 'react'

import './styles.styl'


export default function PlayerLeaderboardTitle ({ rankType }) {
  let icon
  if (rankType === 'overall') {
    icon = (
      <i className="fa fa-users player-ranks-icon" />
    )
  }
  else if (rankType === 'soldier') {
    icon = <span className="tf-icon soldier large" />
  }
  else if (rankType === 'demoman') {
    icon = <span className="tf-icon demoman large" />
  }
  return (
    <h1 className="PlayerLeaderboards-PlayerLeaderboardTitle page-title">
      {icon} Top Players &mdash; <span className="capitalize">{rankType}</span>
    </h1>
  )
}
