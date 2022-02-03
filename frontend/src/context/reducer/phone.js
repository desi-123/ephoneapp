import * as ActionTypes from '../../constants/ActionTypes'
const phone_reducer = (state, action) => {
    if (action.type === ActionTypes.PHONE_LIST_REQUEST) {
        return {...state, ephones_loading: true}
    }

    if (action.type === ActionTypes.PHONE_LIST_SUCCESS) {
        return {...state, ephones_loading: false, ephones: action.payload}
    }

    if (action.type === ActionTypes.PHONE_LIST_FAIL) {
        return { ...state, ephones_error: true }
    }
}

export default phone_reducer