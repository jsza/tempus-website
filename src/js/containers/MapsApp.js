import React from 'react'
import {loadMaps, resetMaps, setFilter} from '../redux/maps'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import MapListItem from '../components/MapListItem'
import Throbber from '../components/Throbber'
import MapListFilters from '../components/MapListFilters'


class MapsApp extends React.Component {
  componentDidMount() {
    this.props.loadMaps()
  }

  componentWillUnmount() {
    this.props.resetMaps()
  }

  render() {
    let content, items
    if (this.props.fetching || !this.props.data) {
      content = <Throbber />
    }
    else if (this.props.error) {
      content = <div>{this.props.error}</div>
    }
    else {
      items = this.props.data
        .filter((i) => {
          const sFilt = this.props.filters.get('soldier')
          const dFilt = this.props.filters.get('demoman')
          if (sFilt !== null) {
            return i.getIn(['tier_info', '3']) === sFilt
          }
          else if (dFilt !== null) {
            return i.getIn(['tier_info', '4']) === dFilt
          }
          return true
        })
        .map((item) => <MapListItem key={item.get('id')} data={item} />)
      content = (
        <div>
          <div className="map-list">
            {items}
          </div>
        </div>
      )
    }

    return (
      <DocumentTitle title={'Tempus - Maps'}>
        <div className="container">
          <span className="clearfix">
            <MapListFilters className="pull-right"
                            setFilter={this.props.setFilter}
                            filters={this.props.filters}
              />
            <h1 style={{marginTop: 0, display: 'inline-block'}}>
              Maps
            </h1>
            <div>
              <span hidden={!items} className="pull-right text-muted">{items ? items.size : 0} result(s)</span>
              <p>These are all available to play on Tempus servers.</p>
            </div>
          </span>
          <div className="maps-app">
            {content}
          </div>
        </div>
      </DocumentTitle>
    )
  }
}


function mapStateToProps(state) {
  const {maps} = state
  const {fetching, error, data, filters} = maps
  return {fetching, error, data, filters}
}


export default connect(
  mapStateToProps,
  {loadMaps, resetMaps, setFilter}
)(MapsApp)
