import React from 'react'
import {loadMaps} from '../redux/maps'
import {connect} from 'react-redux'


class MapsApp extends React.Component {
  componentDidMount() {
    this.props.loadMaps()
  }

  render() {
    if (!this.props.data) {
      return <div>Loading...</div>
    }

    const items = this.props.data.map((item) => {
      const name = item.get('name')
      const styles =
        { backgroundImage: `url(http://tempus.site.nfoservers.com/web/screenshots/raw/${name}_320p.jpeg)`
        }
      return (
        <span className="map-list-item" style={styles}>
          <span className="map-name">
            <strong>{item.get('name')}</strong>
            <br />
            <i>1 course</i>
          </span>
          <span className="map-info">
            <i className="fa fa-rocket" /> 6  <i className="fa fa-bomb" /> 5
          </span>
        </span>
      )
    }).toJS()
    return (
      <div className="maps-app">
        <div className="map-list">
          {items}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {maps} = state
  const {fetching, error, data} = maps
  return {fetching, error, data}
}


export default connect(
  mapStateToProps,
  {loadMaps}
)(MapsApp)
