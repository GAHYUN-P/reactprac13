import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));

const initialState = {
    list: []
}

// 게시글 하나에는 어떤 정보가 있어야 하는 지 하나 만들어둡시다! :)
const initialPost = {
    // user_info: {
    //     id: 0,
    //     user_name: "hyunee",
    //     user_profile: "https://cdn.class101.net/images/2897cf87-e75e-4f7a-b9ff-a33800066b55"
    // },
    image_url: "https://cdn.class101.net/images/2897cf87-e75e-4f7a-b9ff-a33800066b55",
    contents: "",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    // insert_dt: "2021-02-27 10:00:00"
    // 오늘 날짜가 moment 객체로 온다.
};

// reducer
export default handleActions({
    [SET_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post_list;
    }),

    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
        // 배열의 맨 앞에 붙여야해서 .unshift를 쓴다.
    })
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

// firebase에 작성글내용 저장하는 함수
const addPostFB = (contents = "") => {
    return function (dispatch, getState, { history }) {
      // firebase에 post라는 collection을 선택하기
      const postDB = firestore.collection("post");
      
      // 리덕스에 있는 유저 정보 전체 가져오기
      const _user = getState().user.user;

      // 필요한 유저 정보 정리하기
      const user_info = {
        user_name: _user.user_name,
        user_id: _user.uid,
        user_profile: _user.user_profile,
      };

      // 정보 형식에 맞게 담아주기
      const _post = {
        ...initialPost,
        contents: contents,
        insert_dt: moment().format("YYYY-MM-DD hh:mm:ss")
      };
      // 잘 만들어졌나 확인해보세요!!
      //   console.log(_post);
      //   console.log({...user_info, ..._post});

      
      // firebase에 정보 추가하기
      postDB.add({...user_info, ..._post}).then((doc) => {
          // 리덕스에 넣기 전 Post 컴포넌트의 데이터와 모양을 맞추기 위해 아이디를 추가해요!
          let post = {user_info, ..._post, id: doc.id};
                  console.log(post);
          // 리덕스에 넣어보기
          dispatch(addPost(post));
      }).catch((err) => {
          console.log('post 작성 실패!', err);
      });
    };
};

// action creator export
const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
};

export {
    actionCreators
};