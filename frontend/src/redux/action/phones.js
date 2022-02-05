import axios from 'axios'
import * as ActionTypes from '../../constants/ActionTypes'

export const phoneList =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.PHONE_LIST_REQUEST })

      const { data } = await axios.get(
        `/api/V1/ephones?keyword=${keyword}`
      )

      dispatch({
        type: ActionTypes.PHONE_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ActionTypes.PHONE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
