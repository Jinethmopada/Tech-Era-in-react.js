import {Link} from 'react-router-dom'

const NotFound = () => (
  <div>
    <Link to="/" className="link-el">
      <nav className="Nel">
        <img
          className="Logo"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
        />
      </nav>
    </Link>
    <div className="NoCon">
      <img
        className="NoIm"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1 className="Noh">Page Not Found</h1>
      <p className="Nop">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
