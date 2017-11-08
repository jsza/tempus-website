import React from 'react'
import P from 'prop-types'
import IP from 'react-immutable-proptypes'

import ExtraMapTierSelect from './ExtraMapTierSelect'
import ExtraMapAuthor from './ExtraMapAuthor'


export default class ExtraMapItem extends React.Component {
  onClickDelete(event) {
    event.preventDefault()
    if (window.confirm('Delete "' + this.props.data.name + '"?')) {
      this.props.deleteExtraMap(this.props.data.id)
    }
  }

  render() {
    const {id, name, soldier_tier, demoman_tier, author_count,
           author_name} = this.props.data
    return (
      <tr>
        <td>
          {name}
        </td>
        <td>
          <ExtraMapAuthor
            id={id}
            name={name}
            author_count={author_count}
            author_name={author_name}
            />
        </td>
        <td>
          <ExtraMapTierSelect
            tier={soldier_tier}
            tfClassName="soldier"
            tfClassIdx={3}
            updateExtraMap={this.props.updateExtraMap}
            updating={this.props.updating}
            id={id}
            />
        </td>
        <td>
          <ExtraMapTierSelect
            tier={demoman_tier}
            tfClassName="demoman"
            tfClassIdx={4}
            updateExtraMap={this.props.updateExtraMap}
            updating={this.props.updating}
            id={id}
            />
        </td>
        <td>
          <input className="form-control small-input" />
        </td>
        <td>
          <a
            className="pull-right"
            href="#"
            onClick={this.onClickDelete.bind(this)}>
            <i className="fa fa-remove" />
          </a>
        </td>
      </tr>
    )
  }
}


ExtraMapItem.propTypes =
  { data: IP.record.isRequired
  , updateExtraMap: P.func.isRequired
  , deleteExtraMap: P.func.isRequired
  }
