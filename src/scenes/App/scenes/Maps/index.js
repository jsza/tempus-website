import React from 'react'
import {setFilter, toggleSimple, selectMapSort} from './actions'
import {connect} from 'react-redux'

import DocumentTitle from 'react-document-title'
import {Link} from 'react-router-dom'
import Throbber from 'root/components/Throbber'
import MapListFilters from './components/MapListFilters'
import MapListFancy from './components/MapListFancy'
import MapListSimple from './components/MapListSimple'

import './styles.styl'


function Maps({ fetching, error, data, filters, simple, sort,
                setFilter, toggleSimple, selectMapSort  }) {
  let content
  if (fetching || !data) {
    content = <Throbber />
  }
  else if (error) {
    content = <div>{error}</div>
  }
  else {
    content = (
      simple ?
      <MapListSimple
        data={data}
        filters={filters}
        sort={sort}
        selectMapSort={selectMapSort}
        /> :
      <MapListFancy data={data} filters={filters} />
    )
  }

  return (
    <DocumentTitle title={'Tempus - Maps'}>
      <div className="Maps container">
        <span className="clearfix">
          <MapListFilters className="pull-right"
                          simple={simple}
                          setFilter={setFilter}
                          filters={filters}
                          toggleSimple={toggleSimple}
            />
          <h1 style={{marginTop: 0, display: 'inline-block'}}>
            Maps
          </h1>
          <div>
            <span hidden={!data} className="pull-right text-muted">{data ? data.size : 0} result(s)</span>
            <p>These are all available to play on our <Link to="/servers">servers</Link>.</p>
          </div>
        </span>
        <div className="Maps-container">
          {content}
        </div>
      </div>
    </DocumentTitle>
  )
}


function mapStateToProps(state) {
  const {fetching, error, data, filters, simple, sort} = state.app.maps

  const {sortBy} = sort
  let keyPath = [sortBy]
  let defaultValue = undefined
  if (sortBy === 'soldierTier') {
    keyPath = ['tier_info', '3']
  }
  else if (sortBy === 'demomanTier') {
    keyPath = ['tier_info', '4']
  }
  else if (sortBy === 'bonusCount') {
    keyPath = ['zone_counts', 'bonus']
    defaultValue = 0
  }
  else if (sortBy === 'courseCount') {
    keyPath = ['zone_counts', 'course']
    defaultValue = 0
  }

  let processedData = null
  if (data) {
    processedData = data.filter((i) => {
      const sFilt = filters.get('soldier')
      const dFilt = filters.get('demoman')
      if (sFilt !== null) {
        return i.getIn(['tier_info', '3']) === sFilt
      }
      else if (dFilt !== null) {
        return i.getIn(['tier_info', '4']) === dFilt
      }
      return true
    }).sortBy((item) => item.getIn(keyPath, defaultValue))

    if (!sort.ascending) {
      processedData = processedData.reverse()
    }
  }
  return {fetching, error, data: processedData, filters, simple, sort}
}


export default connect(
  mapStateToProps,
  {setFilter, toggleSimple, selectMapSort}
)(Maps)
