import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../redux/action/order'
import { formatPrice } from '../utils/helper'
import * as ActionTypes from '../constants/ActionTypes'

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.amount, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const { order, success } = useSelector((state) => state.orderCreate)
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: ActionTypes.USER_DETAILS_RESET })
      dispatch({ type: ActionTypes.ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }
  return (
    <div className="place-order">
      <div className="shipping-address">
        <h2>Shipping</h2>
        <p>
          Address: {cart.shippingAddress.address} {' '}
          {cart.shippingAddress.city} {' '}
          {cart.shippingAddress.postalCode} {' '}
          {cart.shippingAddress.country}
        </p>
      </div>

      <div className="order-items">
        <h2>Order Items</h2>
        {cart.cartItems.length === 0 ? (
          'Your cart Is EMPTY'
        ) : (
          <div>
            {cart.cartItems.map((item, index) => (
              <div key={index} className="item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="place-order--image"
                />
                <Link to={`/ephone/${item.ephone}`}>{item.name}</Link>
                <div className="price">
                  {item.amount} X {formatPrice(item.price)} ={' '}
                  {formatPrice(item.amount * item.price)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="place-order--summary">
        <h2>Order Summary</h2>
        <div className="place-order--summary-item">
          <h6 className="place-order--subtotal">subtotal</h6>
          <p className="item">{formatPrice(cart.itemsPrice)}</p>
        </div>
        <div className="place-order--summary-item">
          <h6 className="place-order--shipping">Shipping</h6>
          <p className="item">{formatPrice(cart.shippingPrice)}</p>
        </div>
        <div className="place-order--summary-item">
          <h6 className="place-order--tax">Tax</h6>
          <div className="item">{formatPrice(cart.taxPrice)}</div>
        </div>
        <div className="place-order--summary-item">
          <h6 className="place-order--total">Total</h6>
          <div className="item">{formatPrice(cart.totalPrice)}</div>
        </div>
        <button
          disabled={cart.cartItems.length === 0}
          onClick={placeOrderHandler}
          className="btn btn-summary"
        >
          place order
        </button>
      </div>
    </div>
  )
}

export default PlaceOrder
