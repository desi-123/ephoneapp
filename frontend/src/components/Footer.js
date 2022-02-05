import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="footer">
      <hr />
      <p className="footer--footer-paragraph">
        <Link to="/" className="footer--link">
          Phones
        </Link>{' '}
        <Link to="/about" className="footer--link">
          About us
        </Link>{' '}
        <Link to="/cart" className="footer--link">
          Cart
        </Link>
      </p>
      <div className="footer--text-center">Copyright &copy; Ephone</div>
    </footer>
  )
}

export default Footer
