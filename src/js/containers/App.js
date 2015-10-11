import React from 'react'
import {Link} from 'react-router'


export default class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-static">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand">Tempus Jump Network</a>
            </div>
            <div className="navbar-collapse collapse">>
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/maps">
                    Maps
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
