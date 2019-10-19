import React from 'react'
import {createField, fieldPresets} from 'react-advanced-form'
import cx from 'classnames'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import TimeAgo from 'react-timeago'
import Label from 'root/components/Label'
import Input from 'root/components/Input'
import StaticFormControl from 'root/components/StaticFormControl'


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
  <div className="clearfix" style={{marginBottom: '2px'}}>
    <div className="col-sm-2">
      <div
        css={`
          @media (min-width: 768px) {
            text-align: right;
          };
          color: rgb(120, 120, 120);
        `}
      >
        <strong><i>{label}</i></strong>
      </div>
    </div>
    <div className="col-sm-10" css={`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}>
      {children}
    </div>
  </div>


const DemoInfoTable = ({ demo }) => {
  // const {
  //   id,
  //   mapname,
  //   filename,
  //   date,
  //   url,
  //   recording,
  //   requested,
  //   uploader_id,
  //   server_id,
  //   expired,
  //   deleted
  // }
  const placeholder = <div className="text-center">&mdash;</div>
  return (
    <div className="form-control-static" style={{padding: '8px 0'}}>
      <DemoInfoRow label="Name">
        {demo
          ? <Link to={`/demos/${demo.id}`} title={`${demo.filename}.dem`}>
              {demo.filename}.dem
            </Link>
          : placeholder
        }
      </DemoInfoRow>
      <DemoInfoRow label="Date">
        {demo
          ? <TimeAgo date={demo.date * 1000} />
          : placeholder
        }
      </DemoInfoRow>
      <DemoInfoRow label="Server">
        {demo
          ? <Link to={`/servers/${demo.server_info.id}`}>{demo.server_info.name}</Link>
          : placeholder
        }
      </DemoInfoRow>
    </div>
  )
}


function DemoInput(props) {
  return (
    <Input
      label="Demo"
      {...props}
      placeholder="Demo ID"
    >
      <DemoInfoTable demo={props.selectedDemo} />
    </Input>
  )

  // return (
  //   <div className={classes}>
  //     <Label required>
  //       Demo
  //     </Label>
  //     <div className="col-sm-10">
  //       <InputThing
  //         className="form-control"
  //         { ...fieldProps }
  //         placeholder="Demo ID"
  //         fieldState={ fieldState }
  //         disabled={ validating || disabled} />
  //       <DemoInfoTable demo={selectedDemo} />
  //     </div>
  //   </div>
  // )
}


export default DemoInput
