import React from 'react'
import {loadMaps, resetMaps, setFilter, toggleSimple, selectMapSort} from '../redux/maps'
import {connect} from 'react-redux'
import classnames from 'classnames'

import DocumentTitle from 'react-document-title'
import Throbber from '../components/Throbber'
import MapListFilters from '../components/MapListFilters'
import MapListFancy from '../components/MapListFancy'
import MapListSimple from '../components/MapListSimple'


class MapsApp extends React.Component {
  componentDidMount() {
    this.props.loadMaps()
  }

  componentWillUnmount() {
    this.props.resetMaps()
  }

  render() {
    let content, data
    if (this.props.fetching || !this.props.data) {
      content = <Throbber />
    }
    else if (this.props.error) {
      content = <div>{this.props.error}</div>
    }
    else {
      data = this.props.data.filter((i) => {
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
      content = (
        this.props.simple ?
        <MapListSimple
          data={data}
          filters={this.props.filters}
          sort={this.props.sort}
          selectMapSort={this.props.selectMapSort}
          /> :
        <MapListFancy data={data} filters={this.props.filters} />
      )
    }

    return (
      <DocumentTitle title={'Tempus - Maps'}>
        <div className="container">
          <span className="clearfix">
            <MapListFilters className="pull-right"
                            simple={this.props.simple}
                            setFilter={this.props.setFilter}
                            filters={this.props.filters}
                            toggleSimple={this.props.toggleSimple}
              />
            <h1 style={{marginTop: 0, display: 'inline-block'}}>
              Maps
            </h1>
            <div>
              <span hidden={!data} className="pull-right text-muted">{data ? data.size : 0} result(s)</span>
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
  const {fetching, error, data, filters, simple, sort} = maps
  return {fetching, error, data, filters, simple, sort}
}


export default connect(
  mapStateToProps,
  {loadMaps, resetMaps, setFilter, toggleSimple, selectMapSort}
)(MapsApp)
