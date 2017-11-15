import React, {PropTypes as P} from 'react'
import {Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {loadServers} from './services/servers/actions'
import Server from './components/Server'

import './styles.styl'


class Servers extends React.Component {
  componentDidMount() {
    this.props.loadServers()
  }
  render() {
    if (!this.props.data || this.props.fetching) {
      return <div>Loading...</div>
    }
    console.log(this.props.data.toJS())
    return (
      <div className="Home-Servers">
        <div className="Home-Servers-list">
          {this.props.data.map((server, idx) => {
            const serverInfo = server.get('server_info')
            const gameInfo = server.get('game_info')
            if (serverInfo.get('hidden')) {
              return
            }
            return (
              <div className="server-container">
                <Server serverInfo={serverInfo} gameInfo={gameInfo} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {fetching, error, data} = state.servers
  return (
    { fetching
    , error
    , data
    })
}


export default connect(
  mapStateToProps,
  {loadServers}
)(Servers)
