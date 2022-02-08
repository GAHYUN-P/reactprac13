import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { firestore } from "../../shared/firebase";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));

const initialState = {
    list: []
}

// 게시글 하나에는 어떤 정보가 있어야 하는 지 하나 만들어둡시다! :)
const initialPost = {
    user_info: {
        id: 0,
        user_name: "hyunee",
        user_profile: "https://cdn.class101.net/images/2897cf87-e75e-4f7a-b9ff-a33800066b55"
    },
    image_url: "https://cdn.class101.net/images/2897cf87-e75e-4f7a-b9ff-a33800066b55",
    contents: "달이 떴네요!",
    comment_cnt: 10,
    insert_dt: "2021-02-27 10:00:00"
};

// reducer
export default handleActions({
    [SET_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post_list;
    }),

    [ADD_POST]: (state, action) => produce(state, (draft) => {})
}, initialState);

// 파이어스토어에서 데이터 가져오기
const getPostFB = () => {
    return function (dispatch, getState, {history}) {
        const postDB = firestore.collection("post");

        postDB.get().then((docs) => {
                let post_list = [];

                docs.forEach((doc) => {
                    // 잘 가져왔나 확인하기! :) 앗! DB에서 가져온 것하고 우리가 Post 컴포넌트에서 쓰는 데이터 모양새가 다르네요!
                    // console.log(doc.id, doc.data()); 데이터 모양을 맞춰주자!
                    let _post = doc.data();
                    // let post = {
                    //     id: doc.id,
                    //     user_info: {
                    //         user_name: _post.user_name,
                    //         user_profile: _post.user_profile,
                    //         user_id: _post.user_id
                    //     },
                    //     contents: _post.contents,
                    //     image_url: _post.image_url,
                    //     comment_cnt: _post.comment_cnt,
                    //     imsert_dt: _post.insert_dt
                    // }

                    // post_list.push(post);

                    // Object.keys(post) => ['comment_cnt', 'contetns', ...]
                    let post = Object.keys(_post).reduce((acc,cur)=> {
                            // key값에 user_가 포함이되면
                            if(cur.indexOf("user_") !== -1) {
                                return {...acc, user_info: {...acc.user_info, [cur]: _post[cur]}};
                            }
                            return {...acc, [cur]: _post[cur]};
                    }, {id: doc.id, user_info: {}});
                    // 초기값 {id: doc.id}

                    post_list.push(post);

                });

                // 리스트 확인하기!
                console.log(post_list);

                dispatch(setPost(post_list));
            });
    };
};

// action creator export
const actionCreators = {
    setPost,
    addPost,
    getPostFB,
};

export {
    actionCreators
};