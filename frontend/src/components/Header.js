import React from 'react'
import { Link, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { NavDropdown } from 'react-bootstrap'
import { MdAddShoppingCart } from 'react-icons/md'
import Search from './Search'
import { logout } from '../redux/action/user'

function Header() {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <section className="header">
      <nav className="nav">
        <Link to="/" className="nav__logo">
          ephone
        </Link>
        <Route
          render={({ history }) => <Search history={history} />}
          className="nav__product"
        ></Route>
        <div className="nav__item">
          <Link to="/cart" className="nav__cart">
            cart
            <span className="cart-conatainer">
              <MdAddShoppingCart />
            </span>
          </Link>
          <div>
            {userInfo ? (
              <NavDropdown className="nav-dropdown" title={userInfo.name}>
                <div className="nav-dropdown--profile">
                  <Link className="nav-dropdown--link" to="/profile">
                    Profile
                  </Link>
                </div>
                <div className="nav-dropdown--logout">
                  <Link className="nav-dropdown--link" onClick={logoutHandler}>
                    Logout
                  </Link>
                </div>
              </NavDropdown>
            ) : (
              <Link to="/login" className="nav__login">
                login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div className="hero">
        <div className="hero__center-title">
          <h2 className="hero__title">order now</h2>
          <h3 className="hero__subtitle">we have all new brand phones</h3>
        </div>
        <p className="hero__paragraph">
          Shop for your new phone or bring your own. You can get Unlimited data
          plans starting at $29.99/mo per line with 2+ lines.
        </p>
      </div>
    </section>
  )
}

export default Header
