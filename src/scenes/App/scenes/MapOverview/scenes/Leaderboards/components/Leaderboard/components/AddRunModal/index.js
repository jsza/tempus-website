import React from 'react'

import P from 'prop-types'
import IP from 'react-immutable-proptypes'

import ReactModal from 'react-modal'
import {Modal, InputGroup} from 'react-bootstrap'

import {Link} from 'react-router-dom'

import SteamAvatar from 'root/components/SteamAvatar'
import TFIcon from 'root/components/TFIcon'
import Input from './components/Input'
import DemoInput from './components/DemoInput'
import {Form} from 'react-advanced-form'

import {prettyZoneName} from 'root/utils/TempusUtils'
import {CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'

import './styles.styl'


// function Input(props) {
//   return <input className="form-control" {...props} />
// }


const sampleDemo = {
  expired: false,
  mapname: 'jump_neptune_rc1',
  filename: 'auto-20180511-035332-jump_neptune_rc1',
  uploader_id: null,
  requested: false,
  date: 1526010812.63222,
  url: null,
  recording: true,
  server_id: 10,
  deleted: false,
  id: 646202
}


function FormGroup({ label, children }) {
  return (
    <div className="form-group">
      <label className="col-sm-2 control-label">
        {label}
      </label>
      <div className="col-sm-10">
        {children}
      </div>
    </div>
  )
}


function FormRow({ children, ...props }) {
  return <div className="form-row" {...props}>{children}</div>
}


function FormCol({ children, ...props }) {
  return <div className="col" {...props}>{children}</div>
}


function PlayerSelectionInput() {
  return (
    <div className="player-selection form-control-static">
      <button className="remove pull-right text-muted"><i className="fas fa-fw fa-times" /></button>
      <span className="player">
        <Link to="/players/37">jayess</Link> [U:1:28530124]
      </span>
    </div>
  )
}


function ClassStaticInput({ playerClass }) {
  const playerClassName = CLASSINDEX_TO_NAME[playerClass]
  return (
    <p className="form-control-static">
      <TFIcon size="auto" tfClass={playerClass} /> {playerClassName}
    </p>
  )
}


function AddRunForm({ zoneInfo, mapInfo, playerClass }) {
  const {type, zoneindex, custom_name} = zoneInfo.toJS()
  const zoneName = prettyZoneName(type, zoneindex, custom_name)
  return (
    <Form className="run-form form-horizontal">
      {/*<FormGroup label="Zone">
        <div className="form-control-static">
          {mapInfo.get('name')}/{zoneName}
        </div>
      </FormGroup>
      <FormGroup label="Player">
        <PlayerSelectionInput />
      </FormGroup>
      <FormGroup label="Class">
        <ClassStaticInput playerClass={playerClass}/>
      </FormGroup>*/}
      <div className="form-row">
        <div className="col">
          <DemoInput selectedDemo={sampleDemo} />
          {/*<Input
            name="durationInput"
            type="text"
            label="Demo"
            placeholder="Demo ID" required
            rule={/^\d+/} />*/}
        </div>

      </div>
      {/*
      <FormGroup label="Run">
        <FormRow>
          <InputGroup className="col">
            <InputGroup.Addon>Start</InputGroup.Addon>
            <Input type="text" placeholder="Tick" />
          </InputGroup>
          <InputGroup className="col">
            <InputGroup.Addon>End</InputGroup.Addon>
            <Input type="text" placeholder="Tick" />
          </InputGroup>
        </FormRow>
      </FormGroup>
      <FormGroup label="CPs">
        {['C1', 'C2', 'C3', 'C4', 'C5', 'C6'].map(z =>
          <FormGroup label={z}>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Tick" />
              <span className="input-group-addon">
                <span className="text-muted">optionals</span>
              </span>
            </div>
          </FormGroup>
        )}
      </FormGroup>
      */}
    </Form>
  )
}


export default function AddRunModal({ zoneInfo, mapInfo, playerClass, onClose }) {
  return (
    <ReactModal
      overlayClassName="modal"
      bodyOpenClassName="modal-open"
      className="modal-dialog modal-dialog-centered"
      isOpen
      style={{
        overlay: {
          zIndex: '2000',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'block'
        }
      }}>
      <div className="modal-content MapOverview-LeaderboardContainer-Leaderboard-AddRunModal">
        <div className="modal-header">
          <button type="button" className="close" aria-label="Close" onClick={onClose}>
            <span aria-hidden="true">×</span>
          </button>
          <h4 className="modal-title">
            Add run
          </h4>
        </div>
        <div className="modal-body">
          <AddRunForm zoneInfo={zoneInfo} mapInfo={mapInfo} playerClass={playerClass} />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Add run</button>
        </div>
      </div>
    </ReactModal>
  )
}


AddRunModal.propTypes = {
  zoneInfo: IP.map.isRequired,
  mapInfo: IP.map.isRequired,
  onClose: P.func.isRequired
}
