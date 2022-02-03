import * as ActionTypes from '../../constants/ActionTypes';

const cart_reducer = (state, action) => {
    if (action.type === ActionTypes.ADD_CART_ITEM) {
        const { _id, amount, ephone} = action.payload;
        const tempItem = state.cart.find((i) => i._id === _id)
        if (tempItem) {
            const tempCart = state.cart.map((cartItem) => {
                if (cartItem.id === _id) {
                    let newAmount = cartItem.amount + amount;
                    if (newAmount > cartItem.max) {
                        newAmount = cartItem.max
                    }
                    return {...cartItem, amount: newAmount}
                }
            })
            return {...state, cart: tempCart}
        } else {
            const newItem = {
                id: _id,
                name: ephone.name,
                amount,
                image: ephone.image,
                price: ephone.price,
                max: ephone.countInStock
            }
            return { ...state, cart: [...state.cart, newItem] }
        }
    }
    if (action.type === ActionTypes.REMOVE_CART_ITEM) {
        const tempCart = state.cart.filter((item) => item._id !== action.payload)
        return {...state, carrt: tempCart}
    }

    if (action.type === ActionTypes.CLEAR_CART_ITEMS) {
        return {...state, cart: []}
    }
}

export default cart_reducer