import { base_api_url , api } from "../../api/url"
import {fetchPostsFailure , fetchPostsRequest , fetchPostsSuccess} from "../reducers/Postreducer";

export const getAllPost = () =>{
    
    return async (dispatch) =>{
        dispatch(fetchPostsRequest());
        try{
            const {data} = await api.get(`${base_api_url}/api/posts/all`)

            // Sort posts by id in descending order
            const sortedPosts = data.sort((a, b) => b.id - a.id);

            // Dispatch the sorted posts
            dispatch(fetchPostsSuccess(sortedPosts));
        }catch(error){
            console.log("error is " + error);
            dispatch(fetchPostsFailure(error));
        }
    }
}
