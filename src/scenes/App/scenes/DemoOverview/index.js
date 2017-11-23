import React from 'react'
import P from 'prop-types'
import IP from 'react-immutable-proptypes'
import {loadDemoOverview, requestDemoUpload} from './services/demoOverview/actions'
import {connect} from 'react-redux'

import DocumentTitle from 'react-document-title'
import Throbber from 'root/components/Throbber'
import DemoInfo from './components/DemoInfo'
import DemoRuns from './components/DemoRuns'
import DemoDownloadButton from './components/DemoDownloadButton'

import './styles.styl'


class DemoOverview extends React.Component {
  componentDidMount() {
    this.props.loadDemoOverview(this.props.match.params.id)
  }

  render() {
    const {fetching, error, data, uploading, uploadingError} = this.props
    let content
    if (error) {
      content = <div>{error}</div>
    }
    else if (fetching || !data) {
      content = <p><Throbber /></p>
    }
    else {
      const demoInfo = data.get('demo_info').toJS()
      const serverInfo = data.get('server_info').toJS()
      const demoRuns = data.get('demo_runs').toJS()
      content = (
        <div>
          <DemoInfo demoInfo={demoInfo} serverInfo={serverInfo} />
          <DemoDownloadButton data={data} uploading={uploading}
                              uploadingError={uploadingError}
                              onClickUpload={() => this.props.requestDemoUpload(demoInfo.id)} />
          <hr />
          <DemoRuns demoRuns={demoRuns} />
        </div>
      )
    }

    return (
      <DocumentTitle title={'Tempus - Demo Info'}>
        <div className="DemoOverview container">
          <h1 className="page-title">
            Demo Info
          </h1>
          <span className="demo-download-container pull-right">
          </span>
          {content}
        </div>
      </DocumentTitle>
    )
  }
}


DemoOverview.propTypes = {
  loadDemoOverview: P.func.isRequired,
  requestDemoUpload: P.func.isRequired,
  fetching: P.bool.isRequired,
  error: P.string,
  data: IP.map,
  uploading: P.bool.isRequired,
  uploadingError: P.string
}


function mapStateToProps(state) {
  const {fetching, error, data, uploading, uploadingError} = state.demoOverview
  return {fetching, error, data, uploading, uploadingError}
}


export default connect(
  mapStateToProps,
  {loadDemoOverview, requestDemoUpload}
)(DemoOverview)
