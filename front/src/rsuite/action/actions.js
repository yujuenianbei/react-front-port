import * as ActionType from './actionType'

// 左侧菜单
export const toggleLeft =(openLeftList)=>{
    return{
        type: ActionType.TOGGLELEFT,
        openLeftList: openLeftList
    }
}
// 右侧菜单
export const toggleRight =(openRightList)=>{
    return{
        type: ActionType.TOGGLERIGHT,
        openRightList: openRightList
    }
}
// 加载中
// toggle loading
export const loading =(showLoading)=>{
    return{
        type: ActionType.LOADING,
        showLoading: showLoading
    }
}
// 关闭loading
export const loadingopen =(showLoading)=>{
    return{
        type: ActionType.LOADINGOPEN,
        showLoading: showLoading
    }
}
// 打开loading
export const loadingclose =(showLoading)=>{
    return{
        type: ActionType.LOADINGCLOSE,
        showLoading: showLoading
    }
}
// 模态框
// 关闭模态框
export const modalopen =(showmodal)=>{
    return{
        type: ActionType.MODALOPEN,
        showmodal: showmodal
    }
}
// 打开模态框
export const modalclose =(showmodal)=>{
    return{
        type: ActionType.MODALCLOSE,
        showmodal: showmodal
    }
}