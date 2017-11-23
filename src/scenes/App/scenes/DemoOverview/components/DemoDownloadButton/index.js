import React from 'react'
import Button from 'react-bootstrap/lib/Button'

import {TEMPUS_PERMISSIONS} from 'root/utils/loginData'


const DemoDownloadButton = ({data, onClickUpload, uploading, uploadingError}) => {
  if (!data) {
    return null
  }
  const demoInfo = data.get('demo_info').toJS()
  const {deleted, expired, url, requested, recording} = demoInfo

  let button
  if (url) {
    button = (
      <a className="btn btn-primary" target="_blank" href={url}>
        <i className="fa fa-cloud-download" /> Download
      </a>
    )
  }
  else if (deleted) {
    button = (
      <Button bsStyle="danger" disabled>
        <i className="fa fa-times" /> Deleted
      </Button>
    )
  }
  else if (expired) {
    button = (
      <Button bsStyle="danger" disabled>
        Expired
      </Button>
    )
  }
  else if (requested) {
    if (recording) {
      button = (
        <Button disabled>
          <i className="fa fa-cog" /> Upload queued
        </Button>
      )
    }
    else {
      button = (
        <Button disabled>
          <i className="fa fa-cog fa-spin" /> Uploading
        </Button>
      )
    }
  }
  else {
    if (TEMPUS_PERMISSIONS.includes('upload_demos')) {
      button = (
        <span>
          <Button bsStyle={uploadingError ? 'danger' : 'success'}
                  onClick={onClickUpload} disabled={uploading}>
            <i className="fa fa-cloud-upload" /> Upload
          </Button>

        </span>
      )
    }
    else {
      button = (
        <Button disabled>
          <i className="fa fa-cloud-download" /> Download
        </Button>
      )
    }
  }

  return (
    <div>
      {button}
      { uploadingError
        ? <span className="text-danger"> {uploadingError}</span>
        : null
      }
    </div>
  )
}


export default DemoDownloadButton
