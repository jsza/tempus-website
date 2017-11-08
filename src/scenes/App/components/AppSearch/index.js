import React from 'react'
import SteamAvatarContainer from '../../../../containers/SteamAvatarContainer'
import {Link} from 'react-router'
import AppSearchInput from './components/AppSearchInput'
import AppSearchResults from './components/AppSearchResults'


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
    }
  }

  onClickDismiss(event) {
    this.setState({shown: false})
  }

  onFocus(event) {
    if (!this.state.shown) {
      this.setState({shown: true})
    }
  }

  render() {
    const {data, fetching, error} = this.props.searchData
    return (
      <div ref="searchContainer"
           className="app-search-container hidden-xs hidden-sm"
           onFocus={this.onFocus.bind(this)}
        >
        <AppSearchInput ref="searchInput" onChange={(val) => this.props.search(val)} />
        <AppSearchResults data={data}
                          fetching={fetching}
                          error={error}
                          shown={this.state.shown}
                          dismiss={this.onClickDismiss.bind(this)}
          />
      </div>
    )
  }
}
