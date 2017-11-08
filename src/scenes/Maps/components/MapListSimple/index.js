import React from 'react'
import classnames from 'classnames'
import Difficulties from 'root/constants/Difficulties'
import {Link} from 'react-router'
import LazyLoad from 'react-lazyload'


class MapListHeadings extends React.Component {
  render() {
    const {sortBy, ascending} = this.props.sort
    const headings =
      [ { title: 'Name'
        , sortName: 'name'
        }
      , { title: 'Soldier Tier'
        , sortName: 'soldierTier'
        }
      , { title: 'Demoman Tier'
        , sortName: 'demomanTier'
        }
      , { title: 'Bonuses'
        , sortName: 'bonusCount'
        }
      , { title: 'Courses'
        , sortName: 'courseCount'
        }
      ]
    return (
      <thead>
        <tr>
          {headings.map((h, idx) => {
            const iconClasses = classnames(
              ['fa', 'fa-fw'],
              { 'fa-caret-down': ascending
              , 'fa-caret-up': !ascending
              })
            return (
              <th key={idx}>
                <span
                  style={{cursor: 'pointer'}}
                  onClick={() => this.props.selectMapSort(h.sortName)}
                  >
                  {h.title} {sortBy === h.sortName ? <i className={iconClasses} /> : null}
                </span>
              </th>
            )
          })}
          <th />
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
            <b>{tier}</b> <span className="tier-text">{Difficulties.get(tier)}</span>
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
    let data = this.props.data
    data = data.sortBy((item) => item.getIn(keyPath, defaultValue))
    if (!sort.ascending) {
      data = data.reverse()
    }
    return (
      <div className="map-list simple">
        <table className="table table-condensed">
          <MapListHeadings sort={sort} selectMapSort={this.props.selectMapSort} />
          <tbody>
            {data.map((m, idx) => {
              const name = m.get('name')
              const bonusCount = m.getIn(['zone_counts', 'bonus'], 0)
              const courseCount = m.getIn(['zone_counts', 'course'], 0)
              return (
                <tr key={idx}>
                  <td>
                    <Link to={`/maps/${name}`}>
                      {name}
                    </Link>
                  </td>
                  <Tier tier={m.getIn(['tier_info', '3'])} />
                  <Tier tier={m.getIn(['tier_info', '4'])} />
                  <td>
                    {bonusCount > 0 ? <span><i className="fa fa-star" /> {bonusCount}</span> : 'None'}
                  </td>
                  <td>
                    {courseCount > 0 ? <span><i className="fa fa-flag" /> {courseCount}</span> : 'Linear'}
                  </td>
                  <td width="10">
                    <a href={`http://tempus.site.nfoservers.com/server/maps/${name}.bsp.bz2`}>
                      <i className="fa fa-download" />
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
