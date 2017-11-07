import React from 'react'
import P from 'prop-types'
import IP from 'react-immutable-proptypes'
import {connect} from 'react-redux'
import {loadExtraMaps, addExtraMap, updateExtraMap, deleteExtraMap,
        dismissLastDelete, undoLastDelete} from '../redux/extraMaps'

import {Table, Alert, Button} from 'react-bootstrap'
import Throbber from '../components/Throbber'
import ExtraMapsAddForm from '../components/ExtraMapsAddForm'
import ExtraMapItem from '../components/ExtraMapItem'
import ExtraMapDeleteAlert from '../components/ExtraMapDeleteAlert'


class ExtraMapsApp extends React.Component {
  componentDidMount() {
    this.props.loadExtraMaps()
  }

  render() {
    const {fetching, fetchingError, data} = this.props
    let content
    if (fetchingError) {
      content = (
        <p className="text-danger">
          {fetchingError}
        </p>
      )
    }
    else if (fetching || !data) {
      content = <Throbber />
    }
    else {
      content = (
        <div className="extra-maps-app">
          <Table condensed striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Soldier Tier</th>
                <th>Demoman Tier</th>
                <th>URL</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.data.valueSeq().map((item, idx) =>
                <ExtraMapItem
                  key={idx}
                  data={item}
                  updateExtraMap={this.props.updateExtraMap}
                  deleteExtraMap={this.props.deleteExtraMap}
                  updating={this.props.updating}
                  />
              )}
            </tbody>
          </Table>
          <ExtraMapsAddForm
            addExtraMap={this.props.addExtraMap}
            adding={this.props.adding}
            addingError={this.props.addingError} />
        </div>
      )
    }
    return (
      <div className="container app-container solid">
        <h1 className="page-title">jump.tf Maps</h1>
        <ExtraMapDeleteAlert
          lastDelete={this.props.lastDelete}
          onDismiss={this.props.dismissLastDelete}
          undoLastDelete={this.props.undoLastDelete}
          />
        {content}
      </div>
    )
  }
}


ExtraMapsApp.propTypes =
  { fetching: P.bool.isRequired
  , fetchingError: P.string
  , data: IP.orderedMap
  , updating: P.bool.isRequired
  , updatingError: P.string
  , deleting: P.bool.isRequired
  , deletingError: P.string
  }


function mapStateToProps(state) {
  const {extraMaps} = state
  return extraMaps.toObject()
}


export default connect(
  mapStateToProps,
  {loadExtraMaps, addExtraMap, updateExtraMap, deleteExtraMap,
   dismissLastDelete, undoLastDelete}
)(ExtraMapsApp)
