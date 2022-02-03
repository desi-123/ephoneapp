import axios from 'axios'
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
