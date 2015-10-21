import React from 'react'
import SteamAvatarContainer from '../containers/SteamAvatarContainer'
import {Link} from 'react-router'


export default class AppSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {shown: false}
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick)
  }

  onDocumentClick(event) {
    if (!this.refs.searchContainer.contains(event.target)) {
      this.setState({shown: false})
      console.log('hide')
    }
  }

  onFocus(event) {
    if (!this.state.shown) {
      this.setState({shown: true})
      console.log('show')
    }
  }

  render() {
    return (
      <div ref="searchContainer"
           className="app-search-container"
           onFocus={this.onFocus.bind(this)}
        >
        <input type="text"
               className="app-search-input"
               placeholder="Search"
          />
        <ul hidden={!this.state.shown} className="list-group app-search-results">
          <li className="list-group-item">
            <i>Enter player or map name</i>
          </li>

        </ul>
      </div>
    )
  }
}
