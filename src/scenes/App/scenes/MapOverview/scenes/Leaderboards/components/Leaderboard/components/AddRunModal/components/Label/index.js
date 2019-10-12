import React from 'react'


export default function Label({ valid, invalid, required, children, ...props}) {
  const {} = props
  return (
    <label
      className="col-sm-2 control-label"
      {...props} >
      {children}{required && '*'}
    </label>
  )
}
