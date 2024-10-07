import { ACTION_CONST } from "../../shared/constants"

export function changeTab(tabIndex) {
    return {
        type: ACTION_CONST.TAB_SELECTED_CHANGE,
        tabIndex
    }
}