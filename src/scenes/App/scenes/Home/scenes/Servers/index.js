import React, {PropTypes as P} from 'react'
import {Row, Col, Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import {loadServers, toggleFilter} from '../../services/servers/actions'
import ServerItem from './components/ServerItem'
import ServerFilters from './components/ServerFilters'

import './styles.styl'


class Servers extends React.Component {
  componentDidMount() {
    if (!this.props.data && !this.props.fetching) {
      this.props.loadServers()
    }
  }

  renderServers() {
    const {filter, filterReverse} = this.props
    let data = this.props.data
    if (filter === 'server') {
      data = data.sortBy(s => {
        const si = s.get('server_info').toJS()
        return [si.country, si.name]
      })
    }
    else if (filter === 'mapname') {
      data = data.sortBy(s => {
        const gi = s.get('game_info')
        return gi ? gi.get('currentMap') : 'Z'
      })
    }
    else if (filter === 'playercount') {
      data = data.sortBy(s => {
        const gi = s.get('game_info')
        return gi ? gi.get('users').size : 0
      }).reverse()
    }

    if (filterReverse) {
      data = data.reverse()
    }

    return (
      data.map((server, idx) => {
        if (!server) {
          return
        }
        const serverInfo = server.get('server_info')
        const gameInfo = server.get('game_info')
        if (serverInfo.get('hidden')) {
          return
        }
        return (
          <ServerItem key={idx} serverInfo={serverInfo} gameInfo={gameInfo} />
        )
      })
    )
  }

  render() {
    const {data, fetching, filter, filterReverse} = this.props
    if (!data || fetching) {
      return <div>Loading...</div>
    }
    const totalPlayers = data.reduce((total, server) => {
      const gameInfo = server.get('game_info')
      return gameInfo ? total + gameInfo.get('users').size : total
    }, 0)
    return (
      <div className="Home-Servers">
        <Table>
          <ServerFilters filter={filter} filterReverse={filterReverse}
                         toggleFilter={this.props.toggleFilter} />
          <tbody>
            {this.renderServers()}
          </tbody>
        </Table>
        <span className="text-muted">{totalPlayers} player(s) online</span>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {fetching, error, data, filter, filterReverse} = state.servers
  return (
    { fetching
    , error
    , data
    , filter
    , filterReverse
    })
}


export default connect(
  mapStateToProps,
  {loadServers, toggleFilter}
)(Servers)
