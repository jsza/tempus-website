import React from 'react'
import P from 'prop-types'

import './styles.styl'


const filters = [
  {
    type: 'server',
    title: 'Server'
  },
  {
    type: 'mapname',
    title: 'Map'
  },
  {
    type: 'playercount',
    title: 'Players'
  }
]


export default class ServerFilters extends React.Component {
  render() {
    const {filter, filterReverse} = this.props
    return (
      <thead className="ServerFilters">
        <tr>
          {filters.map(f => (
            <th onClick={ev => this.props.toggleFilter(f.type)}>
              {f.title}
              &nbsp;
              {filter === f.type
               ? <i className={`fa fa-chevron-${filterReverse ? 'up' : 'down'}`} />
               : null
              }
            </th>
          ))}
          <th />
        </tr>
      </thead>
    )
  }
}


ServerFilters.propTypes = {
  toggleFilter: P.func.isRequired,
  filter: P.string.isRequired,
  filterReverse: P.bool.isRequired
}
