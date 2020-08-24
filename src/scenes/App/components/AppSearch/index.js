import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

import SteamAvatar from 'root/components/SteamAvatar'
import {Link} from 'react-router-dom'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import AppSearchInput from './components/AppSearchInput'
import AppSearchResults from './components/AppSearchResults'
import {searchPlayersAndMaps} from './actions'


// export default function AppSearch({ data, fetching, error, search }) {
//   const [shown, setShown] = useState()
//   useEffect(() => {
//
//   }, [])
// }


class AppSearch extends React.Component {
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
    this.setState({shown: true})
  }

  onBlur(event) {
    this.setState({shown: false})
  }

  render() {
    const {data, fetching, error} = this.props.searchData
    return (
      <div ref="searchContainer">
        <FormGroup
            className="app-search-container hidden-xs hidden-sm"
            onFocus={this.onFocus.bind(this)}
          >
          <AppSearchInput ref="searchInput" onChange={(val) => this.props.searchPlayersAndMaps(val)} />
          <AppSearchResults data={data}
                            fetching={fetching}
                            error={error}
                            shown={this.state.shown}
                            dismiss={this.onClickDismiss.bind(this)}
            />
        </FormGroup>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {search} = state.app
  return {searchData: search}
}


export default withRouter(connect(
  mapStateToProps,
  {searchPlayersAndMaps}
)(AppSearch))
