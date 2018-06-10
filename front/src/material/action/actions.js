import * as ActionType from './actionType'

// 左侧菜单
export const openLeft =(openLeftList)=>{
    return{
        type: ActionType.OPENLEFT,
        openLeftList: openLeftList
    }
}
export const closeLeft =(openLeftList)=>{
    return{
        type: ActionType.CLOSELEFT,
        openLeftList: openLeftList
    }
}
export const toggleLeft =(openLeftList)=>{
    return{
        type: ActionType.TOGGLELEFT,
        openLeftList: openLeftList
    }
}
// 右侧菜单
export const openRight =(openRightList)=>{
    return{
        type: ActionType.OPENRIGHT,
        openRightList: openRightList
    }
}
export const closeRight =(openRightList)=>{
    return{
        type: ActionType.CLOSERIGHT,
        openRightList: openRightList
    }
}
export const toggleRight =(openRightList)=>{
    return{
        type: ActionType.TOGGLERIGHT,
        openRightList: openRightList
    }
}