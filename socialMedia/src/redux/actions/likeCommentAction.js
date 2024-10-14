import { base_api_url , api } from "../../api/url"
import { likePostFailure , likePostRequest , likePostSuccess} from "../reducers/Postreducer";

export const likeComment = (id) =>{
    
    return async (dispatch) =>{
        dispatch(likePostRequest());
        try{
            const {data} = await api.put(`${base_api_url}/api/comments/like/${id}`)

            console.log(data);
            dispatch(likePostSuccess(data))
        }catch(error){
            console.log("error is " + error);
            dispatch(likePostFailure(error));
        }
    }
}
