import * as ActionTypes from '../../constants/ActionTypes'
export const phone_reducer = (
  state = { ephone: { } },
  action
) => {
  switch (action.type) {
    case ActionTypes.SINGLE_PHONE_REQUEST:
      return { ...state, loading: true }
    case ActionTypes.SINGLE_PHONE_SUCCESS:
      return { loading: false, ephone: action.payload }
    case ActionTypes.SINGLE_PHONE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
