import React, {useMemo} from 'react'
import {formatTime} from 'root/utils/TempusUtils'

import {Link} from 'react-router-dom'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import TimeAgo from 'react-timeago'
import SteamAvatar from 'root/components/SteamAvatar'

import './styles.styl'


const LeaderboardItemPanel = ({ data }) =>
  <tr className="MapOverview-LeaderboardContainer-Leaderboard-LeaderboardItemPanel">
    <td colSpan="10">
      <div className="run-info-container">
        <div className="run-info-panel">
          <table className="run-info-table">
            <tbody>
              <tr>
                <td>Date</td>
                <td>
                  2014-10-09 09:40
                </td>
              </tr>
              <tr>
                <td>Demo</td>
                <td>
                  <Link to="/demos/521390">
                    download
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Tick</td>
                <td>
                  12345 &rarr; 54321
                </td>
              </tr>
              <tr>
                <td>Server</td>
                <td>
                  <Link to="/servers/604997">
                    Jump Academy (Chicago) Beginners
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="run-info-panel">
          <table className="run-info-table">
            <tbody>
              <tr>
                <td>CP1</td>
                <td style={{fontFamily: 'Droid Sans Mono', fontWeight: 'bold', color: 'rgb(230, 100, 100)'}}>+00:00.15</td>
              </tr>
              <tr>
                <td>CP2</td>
                <td style={{fontFamily: 'Droid Sans Mono', fontWeight: 'bold', color: 'rgb(100, 230, 100)'}}>-00:20.15</td>
              </tr>
              <tr>
                <td>CP3</td>
                <td style={{fontFamily: 'Droid Sans Mono', fontWeight: 'bold', color: 'rgb(230, 100, 100)'}}>+00:10.49</td>
              </tr>
              <tr>
                <td>Map run</td>
                <td style={{fontFamily: 'Droid Sans Mono', fontWeight: 'bold'}}><span style={{ color: 'rgb(230, 100, 100)'}}>+00:33.75</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </td>
  </tr>


function LeaderboardItem({ data, firstPlace, expanded, onClick }) {
  const pi = data.get('player_info')
  const rank = data.get('rank')

  const rankElement = (
    <>
      {(rank <= 3) && (
        <><i className="fas fa-trophy" /> </>
      )}
      {`${rank}`}
    </>
  )

  const classes = [
    'MapOverview-LeaderboardContainer-Leaderboard-LeaderboardItem',
    `rank-${rank}`,
    expanded && 'expanded'
  ].join(' ')

  return (
    <>
      <tr className={classes} onClick={onClick}>
        <td className="toggle-expand">
          <i className={`fas fa-chevron-right`} style={{transform: `rotate(${expanded ? '90deg' : '0deg'})`, textShadow: 'none'}} />
        </td>
        <td className="rank shrink">
          {rankElement}
        </td>
        <td className="duration shrink">
          <Link to={`/records/${data.get('id')}`}>
            {formatTime(data.get('duration'))}
          </Link>
        </td>
        {/* <td className="comparison shrink hidden">
          {rank === 1 ? <div className="text-center">&mdash;</div> :
            <span>(+{formatTime(data.get('duration') - firstPlace.get('duration'))})</span>
          }
        </td>*/}
        <td className="name expand">
          <span className="name-inner">
            <Link to={`/players/${pi.get('id')}`}>
              <SteamAvatar noLink steamID={pi.get('steamid')} size="tiny" />
              {pi.get('name')}
            </Link>
          </span>
        </td>
        <td className="date shrink hidden-xs">
          <TimeAgo date={data.get('date') * 1000} />
        </td>
      </tr>
      {expanded && (
        <LeaderboardItemPanel data={data} />
      )}
      {expanded && (
        <tr className="LeaderboardItemPanel-spacer">
          <td></td>
        </tr>
      )}
    </>
  )
}


function propsAreEqual(a, b) {
  return (
    a.data === b.data
    && a.firstPlace === b.firstPlace
    && a.expanded === b.expanded
  )
}


export default React.memo(LeaderboardItem, propsAreEqual)
