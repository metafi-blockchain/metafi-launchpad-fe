import { ACTION_CONST } from "../../shared/constants"
const initialState = {
    selectedTabIndex: 1
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CONST.TAB_SELECTED_CHANGE:
            return {
                ...state,
                selectedTabIndex: action.tabIndex,
            }
        default:
            return state
    }
}
export default appReducer