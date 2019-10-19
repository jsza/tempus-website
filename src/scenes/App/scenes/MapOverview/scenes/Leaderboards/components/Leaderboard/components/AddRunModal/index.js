import React from 'react'

import P from 'prop-types'
import IP from 'react-immutable-proptypes'

import ReactModal from 'react-modal'
import {Modal, InputGroup} from 'react-bootstrap'
import Button from 'react-bootstrap/lib/Button'

import {Link} from 'react-router-dom'

import AddRunForm from './components/AddRunForm'

import './styles.styl'


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
          display: 'block',
          marginTop: '41px'
        }
      }}
      onRequestClose={onClose}>
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
          <Button bsStyle="default" onClick={onClose}>Close</Button>
          <button type="button" className="btn btn-primary"><i className="fas fa-plus" /> Add run</button>
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
