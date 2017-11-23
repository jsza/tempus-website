import React from 'react'
import {Link} from 'react-router-dom'

import TimeAgo from 'react-timeago'

import './styles.styl'


const DemoInfo = ({demoInfo, serverInfo}) => {
  const {url, deleted, expired, recording, requested} = demoInfo
  let demoStatus
  if (url) {
    demoStatus = 'Uploaded'
  }
  else if (deleted || expired) {
    demoStatus = 'Deleted'
  }
  else if (recording) {
    if (requested) {
      demoStatus = 'Recording (upload queued)'
    }
    else {
      demoStatus = 'Recording'
    }
  }
  else if (requested) {
    demoStatus = 'Uploading'
  }
  else {
    demoStatus = 'Not uploaded'
  }
  return (
    <table className="DemoInfo">
      <tbody>
        <tr>
          <td className="info-label">Filename</td>
          <td>{demoInfo.filename}.dem</td>
        </tr>
        <tr>
          <td className="info-label">Server</td>
          <td>
            <Link to={`/servers/${serverInfo.id}`}>{serverInfo.name}</Link>
          </td>
        </tr>
        <tr>
          <td className="info-label">Map</td>
          <td>
            <Link to={`/maps/${demoInfo.mapname}`}>
              {demoInfo.mapname}
            </Link>
          </td>
        </tr>
        <tr>
          <td className="info-label">Status</td>
          <td>{demoStatus}</td>
        </tr>
        <tr>
          <td className="info-label">Date</td>
          <td><TimeAgo date={demoInfo.date * 1000} /></td>
        </tr>
      </tbody>
    </table>
  )
}


export default DemoInfo
