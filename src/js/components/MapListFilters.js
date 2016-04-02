import React, {PropTypes as P} from 'react'
import cx from 'classnames'
import {MenuItem, ButtonToolbar, ButtonGroup, DropdownButton, Button} from 'react-bootstrap'
import D from '../constants/Difficulties'


const OPTIONS =
  [ [null, 'Any']
  , [0, D['0']]
  , [1, D['1']]
  , [2, D['2']]
  , [3, D['3']]
  , [4, D['4']]
  , [5, D['5']]
  , [6, D['6']]
  ]


export default class MapListFilters extends React.Component {
  renderOptions(callback) {

  }

  render() {
    return (
      <ButtonToolbar className={this.props.className} style={{marginBottom: '8px'}}>
        <ButtonGroup>
          <FilterDropdown selected={this.props.filters.get('soldier')}
                          playerClass={'soldier'}
                          onChange={(f) => this.props.setFilter('soldier', f)}
            />
          <FilterDropdown selected={this.props.filters.get('demoman')}
                          playerClass={'demoman'}
                          onChange={(f) => this.props.setFilter('demoman', f)}
            />
        </ButtonGroup>
      </ButtonToolbar>
    )
  }
}


class FilterDropdown extends React.Component {
  render() {
    const classes = cx(
      { 'tf-icon': true
      , 'mini': true
      , 'soldier': this.props.playerClass === 'soldier'
      , 'demoman': this.props.playerClass === 'demoman'
      })

    const title =
      <span>
        <span className={classes} /> {D.get(this.props.selected, 'Any')}
      </span>

    return (
      <DropdownButton title={title}>
        {
          OPTIONS.map((o) => {
            let [value, s] = o
            return (
            <MenuItem onSelect={() => this.props.onChange(value)} active={value === this.props.selected}>
              {s}{value !== null ? ` (${value})` : null}
            </MenuItem>
            )
          })
        }
      </DropdownButton>
    )
  }
}


MapListFilters.propTypes =
  { setFilter: P.func.isRequired
  , soldierFilter: P.number
  , demomanFilter: P.number
  }
