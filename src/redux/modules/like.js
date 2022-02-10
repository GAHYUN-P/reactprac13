import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import firebase from "firebase/app";
import { actionCreators as postActions } from "./post";

// 액션 타입
const SET_LIKE = "SET_LIKE";
const MINUS_LIKE = "MINUS_LIKE";
const ADD_LIKE = "ADD_LIKE";

// 액션 생성 함수
const setLike = createAction(SET_LIKE, (post_id, like_cnt) => ({
  post_id,
  like_cnt,
}));

const addLike = createAction(ADD_LIKE, (post_id, like_cnt) => ({
  post_id,
  like_cnt,
}));

const minusLike = createAction(MINUS_LIKE, (post_id, like_cnt) => ({
  post_id,
  like_cnt,
}));

// 초기값
const initialState = {
  post_id: null,
  like_cnt: 0,
};

// 미들웨어
const getLikeFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }

    const postDB = firestore.collection("post");

    postDB
      .where("post_id", "==", post_id)
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push(doc.data().user_id);
        });
        console.log(list);

        dispatch(setLike(post_id, list));
      })
      .catch((error) => {
        console.log("좋아요 정보를 가져올 수가 없네요ㅜㅜ", error);
      });
  };
};

const addLikeFB = (post_id = null, like_cnt, like_list) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const post = getState().post.list.find((l) => l.id === post_id);
    const user_id = getState().user.user.uid; // 사용자 uid

    const increment = firebase.firestore.FieldValue.increment(1);
    // 인자에 들어간 값만큼 현재 값에서 추가 해준다.

    postDB
      .doc(post_id)
      .update({ like_cnt: increment, like_list: [...like_list, user_id] })
      .then((docs) => {
        window.alert("좋아요를 누르셨습니다.");
        dispatch(addLike(post_id, user_id));
        window.location.reload();
        dispatch(
          postActions.editPostFB(post_id, {
            like_cnt: parseInt(post.like_cnt) + 1,
          })
        );
      });
  };
};

const minusLikeFB = (post_id = null, like_cnt, like_list) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const user_id = getState().user.user.uid; // 사용자 uid

    const increment = firebase.firestore.FieldValue.increment(-1);
    // 인자에 들어간 값만큼 현재 값에서 추가 해준다.

    const new_like_list = like_list.filter((l) => {
      return l !== user_id;
    });

    postDB
      .doc(post_id)
      .update({ like_cnt: increment, like_list: new_like_list })
      .then((docs) => {
        window.alert("좋아요를 취소하셨습니다.");
        window.location.reload();
      });
  };
};

// 리듀서
export default handleActions(
  {
    [SET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.user_list;
      }),

    [ADD_LIKE]: (state, action) => {
      produce(state, (draft) => {});
    },
    [MINUS_LIKE]: (state, action) => {
      produce(state, (draft) => {});
    },
  },
  initialState
);

// 액션 생성 함수 export
const actionCreators = {
  getLikeFB,
  addLikeFB,
  minusLikeFB,
};

export { actionCreators };