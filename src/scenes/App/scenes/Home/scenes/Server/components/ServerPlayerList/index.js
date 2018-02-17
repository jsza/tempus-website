import React from 'react'
import P from 'prop-types'
import {Link} from 'react-router-dom'
import Table from 'react-bootstrap/lib/Table'
import Transition from 'react-motion-ui-pack/lib/Transition'

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
          <Table hover condensed>
            <Transition
              component="tbody"
              enter={{opacity: 1}}
              leave={{opacity: 0}}
            >
              {gameInfo.users.map((u, idx) =>
                <tr className="ServerPlayerList-item" key={idx}>
                  <td>
                    <Link to={`/players/${u.id}`}>{u.name}</Link>
                  </td>
                </tr>
              )}
            </Transition>
          </Table>
        </div>
      </div>
    )
  }
}


ServerPlayerList.propTypes = {
  serverInfo: P.object.isRequired,
  gameInfo: P.object
}
