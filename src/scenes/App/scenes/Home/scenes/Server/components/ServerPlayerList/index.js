import React from 'react'
import P from 'prop-types'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'

import {mapScreenshot} from 'root/utils/TempusUtils'
import SteamAvatar from 'root/components/SteamAvatar'

import './styles.styl'


export default class ServerPlayerList extends React.Component {
  render() {
    const {gameInfo} = this.props
    if (!gameInfo) {
      return (
        <div>
          <h4>
            Players
            <span className="text-danger pull-right">
              OFFLINE
            </span>
          </h4>
          Server is offline.
        </div>
      )
    }
    const totalPlayers = gameInfo.users.length
    const maxPlayers = gameInfo.maxPlayers
    return (
      <div className="ServerPlayerList">
        <h4>
          Players
          <span>: </span>
          <Link to={`/maps/${gameInfo.currentMap}`}>
            {gameInfo.currentMap}
          </Link>
          <span className="text-muted pull-right">
            {totalPlayers}/{maxPlayers}
          </span>
        </h4>
        <div className="table-container">
          {totalPlayers > 0
            ? <Table hover condensed>
                <tbody>
                  {gameInfo.users.map((u, idx) =>
                    <tr key={idx}>
                      <td>
                        <SteamAvatar steamID={u.steamid} size="tiny" />
                        &nbsp;
                        <Link to={`/players/${u.id}`}>{u.name}</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            : 'No one here right now.'
          }
        </div>
      </div>
    )
  }
}


ServerPlayerList.propTypes = {
  serverInfo: P.object.isRequired,
  gameInfo: P.object
}
