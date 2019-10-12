import React from 'react'
import PropTypes from 'prop-types'
import { createField, fieldPresets } from 'react-advanced-form'
import cx from 'classnames'

import Label from '../Label'


const Input = ({
  fieldState: { invalid, valid, required },
  ...props
}) => {
  const classes = cx({
    'form-control': true
  })
  return (
    <input className={classes} {...props} />
  )
}


const InputField = (props) => {
  const { name, label, hint, disabled, fieldProps, fieldState } = props
  const { required } = fieldProps
  const { validating, validatedAsync, valid, invalid, errors } = fieldState
  // return <input className="form-control" {...props} />
  const classes = cx({
    'form-group': true,
    'has-success': valid,
    'has-error': invalid
  })
  return (
    <div className={classes}>
      { label && (
        <Label
          htmlFor={ name }
          valid={ valid }
          invalid={ invalid }
          required={ required }>
          { label }
        </Label>
      ) }
      <div className="col-sm-10">
        <Input
          { ...fieldProps }
          fieldState={ fieldState }
          disabled={ validating || disabled} />
      </div>
    </div>
  )
}


export default createField(fieldPresets.input)(InputField)
