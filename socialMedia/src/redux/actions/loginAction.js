import { base_api_url } from "../../api/url"
import { fetchDataFailure , fetchDataSuccess , fetchDataRequest } from "../reducers/Authreducer"
import axios from 'axios'

export const loginAction = (loginData) =>{
    
    return async (dispatch) =>{
        dispatch(fetchDataRequest());
        try{
            const {data} = await axios.post(`${base_api_url}/auth/signIn`,loginData)
            
            
            if(data.token){
                localStorage.setItem("jwt" , data.token)

            }
            console.log(data);
            dispatch(fetchDataSuccess(data.token))
        }catch(error){
            console.log("error is " + error);
            dispatch(fetchDataFailure(error));
        }
    }
}
