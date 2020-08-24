import React from 'react'

import './styles.styl'


const Footer = ({ className, ...props }) =>
  <footer
    className={'App-footer ' + (className || '')}
    {...props}
  >
    <ul className="links">
      <li>
        <a href="http://steampowered.com/">
          <i className="fab fa-steam-symbol" /> Powered by Steam
        </a>
      </li>
      <li>
        <a href="https://tempus-apidocs.readthedocs.io/en/latest/">
          API
        </a>
      </li>
    </ul>
  </footer>


export default Footer
