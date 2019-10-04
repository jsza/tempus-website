import React from 'react'
import P from 'prop-types'
import cx from 'classnames'

import MenuItem from 'react-bootstrap/lib/MenuItem'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import Button from 'react-bootstrap/lib/Button'

import D from 'root/constants/Difficulties'


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
        <ButtonGroup>
          <Button
            className={this.props.simple ? 'active' : null}
            onClick={() => this.props.toggleSimple()}
            >
            <i className="fa fa-list" />
          </Button>
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
        <span className={classes} />
        {this.props.selected !== null ? ` (T${this.props.selected})` : null} {D.get(this.props.selected, 'Any')}
      </span>

    return (
      <DropdownButton id="maps-filter-dropdown" title={title} pullRight>
        {
          OPTIONS.map((o) => {
            let [value, s] = o
            return (
            <MenuItem key={value} onSelect={() => this.props.onChange(value)} active={value === this.props.selected}>
              {value !== null ? ` (T${value}) ` : null}{s}
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
