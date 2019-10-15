import React from 'react'
import classnames from 'classnames'
import Difficulties from 'root/constants/Difficulties'
import {Link} from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import P from 'prop-types'
import IP from 'react-immutable-proptypes'

import ZoneIcon from 'root/components/ZoneIcon'

import './styles.styl'


const headingNames =
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


function MapListHeadings({ sort: {sortBy, ascending}, selectMapSort } ) {
  return (
    <thead>
      <tr>
        {headingNames.map((h, idx) => {
          const iconClasses = classnames(
            ['fa', 'fa-fw'],
            { 'fa-caret-down': ascending
            , 'fa-caret-up': !ascending
            })
          return (
            <th key={idx}>
              <span
                style={{cursor: 'pointer'}}
                onClick={() => selectMapSort(h.sortName)}
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


MapListHeadings.propTypes = (
  { sort: P.object.isRequired
  , selectMapSort: P.func.isRequired
  })


const Tier = ({ tier }) =>
  <td className={'tier-' + tier}>
    {tier !== -1
    ? <span className={'tier-container tier-' + tier}>
        <b>{tier}</b> <span className="tier-text">{Difficulties.get(tier)}</span>
      </span>
    : 'Not Set'
    }
  </td>


Tier.propTypes = (
  { tier: P.number.isRequired
  })


const MapListSimple = ({ data, filters, sort, selectMapSort}) =>
  <div className="Maps-MapListSimple">
    <table className="table table-condensed">
      <MapListHeadings sort={sort} selectMapSort={selectMapSort} />
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
                {bonusCount > 0 ? <span><ZoneIcon type="bonus" /> {bonusCount}</span> : 'None'}
              </td>
              <td>
                {courseCount > 0 ? <span><ZoneIcon type="course" /> {courseCount}</span> : 'Linear'}
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


MapListSimple.propTypes = (
  { data: IP.list.isRequired
  , filters: IP.map.isRequired
  , sort: IP.record.isRequired
  , selectMapSort: P.func.isRequired
  })


export default MapListSimple
