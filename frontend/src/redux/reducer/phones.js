import * as ActionTypes from '../../constants/ActionTypes'
export const phoneListReducer = (state = { ephones: [] }, action) => {
  switch (action.type) {
    case ActionTypes.PHONE_LIST_REQUEST:
      return { loading: true, ephones: [] }
    case ActionTypes.PHONE_LIST_SUCCESS:
      return {
        loading: false,
        ephones: action.payload.ephones,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case ActionTypes.PHONE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
