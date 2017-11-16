import React from 'react'
import SteamAvatar from 'root/components/SteamAvatar'
import {Link} from 'react-router-dom'
import {FormGroup} from 'react-bootstrap'
import AppSearchInput from './components/AppSearchInput'
import AppSearchResults from './components/AppSearchResults'


export default class AppSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {shown: false}
  }

  onClickDismiss(event) {
    this.setState({shown: false})
  }

  onFocus(event) {
    this.setState({shown: true})
  }

  onBlur(event) {
    this.setState({shown: false})
  }

  render() {
    const {data, fetching, error} = this.props.searchData
    return (
      <FormGroup
          ref="searchContainer"
          className="app-search-container hidden-xs hidden-sm"
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
        >
        <AppSearchInput ref="searchInput" onChange={(val) => this.props.search(val)} />
        <AppSearchResults data={data}
                          fetching={fetching}
                          error={error}
                          shown={this.state.shown}
                          dismiss={this.onClickDismiss.bind(this)}
          />
      </FormGroup>
    )
  }
}
