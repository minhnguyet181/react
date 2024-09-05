import axios from "../axios"
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUserService = (data) => {
    console.log(data)
    return axios.post('/api/create-new-user', data)
}
const deleteUserInfo = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
const editUserInfo = (data) => {
    return axios.put('/api/edit-user', data);
}
const getAllcode = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}
const getTopExpertService = (limit) => {
    return axios.get(`/api/top-expert?limit=${limit}`);
}
const getAllExpertService = (limit) => {
    return axios.get(`/api/get-all-expert?limit=${limit}`);
}
const crInfoExpert = (data) => {
    return axios.post(`/api/save-info-expert`, data);
}
const getinfoExpert = (inputId) =>{
    return axios.get(`/api/get-info-expert?id=${inputId}`);
}
const getScheduleExpert =(expertId,date) =>{
    return axios.get(`/api/get-schedule-expert?expertId=${expertId}&date=${date}`);
}
export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserInfo, editUserInfo, getAllcode,
    getTopExpertService, getAllExpertService, crInfoExpert,getinfoExpert,getScheduleExpert
}