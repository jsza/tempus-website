import React from 'react'

import './styles.styl'


const LeaderboardIconCol = ({ right=false }) =>
  <div className={`LeaderboardIconCol ${right ? 'right' : 'left'}`}>
    <span className="icon-container">
      <i className="fas fa-trophy" style={{color: 'gold'}} />
    </span>
    <span className="icon-container">
      <i className="fas fa-globe" />
    </span>
  </div>


export default LeaderboardIconCol
