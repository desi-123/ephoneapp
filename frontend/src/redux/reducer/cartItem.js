import * as ActionTypes from '../../constants/ActionTypes'

export const cart_reducer = (
    state = { cartItems: [], shippingAddress: {} },
    action
    ) => {
    switch (action.type) {
      case ActionTypes.ADD_CART_ITEM:
        const item = action.payload

        const existItem = state.cartItems.find(
          (cartItem) => cartItem.ephone === item.ephone
        )

        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((cartItem) =>
              cartItem.ephone === existItem.ephone ? item : cartItem
            ),
          }
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          }
        }
      case ActionTypes.REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.ephone !== action.payload
          ),
        }
      case ActionTypes.CART_SAVE_SHIPPING_ADDRESS:
        return {
          ...state,
          shippingAddress: action.payload,
        }
      case ActionTypes.CART_SAVE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod: action.payload,
        }
      case ActionTypes.CLEAR_CART_ITEMS:
        return {
          ...state,
          cartItems: [],
        }
      default:
        return state
    }
}
