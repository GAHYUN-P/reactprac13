import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import firebase from "firebase/app";

// 액션 타입
const MINUS_LIKE = "MINUS_LIKE";
const ADD_LIKE = "ADD_LIKE";

// 액션 생성 함수
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
const addLikeFB = (post_id = null, like_cnt, like_list) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const user_id = getState().user.user.uid; // 사용자 uid

    const increment = firebase.firestore.FieldValue.increment(1);
    // 인자에 들어간 값만큼 현재 값에서 추가 해준다.

    postDB
      .doc(post_id)
      .update({ like_cnt: increment, like_list: [...like_list, user_id] })
      .then((docs) => {
        window.alert("좋아요를 누르셨습니다.");
        window.location.reload();
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
  addLikeFB,
  minusLikeFB,
};

export { actionCreators };