import React from 'react'


export default function Label({ valid, invalid, required, children, ...props}) {
  const {} = props
  return (
    <label
      className="control-label col-sm-2"
      {...props}
    >
      {children}{required && <sup>*</sup>}
    </label>
  )
}
