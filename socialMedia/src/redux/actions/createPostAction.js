import { base_api_url , api } from "../../api/url"
import { fetchPostFailure , fetchPostRequest , fetchPostSuccess} from "../reducers/Postreducer";

export const createPost = (createData) =>{
    
    return async (dispatch) =>{
        dispatch(fetchPostRequest());
        try{
            const {data} = await api.post(`${base_api_url}/api/posts`,createData)

            console.log(data);
            dispatch(fetchPostSuccess(data))
        }catch(error){
            console.log("error is " + error);
            dispatch(fetchPostFailure(error));
        }
    }
}
