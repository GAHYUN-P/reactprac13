import React from "react";
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";


const PostDelete = (props) => {
    const dispatch = useDispatch();
    // const post_list = useSelector((state) => state.post.list);

    const id = props.match.params.id;
    
    window.alert("삭제가 완료되었습니다!");
    dispatch(postActions.deletePostFB(id));
    

    return (
        <React.Fragment>
        </React.Fragment>
    )
}

export default PostDelete;