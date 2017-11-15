import React from 'react'
import P from 'prop-types'

import './styles.styl'


export default class Server extends React.Component {
  render() {
    const {serverInfo, gameInfo} = this.props
    const serverAddr = `steam://connect/
                        ${serverInfo.get('addr')}:${serverInfo.get('port')}`

    const bgStyle = {backgroundImage:
                     `url(http://tempus.site.nfoservers.com/web/screenshots/raw/${gameInfo.get('currentMap')}_160p.jpeg)`}

    var body
    if (gameInfo) {
      body = (
        <div>
          ???
        </div>
      )
    }
    else {
      body = (
        <div>
          <span className="playercount">
            ({gameInfo.get('users').size}/{gameInfo.get('maxPlayers')})
          </span>
          <span> </span>
          <span className="currentmap">
            {gameInfo.get('currentMap')}
          </span>
        </div>
      )
    }
    return (
      <div className="Home-Servers-Server">
        <div className="bg-overlay" style={bgStyle}>
        </div>
        <div className="inner">
          <div className="server-header">
            <span className="name">
              {serverInfo.get('name')}
            </span>
            {gameInfo
              ? <span className="status online">
                  <a href={serverAddr}>connect</a>
                </span>
              : <span className="status offline">
                  OFFLINE
                </span>
            }
          </div>
          <div>
            {gameInfo
              ? <div>
                  <span className="playercount">
                    ({gameInfo.get('users').size}/{gameInfo.get('maxPlayers')})
                  </span>
                  <span> </span>
                  <span className="currentmap">
                    {gameInfo.get('currentMap')}
                  </span>
                </div>
              : '???'
            }
          </div>
        </div>
      </div>
    )
  }
}


Server.propTypes =
  { serverInfo: P.object.isRequired
  , gameInfo: P.object
  }
