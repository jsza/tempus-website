import React from 'react'
import {Link} from 'react-router'
import SteamAvatarContainer from '../containers/SteamAvatarContainer'


export default class AppSearchResults extends React.Component {
  renderResults(data) {
    let result = []
    data.maps.map((m) => {
      const mapName = m.get('name')
      result.push(
        <span>
          <span className="pull-right text-muted">
            Map
          </span>
          <Link to={`/maps/${mapName}`} onClick={this.props.dismiss}>
            {mapName}
          </Link>
        </span>
      )
    })
    data.players.map((p) => {
      result.push(
        <span>
          <span>
            <SteamAvatarContainer steamID={p.get('steamid')} size="mini" />
            <span> </span>
            <Link to={`/players/${p.get('id')}`} onClick={this.props.dismiss}>
              {p.get('name')}
            </Link>
          </span>
        </span>
      )
    })
    return result
  }

  render() {
    const {data, fetching, error} = this.props
    let items = []
    if (error) {
      items.push(
        <i className="text-danger">{error}</i>
      )
    }
    else if (fetching) {
      items.push(
        <span>
          <i className="fa fa-refresh fa-spin" />
        </span>
      )
    }
    else if (data) {
      if (data.players.size === 0 && data.maps.size === 0 ) {
        items.push(<i>No results.</i>)
      }
      else {
        items = this.renderResults(data)
      }
    }
    else {
      items.push(
        <i>Enter player or map name</i>
      )
    }
    return (
      <ul hidden={!this.props.shown} className="list-group app-search-results">
        {items.map((i) => <li className="list-group-item">{i}</li>)}
      </ul>
    )
  }
}
