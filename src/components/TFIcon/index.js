import React from 'react'
import P from 'prop-types'
import classnames from 'classnames'
import './styles.styl'


export default function TFIcon({tfClass, size, ...props}) {
  const classes = classnames({
    'tf-icon': true,
    'soldier': ['soldier', 3].includes(tfClass),
    'demoman': ['demoman', 4].includes(tfClass),
    [size]: true
  })
  return <i {...props} className={classes} />
}


TFIcon.propTypes = {
  tfClass: P.oneOf(['soldier', 'demoman']),
  size: P.oneOf(['auto', 'mini', 'sm', 'medium', 'large'])
}
