import axios from 'axios'
import {logout} from '../action/user'
import * as ActionTypes from '../../constants/ActionTypes'

export const single_phone = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.SINGLE_PHONE_REQUEST })

    const { data } = await axios.get(`/api/v1/ephones/${id}`)

    dispatch({
      type: ActionTypes.SINGLE_PHONE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.SINGLE_PHONE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPhoneReview =
  (ephoneId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ActionTypes.PHONE_CREATE_REVIEW_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.post(`/api/v1/ephones/${ephoneId}/reviews`, review, config)

      dispatch({
        type: ActionTypes.PHONE_CREATE_REVIEW_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ActionTypes.PHONE_CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }
