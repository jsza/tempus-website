import React from 'react'
import P from 'prop-types'
import Difficulties from '../constants/Difficulties'

import {FormControl} from 'react-bootstrap'


export default class ExtraMapTierSelect extends React.Component {
  onChange(event) {
    this.props.updateExtraMap(this.props.id, this.props.tfClassIdx,
                              parseInt(event.target.value))
  }

  render() {
    return (
      <FormControl
        className="small-input"
        componentClass="select"
        disabled={this.props.updating}
        value={this.props.tier.toString()}
        onChange={this.onChange.bind(this)}
        >
        {Difficulties.entrySeq().map((item, idx) => {
          const [key, value] = item
          return <option key={idx} value={key}>{`(${key}) ${value}`}</option>
        })}}
      </FormControl>
    )
  }
}


ExtraMapTierSelect.propTypes =
  { tier: P.number.isRequired
  , updating: P.bool.isRequired
  , tfClassName: P.string.isRequired
  , updateExtraMap: P.func.isRequired
  }
