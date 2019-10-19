import React from 'react'

import {Link} from 'react-router-dom'


export default function PlayerSelectionInput() {
  return (
    <div className="player-selection form-control-static">
      <button className="remove pull-right text-muted"><i className="fas fa-fw fa-times" /></button>
      <span className="player">
        <Link to="/players/37">jayess</Link> [U:1:28530124]
      </span>
    </div>
  )
}
