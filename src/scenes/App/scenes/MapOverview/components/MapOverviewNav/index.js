import React from 'react'


export default class MapOverviewNav extends React.Component {
  render() {
    return (
      <ul className="nav nav-pills nav-stacked nav-dark">
        <li role="presentation" className="">
          <a href="#">
            Leaderboards <i className="fa fa-caret-down" />
          </a>
          <ul className="nav nav-pills nav-stacked nav-dark nav-nested">
            <li>
              <a href="#"><i className="fa fa-fw fa-globe" /> Map run</a>
            </li>
            <li>
              <a href="#"><i className="fa fa-fw fa-flag" /> Course 1</a>
            </li>
            <li>
              <a href="#"><i className="fa fa-fw fa-flag" /> Course 2</a>
            </li>
            <li>
              <a href="#"><i className="fa fa-fw fa-flag" /> Course 3</a>
            </li>
            <li>
              <a href="#"><i className="fa fa-fw fa-star" /> Bonus 1</a>
            </li>
            <li>
              <a href="#"><i className="fa fa-fw fa-star" /> Bonus 2</a>
            </li>
            <li>
              <a href="#"><i className="fa fa-fw fa-star" /> Bonus 3</a>
            </li>
          </ul>
        </li>
      </ul>
    )
  }
}
        // <li role="presentation">
        //   <a href="#">
        //     Screenshots <span className="badge">0</span>
        //   </a>
        // </li>
        // <li role="presentation">
        //   <a href="#">
        //     Videos <span className="badge">0</span>
        //   </a>
        // </li>
        // <li role="presentation" className="">
        //   <a href="#">
        //     Statistics
        //   </a>
        // </li>
