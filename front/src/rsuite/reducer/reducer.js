import * as ActionType from '../action/actionType'

export default (state, action) => {
    const { openLeftList, openRightList, showLoading, showmodal } = action
    switch (action.type) {
        case ActionType.TOGGLELEFT:
            return { ...state, [openLeftList]: !state[openLeftList] };
        case ActionType.TOGGLERIGHT:
            return { ...state, [openRightList]: !state[openRightList] };
        case ActionType.LOADING:
            return { ...state, [showLoading]: !state[showLoading] };
        case ActionType.LOADINGOPEN:
            return { ...state, [showLoading]: true };
        case ActionType.LOADINGCLOSE:
            return { ...state, [showLoading]: false };
        case ActionType.MODALOPEN:
            return { ...state, [showmodal]: true };
        case ActionType.MODALCLOSE:
            return { ...state, [showmodal]: false };
        default:
            return state
    }
}