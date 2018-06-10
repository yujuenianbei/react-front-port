import * as ActionType from '../action/actionType'

export default (state, action) => {
    const { openLeftList,openRightList } = action
    switch (action.type) {
        case ActionType.OPENLEFT:
            return { ...state, [openLeftList]: true };
        case ActionType.CLOSELEFT:
            return { ...state, [openLeftList]: false };
        case ActionType.TOGGLELEFT:
            return { ...state, [openLeftList]: !state[openLeftList] };
        case ActionType.OPENRIGHT:
            return { ...state, [openRightList]: true };
        case ActionType.CLOSERIGHT:
            return { ...state, [openRightList]: false };
        case ActionType.TOGGLERIGHT:
            return { ...state, [openRightList]: !state[openRightList] };
        default:
            return state
    }
}