import React from 'react'
import P from 'prop-types'
import cx from 'classnames'
import './styles.styl'


export default function TFIcon({tfClass, size, ...props}) {
  const classes = classnames({
    'tf-icon': true,
    'soldier': tfClass === 'soldier',
    'demoman': tfClass === 'demoman'
  })
  return <i {...props} className={classes} />
}


TFIcon.propTypes = {
  tfClass: P.oneOf(['soldier', 'demoman']),
  size: P.oneOf(['auto', 'mini', 'sm', 'medium', 'large'])
}
