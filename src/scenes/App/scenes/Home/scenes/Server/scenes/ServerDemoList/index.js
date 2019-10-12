import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Table from 'react-bootstrap/lib/Table'
import TimeAgo from 'react-timeago'

import {loadServerDemos} from './actions'

import './styles.styl'


class ServerDemoList extends React.Component {
  componentDidMount() {
    this.props.loadServerDemos(this.props.serverID)
  }

  render() {
    const {data, fetching, error} = this.props

    let body
    if (error) {
      body = <div className="text-danger">{error}</div>
    }
    else if (fetching || !data) {
      body = 'Loading...'
    }
    else {
      body = (
        <div>
          <Table hover condensed>
            <tbody>
              {data.map((demo, idx) => {
                const {id, recording, url, requested, date, mapname} = demo.toJS()
                let demoStatus
                if (url) {
                  demoStatus = <a target="_blank" href={url}>download</a>
                }
                else if (recording) {
                  if (requested)
                    demoStatus = <span className="text-muted">requested</span>
                  else
                    demoStatus = <span className="text-muted">recording</span>
                }
                else if (requested)
                  demoStatus = <span className="text-muted">uploading</span>

                return (
                  <tr key={idx}>
                    <td>
                      <TimeAgo className="text-muted" date={date * 1000} />
                    </td>
                    <td>
                      <Link to={`/demos/${id}`}>
                        {mapname}
                      </Link>
                    </td>
                    <td className="demo-status">
                      {demoStatus}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      )
    }
    return (
      <div className="ServerDemoList">
        <h4>
          Demos
        </h4>
        <div className="body-container">
          {body}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {fetching, error, data} = state.app.serverDemos
  return ({
    fetching,
    error,
    data
  })
}


export default connect(
  mapStateToProps,
  {loadServerDemos}
)(ServerDemoList)
