import React from 'react'
import P from 'prop-types'
import {FormControl} from 'react-bootstrap'


export default class AppSearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {searchValue: null}
  }

  startTimeout() {
    this.clearTimeout()
    this.timeoutID = window.setTimeout(this.triggerLoad.bind(this), 400)
  }

  clearTimeout() {
    if (this.timeoutID) {
      window.clearTimeout(this.timeoutID)
      delete this.timeoutID
    }
  }

  triggerLoad() {
    const s = this.state.searchValue
    if (s !== null && s.length > 0) {
      this.props.onChange(this.state.searchValue)
    }
  }

  onInputChange(event, blah) {
    this.setState({searchValue: event.target.value})
    this.startTimeout()
  }

  onInputFocus(event) {
    event.target.select()
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.clearTimeout()
      this.triggerLoad()
    }
  }

  render() {
    return (
      <FormControl type="text"
                   className="app-search-input"
                   placeholder="Search"
                   onChange={this.onInputChange.bind(this)}
                   onKeyPress={this.onKeyPress.bind(this)}
                   onFocus={this.onInputFocus} />
    )
  }
}


AppSearchInput.propTypes =
  { onChange: P.func.isRequired
  }
