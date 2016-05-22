import React from 'react'
import classnames from 'classnames'
import Difficulties from '../constants/Difficulties'
import {Link} from 'react-router'


class MapListHeadings extends React.Component {
  render() {
    const {sortBy, ascending} = this.props.sort
    const headings =
      [ { title: 'Map'
        , sortName: 'name'
        }
      , { title: 'Soldier Tier'
        , sortName: 'soldierTier'
        }
      , { title: 'Demoman Tier'
        , sortName: 'demomanTier'
        }
      ]
    return (
      <thead>
        <tr>
          {headings.map(h => {
            const iconClasses = classnames(
              ['fa', 'fa-fw'],
              { 'fa-caret-down': ascending
              , 'fa-caret-up': !ascending
              })
            return (
              <th>
                <span
                  style={{cursor: 'pointer'}}
                  onClick={() => this.props.selectMapSort(h.sortName)}
                  >
                  {h.title} {sortBy === h.sortName ? <i className={iconClasses} /> : null}
                </span>
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }
}


class Tier extends React.Component {
  render() {
    const {tier} = this.props
    return (
      <td className={'tier-' + tier}>
        {tier !== -1
        ? <span className={'tier-container tier-' + tier}>
            <b>{tier}</b> {Difficulties.get(tier)}
          </span>
        : 'Not Set'
        }
      </td>
    )
  }
}


export default class MapListSimple extends React.Component {
  render() {
    const {sort} = this.props
    let {sortBy} = sort
    let keyPath = [sortBy]
    if (sortBy === 'soldierTier') {
      keyPath = ['tier_info', '3']
    }
    else if (sortBy === 'demomanTier') {
      keyPath = ['tier_info', '4']
    }
    let data = this.props.data
    data = data.sortBy(item => item.getIn(keyPath))
    if (!sort.ascending) {
      data = data.reverse()
    }
    return (
      <div className="map-list simple">
        <table className="table table-condensed">
          <MapListHeadings sort={sort} selectMapSort={this.props.selectMapSort} />
          <tbody>
            {data.map((m) => {
              const name = m.get('name')
              return (
                <tr>
                  <td>
                    <Link to={`/maps/${name}`}>
                      {name}
                    </Link>
                  </td>
                  <Tier tier={m.getIn(['tier_info', '3'])} />
                  <Tier tier={m.getIn(['tier_info', '4'])} />
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
