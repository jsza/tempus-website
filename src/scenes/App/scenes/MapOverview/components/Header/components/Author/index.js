import React from 'react'
import P from 'prop-types'
import IP from 'react-immutable-proptypes'

import {Link} from 'react-router-dom'


export default function Author({ authors, match }) {
  let authorItem
  if (authors.size === 0) {
    authorItem =
      <span>???</span>
  } else if (authors.size === 1) {
    const a = authors.get(0)
    authorItem = (
      <Link to={`/players/${a.getIn(['player_info', 'id'])}`}>
        {a.get('name')}
      </Link>
    )
  } else {
    authorItem = (
      <Link to={`${match.url}/authors`}>
        {authors.size} authors
      </Link>
    )
  }
  return <span>{authorItem}</span>
}


Author.propTypes =
  { authors: IP.list.isRequired
  , match: P.object.isRequired
  }
