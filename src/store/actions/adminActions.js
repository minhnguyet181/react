import actionTypes from './actionTypes';
import {
    getAllcode, createNewUserService, getAllUsers, deleteUserInfo, editUserInfo,
    getTopExpertService, getAllExpertService, crInfoExpert
} from '../../services/userService';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllcode("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed())
            }
        }
        catch (e) {
            dispatch(fetchGenderFailed());
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
export const fetchRoleSuccess = (genderData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: genderData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await getAllcode("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed())
            }
        }
        catch (e) {
            dispatch(fetchPositionFailed());
        }
    }
}
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllcode("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed())
            }
        }
        catch (e) {
            dispatch(fetchRoleFailed());
        }
    }
}
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed());
            }

        } catch (e) {
            dispatch(saveUserFailed());
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                toast.error("Fetch all users error!");
                dispatch(fetchAllUserFailed());
            }
        }
        catch (e) {
            toast.error("Fetch all users error!");
            dispatch(fetchAllUserFailed());
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserInfo(userId);
            if (res && res.errCode === 0) {
                toast.success("Succeed!")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error("Error");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Error");
            dispatch(deleteUserFailed());
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserInfo(data);
            if (res && res.errCode === 0) {
                toast.success("Update user's information succeed!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Update user's info error!");
                dispatch(editUserFailed());
            }

        } catch (e) {
            toast.error("Update user's info error!");
            dispatch(editUserFailed());
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
export const fetchTopExpert = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopExpertService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_EXPERT_SUCCESS,
                    dataExperts: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_EXPERT_FAILED
                })
            }

        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_EXPERT_FAILED
            })
        }

    }
}
export const fetchAllExpert = () => {
    return async (dispatch, getState) => {
        try {
            let res = await crInfoExpert();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_EXPERT_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_EXPERT_FAILED
                })
            }

        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_EXPERT_FAILED
            })
        }

    }
}
export const saveInfoExpert = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllExpertService(data);
            if (res && res.errCode === 0) {
                toast.success("Update user's information succeed!");
                dispatch({
                    type: actionTypes.SAVE_INFO_EXPERT_SUCCESS,

                })
            } else {
                toast.error('Error')
                dispatch({
                    type: actionTypes.SAVE_INFO_EXPERT_FAILED
                })
            }

        } catch (e) {
            toast.error('Error')

            dispatch({
                type: actionTypes.SAVE_INFO_EXPERT_FAILED
            })
        }

    }
}
export const fetchScheduleTime =() =>{
    return async(dispatch,getState) =>{
        try{
            let res =await getAllcode ('TIME');
            if(res && res.errCode === 0){
                dispatch({
                    type:actionTypes.FETCH_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type:actionTypes.FETCH_SCHEDULE_TIME_FAILED
                })
            }

        } catch(e){
            dispatch({
                type:actionTypes.FETCH_SCHEDULE_TIME_FAILED
            })
        }
    }
}