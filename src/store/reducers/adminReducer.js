import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    gender: [],
    roles: [],
    positions: [],
    users: [],
    topExperts: [],
    allExperts: [],
    allScheduleTime: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_EXPERT_SUCCESS:
            state.topExperts = action.dataExperts;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_EXPERT_FAILED:
            state.topExperts = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_EXPERT_SUCCESS:
            state.allExperts = action.dataDr;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_EXPERT_FAILED:
            state.allExperts = [];
            return {
                ...state
            }
            case actionTypes.FETCH_SCHEDULE_TIME_SUCCESS:
                state.allScheduleTime = action.dataTime;
                return {
                    ...state
                }
                case actionTypes.FETCH_SCHEDULE_TIME_FAILED:
                    state.allScheduleTime =[];
                    return {
                        ...state
                    }
        default:
            return state;
    }
}

export default adminReducer;