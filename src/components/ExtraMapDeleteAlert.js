import React from 'react'
import P from 'prop-types'
import IP from 'react-immutable-proptypes'

import {Alert, Button} from 'react-bootstrap'


export default class ExtraMapDeleteAlert extends React.Component {
  render() {
    const {lastDelete} = this.props
    if (!lastDelete) {
      return <span />
    }
    return (
      <Alert bsStyle="success" onDismiss={this.props.onDismiss}>
        <h4>
          Deleted <b>{lastDelete.name}</b>
        </h4>
        <p>
          <Button bsStyle="success" onClick={this.props.undoLastDelete}>
            Undo
          </Button>
          <span> or </span>
          <Button onClick={this.props.onDismiss}>
            Hide alert
          </Button>
        </p>
      </Alert>
    )
  }
}



ExtraMapDeleteAlert.propTypes =
  { lastDelete: IP.record
  , undoLastDelete: P.func.isRequired
  , onDismiss: P.func.isRequired
  }
