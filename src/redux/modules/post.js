import {createAction, handleActions } from "redux-actions";
import {produce} from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import {actionCreators as imageActions} from "./image";

//action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

//action creators
const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
    post_id,
    post,
  }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

const initialState = {
    list: []
}

// middleware
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
    like_cnt: 0,
    like_list: [],
    layout: "",
};

// 게시글 삭제하기
const deletePostFB = (post_id) => {
  const postDB = firestore.collection("post");

  return function (dispatch, getState, { history }) {
    postDB
      .doc(post_id)
      .delete()
      .then(() => {
        history.replace("/");
        dispatch(deletePost(post_id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 게시글 수정하기
const editPostFB = (post_id = null, post = {}) => {
    return function (dispatch, getState, { history }) {
      if (!post_id) {
        console.log("게시물 정보가 없어요!");
        return;
      }
      
      // 프리뷰
      const _image = getState().image.preview;
      
      // 게시글 하나의 정보
      const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
      const _post = getState().post.list[_post_idx];
  
      console.log(_post);
  
      const postDB = firestore.collection("post");
      
      // state의 preview하고 image url이 일치하면 텍스트 내용만 바꿔준다
      if (_image === _post.image_url) {
        postDB
          .doc(post_id)
          .update(post)
          .then((doc) => {
            dispatch(editPost(post_id, { ...post }));
            history.replace("/");
          });
  
        return;
      // state의 preview하고 image url이 다르면 이미지도 바꿔준다
      } else {
        const user_id = getState().user.user.uid;
        const _upload = storage
          .ref(`images/${user_id}_${new Date().getTime()}`)
          .putString(_image, "data_url");
  
        _upload.then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              console.log(url);
  
              return url;
            })
            .then((url) => {
              postDB
                .doc(post_id)
                .update({ ...post, image_url: url })
                .then((doc) => {
                  dispatch(editPost(post_id, { ...post, image_url: url }));
                  history.replace("/");
                });
            })
            .catch((err) => {
              window.alert("앗! 이미지 업로드에 문제가 있어요!");
              console.log("앗! 이미지 업로드에 문제가 있어요!", err);
            });
        });
      }
    };
  };

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
const addPostFB = (contents = "", layout="") => {
    return function (dispatch, getState, { history }) {
      // firebase에 post라는 collection을 선택하기
      const postDB = firestore.collection("post");
      
      // getState()로 store의 상태값에 접근할 수 있어요!
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
        insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        layout: layout,
      };
      // 잘 만들어졌나 확인해보세요!!
        console.log(_post);
      //   console.log({...user_info, ..._post});

      // store에 있는 이미지 프리뷰 정보 가져오기
      const _image = getState().image.preview;

      //   console.log(_image);
      //   // _image의 타입 확인
      //   console.log(typeof _image);

// 파일 이름은 유저의 id와 현재 시간을 밀리초로 넣어줍시다! (혹시라도 중복이 생기지 않도록요!)
const _upload = storage
    .ref(
        `images/${user_info.user_id}_${new Date().getTime()}`
    )
    .putString(_image, "data_url");

_upload
    .then((snapshot) => {
        snapshot
            .ref
            .getDownloadURL()
            .then((url) => {
                // url을 확인해봐요!
                console.log(url);
                dispatch(imageActions.uploadImage(url));
                return url;
            })
            .then((url) => {
                // return으로 넘겨준 값이 잘 넘어왔나요? :) 다시 콘솔로 확인해주기!
                console.log(url);

                // firebase에 정보 추가하기
                postDB
                    .add({
                        ...user_info,
                        ..._post,
                        image_url: url
                    })
                    .then((doc) => {
                        // 리덕스에 넣기 전 Post 컴포넌트의 데이터와 모양을 맞추기 위해 아이디를 추가해요!
                        let post = {
                            user_info,
                            ..._post,
                            id: doc.id,
                            image_url: url
                        };
                        console.log(post);
                        // 리덕스에 넣어보기
                        dispatch(addPost(post));

                        dispatch(imageActions.setPreview(null));
                        history.replace("/");
                    })
                    .catch((err) => {
                        window.alert("앗! 포스트 작성에 문제가 있어요!");
                        console.log('post 작성 실패!', err);
                    });
            });
    })
    .catch((err) => {
        window.alert("앗! 이미지 업로드에 문제가 있어요!");
        console.log(err);
    });
};
};

// reducer
export default handleActions({
    [SET_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post_list;
    }),

    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
        // 배열의 맨 앞에 붙여야해서 .unshift를 쓴다.
    }),

    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        // 조건 맞는애의 인덱스 정보를 줌
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),

      [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((l) => l.id !== action.payload.post_id);
      }),
}, initialState);

// action creator export
const actionCreators = {
setPost,
addPost,
getPostFB,
addPostFB,
editPostFB,
deletePostFB,
};

export {
actionCreators
};