import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import * as ActionTypes from '../constants/ActionTypes'
import reducer from './reducer/phone'

const initialState = {
    ephones: [],
    ephones_loading: false,
    ephones_error: false,
}
const PhoneContext = createContext()
const PhoneProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchEphones = async (keyword = '') => {
        dispatch({ type: ActionTypes.PHONE_LIST_REQUEST })
        try {
        const response = await axios.get(`/api/v1/ephones?keyword=${keyword}`)
        const ephones = response.data
        dispatch({
            type: ActionTypes.PHONE_LIST_SUCCESS,
            payload: ephones,
        })
        } catch (error) {
        dispatch({ type: ActionTypes.PHONE_LIST_FAIL })
        }
    }

    useEffect(() => {
        fetchEphones()
    }, [])

    return (
        <PhoneContext.Provider value={{
            ...state,
        }}>
        {children}
        </PhoneContext.Provider>
    )
}


export { PhoneContext, PhoneProvider }
