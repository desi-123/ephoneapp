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

export const phoneReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.PHONE_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case ActionTypes.PHONE_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case ActionTypes.PHONE_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case ActionTypes.PHONE_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
