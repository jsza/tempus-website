import React from 'react'

import MapListItem from './components/MapListItem'

import './styles.styl'


export default class MapListFancy extends React.Component {
  render() {
    const items = this.props.data.map((item) =>
      <MapListItem key={item.get('id')} data={item} />
    )
    return (
      <div className="Maps-MapListFancy">
        {items}
      </div>
    )
  }
}
