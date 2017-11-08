import React from 'react'
import P from 'prop-types'
import {connect} from 'react-redux'
import {loadAuthors, searchAuthors, addAuthor,
        removeAuthor, loadExtraMaps} from '../redux/extraMaps'

import {Modal, Button, Row, Col} from 'react-bootstrap'
import ExtraMapAuthorList from './ExtraMapAuthorList'
import ExtraMapAuthorSearch from './ExtraMapAuthorSearch'


class ExtraMapAuthor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
  }

  onShow(event) {
    event.preventDefault()
    this.setState({show: true})
    this.props.loadAuthors(this.props.id)
    this.props.searchAuthors()
  }

  hide() {
    this.setState({show: false})
    this.props.loadExtraMaps()
  }

  renderAuthor() {
    if (this.props.author_count === 0) {
      return <i>Not Set</i>
    }
    else if (this.props.author_count === 1) {
      return this.props.author_name
    }
    else {
      return <i>Multiple</i>
    }
  }

  renderModal() {
    if (!this.state.show) {
      return null
    }
    let {data, searchData} = this.props
    if (data) {
      data = data.valueSeq().toList()
    }
    if (searchData) {
      searchData = searchData.valueSeq().toList()
    }
    let filterSearch = searchData
    if (data && searchData) {
      const addedIDs = data.map((i) => i.get('author_id'))
      filterSearch = filterSearch.filter((item) => {
        return !addedIDs.contains(item.get('id'))
      })
    }

    return (
      <Modal show={true} onHide={this.hide.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Modify authors for <strong>{this.props.name}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExtraMapAuthorSearch searchAuthors={this.props.searchAuthors} />
          <Row>
            <Col lg={6}>
              <ExtraMapAuthorList
                id={this.props.id}
                data={data}
                icon="minus"
                onSelect={this.props.removeAuthor}
                />
            </Col>
            <Col lg={6}>
              <ExtraMapAuthorList
                id={this.props.id}
                data={filterSearch}
                icon="plus"
                onSelect={this.props.addAuthor}
                />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hide.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    return (
      <div>
        <span>
          {this.renderAuthor()} &bull; <a href="#" onClick={this.onShow.bind(this)}>modify</a>
        </span>
        {this.renderModal()}
      </div>
    )
  }
}



function mapStateToProps(state) {
  const {authors} = state.extraMaps
  return authors.toObject()
}



export default connect(
  mapStateToProps,
  {loadAuthors, searchAuthors, addAuthor, removeAuthor, loadExtraMaps}
)(ExtraMapAuthor)
