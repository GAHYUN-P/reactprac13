import React from "react";
import Post from "../components/Post";
import {useSelector, useDispatch} from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);

    console.log(post_list);

    React.useEffect(() => {

        // 이미 리스트가 있을 때 새로 불러오지 않게끔, getPost를 하지 않게끔 해서
        // 새로 추가된 리스트가 맨앞에 추가되게끔 함
        if(post_list.length === 0) {
            dispatch(postActions.getPostFB());
        }
        

    }, []);

    return (
        <React.Fragment>
            {post_list.map((p, idx) => {

                return <Post key={p.id} {...p}/>
            })}
        </React.Fragment>
    )
}

export default PostList;