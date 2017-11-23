import React from 'react'
import P from 'prop-types'
import {Link} from 'react-router-dom'

import './styles.styl'


export default class ServerItem extends React.Component {
  render() {
    const {serverInfo, gameInfo} = this.props
    const serverAddr =
      `steam://connect/${serverInfo.get('addr')}:${serverInfo.get('port')}`

    return (
      <tr className="Home-Servers-ServerItem">
        <td className="name">
          <span className="flag-container">
            <span className={`flag-icon flag-icon-${serverInfo.get('shortname').slice(0, 2).toLowerCase()}`}/>
          </span>
          <span> </span>
          <Link to={`/servers/${serverInfo.get('id')}`}>
            <strong>{serverInfo.get('name')}</strong>
          </Link>
        </td>
        <td>
          <span className="currentmap">
            {gameInfo
              ? <Link to={`/maps/${gameInfo.get('currentMap')}`}>
                  {gameInfo.get('currentMap')}
                </Link>
              : null
            }
          </span>
        </td>
        <td>
          {gameInfo
            ? `${gameInfo.get('users').size}/${gameInfo.get('maxPlayers')}`
            : null
          }
        </td>
        {gameInfo
          ? <td className="status online">
              <a href={serverAddr}>connect</a>
            </td>
          : <td className="status offline">
              OFFLINE
            </td>
        }
      </tr>
    )
  }
}


ServerItem.propTypes =
  { serverInfo: P.object.isRequired
  , gameInfo: P.object
  }
