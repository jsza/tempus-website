import React from 'react'
import P from 'prop-types'

import {FormControl, FormGroup} from 'react-bootstrap'


export default class ExtraMapAuthorSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
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
    this.props.searchAuthors(this.state.value)
  }

  onInputKeyUp(event) {
    if (event.key === 'Enter') {
      this.clearTimeout()
      this.triggerLoad()
    }
  }

  onInputChange(event) {
    this.setState({value: event.target.value})
    this.startTimeout()
  }

  render() {
    return (
      <FormGroup
        value={this.state.value}
        onChange={this.onInputChange.bind(this)}
        onKeyUp={this.onInputKeyUp.bind(this)}
        >
        <FormControl placeholder="Search authors">
        </FormControl>
      </FormGroup>
    )
  }
}


ExtraMapAuthorSearch.propTypes =
  { searchAuthors: P.func.isRequired
  }
