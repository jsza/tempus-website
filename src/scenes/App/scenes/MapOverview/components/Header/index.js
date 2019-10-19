import React from 'react'
import P from 'prop-types'
import IP from 'react-immutable-proptypes'

import ZoneIcon from 'root/components/ZoneIcon'
import TFIcon from 'root/components/TFIcon'
import Author from './components/Author'

import './styles.styl'


const Header = ({ data, match }) =>
  <header className="MapOverview-header">
    <div className="header-title">
      <div className="header-title-inner">
        <div className="header-container">
          <h1>
            {data.getIn(['map_info', 'name'])}{' '}
            <br className="hidden-lg hidden-md" />
            <div>
              <small>
                by <Author authors={data.get('authors')} match={match} />
              </small>
            </div>
          </h1>
          <div className="map-info-list-container">
            <ul className="map-info-list">
              {/* TODO: Enable when we have data for this */}
              {/* <li className=""> */}
              {/*   <i className="tf-icon soldier auto" />{'+'} */}
              {/*   <i className="tf-icon demoman auto" /> */}
              {/* </li> */}
              {['course', 'bonus'].map((type, idx) =>
                <li key={`zone-counts-${idx}`}>
                  <ZoneIcon type={type} /> {data.getIn(['zone_counts', type], type === 'course' ? 1 : 0)}
                </li>
              )}
              {['soldier', 'demoman'].map((cls, idx) =>
                <li key={`map-tiers-${idx}`}>
                  <TFIcon tfClass={cls} size="auto" /> {`T${data.getIn(['tier_info', cls])}`}
                </li>
              )}
              <li>
                <a
                  className="btn btn-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: 0, color: '#00b4f0' }}
                  href={`http://tempus.site.nfoservers.com/server/maps/${data.getIn(
                    ['map_info', 'name']
                  )}.bsp.bz2`}
                >
                  <i className="fas fa-download" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>


Header.propTypes =
  { data: IP.map.isRequired
  , match: P.object.isRequired
  }


export default Header
