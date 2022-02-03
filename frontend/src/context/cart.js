import React, { createContext, useEffect, useReducer } from 'react'
import * as ActionTypes from '../constants/ActionTypes'
import reducer from './reducer/cart'
import axios from 'axios'


const initialState = {
    cart: [],
    total_items: 0,
    total_amount: 0,
    shipping_fee: 667,
    }
    const CartContext = createContext()
    const CartProvider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState)

        const addToCart = async (id) => {
            const res = await axios.get(`/api/v1/ephones/${id}`)
            const ephone = res.data;
            dispatch({
            type: ActionTypes.ADD_CART_ITEM,
            payload: ephone,
            })
        }
        // remove item
        const removeItem = (_id) => {
            dispatch({
                type: ActionTypes.REMOVE_CART_ITEM, 
                payload: _id
            })
        }

        // TOGGLE item
        const toggleAmount = (_id, value) => {
            dispatch({
                type: ActionTypes.CART_SAVE_PAYMENT_METHOD,
                payload: {_id}
            })
        }

        // CLEAR item
        const clearCart = () => {
            dispatch({type: ActionTypes.CLEAR_CART_ITEMS})
        }

        useEffect(() => {
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },[state.cart])
        return (
            <CartContext.Provider
            value={{
                ...state,
                addToCart,
                removeItem,
                toggleAmount,
                clearCart
            }}
            >
            {children}
            </CartContext.Provider>
        )
    }

export { CartContext, CartProvider }
