import { base_api_url , api } from "../../api/url"
import { fetchDataFailure , fetchDataSuccess , fetchDataRequest } from "../reducers/Authreducer"

export const upadteUser = (values) =>{
    
    return async (dispatch) =>{
        dispatch(fetchDataRequest());
        try{
            const {data} = await api.put(`${base_api_url}/api/users` , values)

            console.log(data);
            dispatch(fetchDataSuccess(data))
        }catch(error){
            console.log("error is " + error);
            dispatch(fetchDataFailure(error));
        }
    }
}
