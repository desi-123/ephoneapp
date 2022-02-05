import React, { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartColumn from '../components/cart/CartColumn'
import { addToCart, removeFromCart } from '../redux/action/cart_item'
import { formatPrice } from '../utils/helper'

const Cart = ({ match, location, history }) => {
  const ephoneId = match.params.id
  const amount = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  useEffect(() => {
    if (ephoneId) {
      dispatch(addToCart(ephoneId, amount))
    }
  }, [dispatch, ephoneId, amount])

  const removeCartItemHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push(`/login?redirect=shipping`)
  }
  return (
    <section className="cart-screen">
      <div className="cart-section">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            {' '}
            Your Cart is Empty{' '}
            <Link className="empty-cart--link" to="/">
              <strong>fill it out</strong>
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            {cartItems.map((cartItem) => (
              <section key={cartItem.ephone} className="cart-item">
                <div className="cart-item__image">
                  <p>Item</p>
                  <img
                    className="cart-item__image--small"
                    src={cartItem.image}
                    alt={cartItem.name}
                  />
                </div>
                <div className="cart__price">
                  <p>Price</p>
                  <h5>{formatPrice(cartItem.price)}</h5>
                </div>

                <div className="amount">
                  <p>Number</p>
                  <select
                    value={cartItem.amount}
                    onChange={(e) =>
                      dispatch(
                        addToCart(cartItem.ephone, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(cartItem.countInStock).keys()].map((n) => (
                      <option key={n + 1} value={n + 1}>
                        {n + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="cart-item__remove">
                  <p>Remove</p>
                  <button
                    onClick={() => removeCartItemHandler(cartItem.ephone)}
                  >
                    <FaTrash className="cart-item--remove" />
                  </button>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
      <div className="cart-maths">
        <div className="cart-total">
          <h5 className="cart-total--heading-5">
            total (
            {cartItems.reduce((acc, cartItem) => acc + cartItem.amount, 0)})
            items
          </h5>
        </div>
        <div className="cart-order">
          <h5 className="cart-cost--heading-5">total order</h5>
          <h5>
            {formatPrice(
              cartItems.reduce(
                (acc, cartItem) => acc + cartItem.amount * cartItem.price,
                0
              )
            )}
          </h5>
        </div>
      </div>
      <div className="cart-checkout">
        <button
          disabled={cartItems.length === 0}
          className="btn btn--checkout"
          onClick={checkoutHandler}
        >
          check out
        </button>
      </div>
    </section>
  )
}

export default Cart
