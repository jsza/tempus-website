import React from 'react'
import cx from 'classnames'
import Table from 'react-bootstrap/lib/Table'
import {Link} from 'react-router-dom'
import SteamAvatar from 'root/components/SteamAvatar'

import {prettyZoneName, formatTime} from 'root/utils/TempusUtils'

import './styles.styl'


const DemoRuns = ({demoRuns}) => (
  <div className="DemoRuns">
    <h3>Runs in demo</h3>
    {demoRuns.length > 0
    ? <Table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Class</th>
            <th>Zone</th>
            <th>Time</th>
            <th>Type</th>
            <th>Tick</th>
          </tr>
        </thead>
        <tbody>
          {demoRuns.map(r => {
            const pi = r.player_info
            const zi = r.zone_info
            const zri = r.zone_run_info
            const runType = r.run_type
            const iconClasses = cx(
              { 'tf-icon': true
              , 'mini': true
              , 'soldier': zri.player_class === 3
              , 'demoman': zri.player_class === 4
              })
            return (
              <tr>
                <td>
                  <SteamAvatar steamID={pi.steamid} size="tiny" />
                  &nbsp;
                  <Link to={`/players/${pi.id}`}>
                    {pi.name}
                  </Link>
                </td>
                <td><span className={iconClasses} /></td>
                <td>{prettyZoneName(zi.type, zi.index)}</td>
                <td>{formatTime(zri.duration)}</td>
                <td>
                  {{wr: 'WR',
                    top: 'Top',
                    pr: 'PR'}[runType]}
                </td>
                <td>{zri.start_tick} &rarr; {zri.end_tick}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    : <p>Nothing here</p>
    }
  </div>
)


export default DemoRuns
