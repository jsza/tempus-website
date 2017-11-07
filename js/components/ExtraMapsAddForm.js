import React from 'react'
import P from 'prop-types'
import classnames from 'classnames'

import {Button, FormGroup, FormControl} from 'react-bootstrap'


export default class ExtraMapsAddForm extends React.Component {
  constructor(props) {
    super(props)
    this.state =
      { value: ''
      }
  }

  onClickAdd() {
    if (this.state.value.length === 0) {
      return
    }
    this.props.addExtraMap(this.state.value)
    this.setState({value: ''})
  }

  onInputKeyUp(event) {
    if (event.key === 'Enter') {
      this.onClickAdd()
    }
  }

  renderButton() {
    const {adding} = this.props
    const iconClasses = classnames(
      { 'fa': true
      , 'fa-plus': !adding
      , 'fa-cog fa-spin': adding
      })
    return (
      <Button
        bsStyle="primary"
        onClick={this.onClickAdd.bind(this)}
        disabled={adding}>
        <i className={iconClasses} /> Add map
      </Button>
    )
  }

  render() {
    const {addingError} = this.props
    return (
      <div className="form-inline">
        <FormGroup>
          <FormControl
            placeholder="Enter map name"
            value={this.state.value}
            onChange={(e) => this.setState({value: e.target.value})}
            onKeyUp={this.onInputKeyUp.bind(this)}
          />
        </FormGroup>
        <span> </span>
        {this.renderButton()}
        {addingError
        ? <p className="text-danger">
            {addingError}
          </p>
        : null}
      </div>
    )
  }
}


ExtraMapsAddForm.propTypes =
  { adding: P.bool.isRequired
  , addingError: P.string
  , addExtraMap: P.func.isRequired
  }
