import { base_api_url , api } from "../../api/url"
import { fetchDataFailure , fetchDataSuccess , fetchDataRequest } from "../reducers/Authreducer"
import axios from 'axios'

export const getProfileData = (jwt) =>{
    
    return async (dispatch) =>{
        dispatch(fetchDataRequest());
        try{
            const {data} = await axios.get(`${base_api_url}/api/users/profile`,{
                headers:{
                    "Authorization" : `Bearer ${jwt}`
                }
            })

            dispatch(fetchDataSuccess(data))
        }catch(error){
            console.log("error is " + error);
            dispatch(fetchDataFailure(error));
        }
    }
}

export const updateProfileData = (reqData) =>{
    
    return async (dispatch) =>{
        dispatch(fetchDataRequest());
        try{
            const {data} = await api.put(`${base_api_url}/api/users`,reqData)

            console.log(data);
            dispatch(fetchDataSuccess(data))
        }catch(error){
            console.log("error is " + error);
            dispatch(fetchDataFailure(error));
        }
    }
}

