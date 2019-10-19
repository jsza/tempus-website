import React from 'react'

import {Range} from 'immutable'

import './styles.styl'


export default function SteamAvatarMedal({ children }) {
  return (
    <div className="SteamAvatarMedal">
      <div className="cogs">
        {Range(0, 16).map((num) =>
          <div
            key={num}
            className="cog"
            style={{transform: `rotate(${num * 22.5 + 202.5}deg)`}} />
        )}
      </div>
      {children}
    </div>
  )
}
