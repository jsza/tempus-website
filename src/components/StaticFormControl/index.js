import React from 'react'
import P from 'prop-types'
import cx from 'classnames'

import Label from '../Label'


const StaticFormControl = ({ label, children, valid, invalid }) => {
  const classes = cx({
    'form-group': true
  })
  return (
    <div className={classes}>
      { label && (
        <Label
          htmlFor={ name }
          valid={ valid }
          invalid={ invalid }
        >
          { label }
        </Label>
      ) }
      <div className="col-sm-10">
        <p className="form-control-static">
          {children}
        </p>
      </div>
    </div>
  )
}


StaticFormControl.propTypes =
  { label: P.node
  , children: P.node.isRequired
  , valid: P.bool
  , invalid: P.bool
  }


export default StaticFormControl
