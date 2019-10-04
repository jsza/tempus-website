function pad(num, size) {
  var s = '0000' + num
  return s.substring(s.length - size)
}


function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1)
}


export function formatTime(time) {
  let h, m, s, ms = 0
  var newTime = ''

  h = Math.floor( time / (60 * 60) )
  time = time % (60 * 60)
  m = Math.floor( time / (60) )
  time = time % (60)
  s = Math.floor( time )
  ms = time % 1

  newTime = pad(m, 2) + ':' + pad(s, 2) + '.' + pad((ms.toString() + '00').substring(2, 4), 2)
  if (h !== 0) {
    newTime = pad(h, 1) + ':' + newTime
  }
  return newTime
}


export function prettyZoneName(zoneType, index, customName) {
  if (zoneType === 'map') {
    return 'Map Run'
  }
  else {
    return capitalize(zoneType) + ' ' + index + (customName ? ` (${customName})` : '')
  }
}


export function mapScreenshot(name, size) {
  return `http://tempus.site.nfoservers.com/web/screenshots/raw/${name}_${size}.jpeg`
}
