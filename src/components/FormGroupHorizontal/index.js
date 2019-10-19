import React from 'react'

import P from 'prop-types'


export default function FormGroup({ label, labelWidth=2, children }) {
  return (
    <div className="form-group">
      <label className={`col-sm-${labelWidth} control-label`}>
        {label}
      </label>
      <div className={`col-sm-${12 - labelWidth}`}>
        {children}
      </div>
    </div>
  )
}


FormGroup.propTypes =
  { label: P.node
  , labelWidth: P.number
  , children: P.node.isRequired
  }
