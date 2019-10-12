import React from 'react'


export default function ZoneIcon({ type, fixedWidth, ...props }) {
  const classes = [
    'fas',
    'fa-fw' && fixedWidth,
    type === 'map' && 'fa-globe',
    type === 'course' && 'fa-flag',
    type === 'bonus' && 'fa-star'
  ].join(' ')
  return <i className={classes} />
}
