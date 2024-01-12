import { Link, NavLink } from 'react-router-dom'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Header() {
  return (
    <header className="header">
      <div className="inner">
        <h1 className="logo">
          <Link to="/">
            <FontAwesomeIcon icon={faTrello} className="icon" />
            <strong>Trello</strong>
          </Link>
        </h1>

        <nav className="menu">
          <ul className="gnb">
            <li className="item">
              <NavLink to="/department">Department</NavLink>
            </li>
            <li className="item">
              <NavLink to="/community">Community</NavLink>
            </li>
            <li className="item">
              <NavLink to="/gallery">Gallery</NavLink>
            </li>
            <li className="item">
              <NavLink to="/youtube">Youtube</NavLink>
            </li>
            <li className="item">
              <NavLink to="/location">Contact Us</NavLink>
            </li>
            <li className="item">
              <NavLink to="/members">Join</NavLink>
            </li>
          </ul>

          <ul className="etc">
            <li>Privacy Policy</li>
            <li>Terms</li>
            <li>Cookie Settings</li>
          </ul>

          <div className="app">
            <p>Trello also works great on your smaller screen.</p>
            <div className="app-group">
              <Link to="/">
                <FontAwesomeIcon icon={faApple} />
              </Link>
              <Link to="/">
                <FontAwesomeIcon icon={faGooglePlay} />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
