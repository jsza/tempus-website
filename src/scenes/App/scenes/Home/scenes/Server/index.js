import React, {PropTypes as P} from 'react'

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadServers} from '../../services/servers/actions'
import SteamAvatar from 'root/components/SteamAvatar'
import ServerPlayerList from './components/ServerPlayerList'
import ServerDemoList from './scenes/ServerDemoList'

import './styles.styl'


class Server extends React.Component {
  componentDidMount() {
    if (!this.props.data && !this.props.fetching) {
      this.props.loadServers()
    }
  }

  renderUsers() {

  }

  render() {
    const {data, fetching, error} = this.props
    if (!this.props.data || this.props.fetching) {
      return <div>Loading...</div>
    }
    const server = data.find(s => s.getIn(['server_info', 'id']) == this.props.match.params.id)
    if (!server) {
      return <div>Server not found.</div>
    }
    var gameInfo = server.get('game_info')
    gameInfo = gameInfo ? gameInfo.toJS() : null
    const serverInfo = server.get('server_info').toJS()
    return (
      <div className="Home-Server">
        <div className="header clearfix">
          <h3 className="page-title" style={{verticalAlign: 'middle'}}>
            <span> </span>
            <Link to="/servers">servers/</Link>
            {serverInfo.name}
          </h3>
          <div className="flag-container">
            <span className={`flag-icon flag-icon-${serverInfo.shortname.slice(0, 2).toLowerCase()}`} />
          </div>
          <h4 className={`status ${gameInfo ? 'online' : 'offline'}`} />
          <table className="server-info-table">
            <tbody>
              <tr>
                <td className="info-label">
                  <strong>Address</strong>
                </td>
                <td>
                  {serverInfo.addr}:{serverInfo.port}
                  &nbsp;&nbsp;
                  <a href={`steam://connect/${serverInfo.addr}:${serverInfo.port}`}>
                    connect
                  </a>
                </td>
              </tr>
              <tr>
                <td className="info-label">
                  <strong>Location</strong>
                </td>
                <td>
                  {serverInfo.country}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <Row>
          <Col md={6}>
            <div className="panel panel-default players-panel">
              <div className="panel-body">
                <ServerPlayerList serverInfo={serverInfo} gameInfo={gameInfo} />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="panel panel-default demos-panel">
              <div className="panel-body">
                <ServerDemoList serverID={serverInfo.id} />
              </div>
            </div>
          </Col>
        </Row>
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
)(Server)
