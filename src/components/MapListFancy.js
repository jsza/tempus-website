import React from 'react'

import MapListItem from './MapListItem'


export default class MapListFancy extends React.Component {
  render() {
    const items = this.props.data.map((item) =>
      <MapListItem key={item.get('id')} data={item} />
    )
    return (
      <div className="map-list fancy">
        {items}
      </div>
    )
  }
}
