import React from 'react'
import {createField, fieldPresets} from 'react-advanced-form'
import cx from 'classnames'
import styled from 'styled-components'

import TimeAgo from 'react-timeago'
import Label from '../Label'


const StyledTable = styled.table`
  width: 100%;

  > tbody > tr {
    > td {
      padding: 2px 4px;
      &:first-child {
        text-align: right;
        font-weight: bold;
      }
    }
  }
`


const DemoInfoRow = ({ label, children }) =>
  <div style={{color: 'rgb(80, 80, 80)'}}>
    <div className="col-sm-3">
      <div className="text-right">
        <strong>{label}</strong>
      </div>
    </div>
    <div className="col-sm-9">
      {children}
    </div>
  </div>


const DemoInfoTable = ({ demoInfo: {id, mapname, filename, date, url, recording, requested, uploader_id, server_id, expired, deleted} }) =>
  <p className="form-control-static">
    <div className="panel panel-default panel-xs">
      <div className="panel-body">
        <DemoInfoRow label="Filename">
          {filename}
        </DemoInfoRow>
        <DemoInfoRow label="Date">
          <TimeAgo date={date * 1000} />
        </DemoInfoRow>
      </div>
    </div>
  </p>


function DemoInput({ selectedDemo, valid, invalid, fieldProps }) {
  console.log(fieldProps)
  const classes = cx({
    'form-group': true,
    'has-success': valid,
    'has-error': invalid
  })
  return (
    <div className={classes}>
      <Label required>
        Demo
      </Label>
      <div className="col-sm-10">
        { (!selectedDemo)
        ? <DemoInfoTable demoInfo={selectedDemo} />
        : <input className="form-control" placeholder="Demo ID" />
        }
        <DemoInfoTable demoInfo={selectedDemo} />
      </div>
    </div>
  )
}


export default(createField(fieldPresets.input)(DemoInput))
