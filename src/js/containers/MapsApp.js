import React from 'react'
import {loadMaps, resetMaps} from '../redux/maps'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import MapListItem from '../components/MapListItem'
import Throbber from '../components/Throbber'


class MapsApp extends React.Component {
  componentDidMount() {
    this.props.loadMaps()
  }

  componentWillUnmount() {
    this.props.resetMaps()
  }

  render() {
    let content
    if (this.props.fetching || !this.props.data) {
      content = <Throbber />
    }
    else if (this.props.error) {
      content = <div>{this.props.error}</div>
    }
    else {
      const items = this.props.data.map((item) => <MapListItem key={item.get('id')} data={item} />)
      content = (
        <div className="map-list">
          {items}
        </div>
      )
    }

    return (
      <DocumentTitle title={'Tempus - Maps'}>
        <div className="container maps-app">
          {content}
        </div>
      </DocumentTitle>
    )
  }
}


function mapStateToProps(state) {
  const {maps} = state
  const {fetching, error, data} = maps
  return {fetching, error, data}
}


export default connect(
  mapStateToProps,
  {loadMaps, resetMaps}
)(MapsApp)
