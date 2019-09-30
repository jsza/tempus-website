import React from 'react'
import SteamAvatar from 'root/components/SteamAvatar'
import './styles.styl'


export default function PersonalRecord() {
  return <div />
  return (
    <div className="MapOverview-LeaderboardContainer-Leaderboard-PersonalRecord panel  panel-dark">
      <div className="panel-heading">
        <span className="pull-right">PR</span>
        <span>
          <SteamAvatar steamID64="76561197988795852" size="small" /> jayess &bull; Rank 15 &bull; 8:11.092
        </span>
      </div>
      <div className="panel-body">
        <p>
          You have not completed this.
        </p>
      </div>
    </div>
  )
}
