import React from 'react'

import SteamAvatarMedal from '.'
import TFIcon from 'root/components/TFIcon'

export default {
  title: 'SteamAvatarMedal'
}

export const withTFIcon = () =>
  <div style={{padding: '8px'}}>
    <SteamAvatarMedal>
      <span className="tf-icon-container">
        <TFIcon tfClass="soldier" size="auto" />
      </span>
    </SteamAvatarMedal>
  </div>


export const withText = () =>
  <SteamAvatarMedal>
    <span className="tf-icon-container">Test</span>
  </SteamAvatarMedal>
//
//
// withText.story = {name: 'testing'}
