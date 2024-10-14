import { base_api_url , api } from "../../api/url"
import {fetchPostsFailure , fetchPostsRequest , fetchPostsSuccess} from "../reducers/Postreducer";

export const getUserPost = () =>{
    
    return async (dispatch) =>{
        dispatch(fetchPostsRequest());
        try{
            const {data} = await api.get(`${base_api_url}/api/posts`)

            console.log(data);
            dispatch(fetchPostsSuccess(data))
        }catch(error){
            console.log("error is " + error);
            dispatch(fetchPostsFailure(error));
        }
    }
}
