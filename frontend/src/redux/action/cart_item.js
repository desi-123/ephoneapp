import axios from 'axios'
import * as ActionTypes from '../../constants/ActionTypes'

export const addToCart = (id, amount) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/ephones/${id}`)

  dispatch({
    type: ActionTypes.ADD_CART_ITEM,
    payload: {
      ephone: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      amount,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: ActionTypes.REMOVE_CART_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
