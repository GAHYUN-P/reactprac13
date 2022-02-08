import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { storage } from "../../shared/firebase";

// actions
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

// action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// initial state
const initialState = {
    image_url: "http://via.placeholder.com/400x300",
    uploading: false,
    preview: null,
  };


function uploadImageFB(image) {
  return function (dispatch, getState, {history}) {
    
    // 업로드 시작할때 true, 끝나는 시점은 리듀서에 넣어둠
    dispatch(uploading(true));
    
    console.log(`images/${new Date().getTime()}_${image.name}`);
    const _upload = storage.ref(`images/${image.name}`).put(image);

    //   업로드!
    _upload.then((snapshot) => {
      console.log(snapshot);

      // 업로드한 파일의 다운로드 경로를 가져오자!
      snapshot.ref.getDownloadURL().then((url) => {
        console.log(url);
        dispatch(uploadImage(url));
      });
    }).catch(err => {
        dispatch(uploading(false));
    });
  };
}



// reducer
export default handleActions(
  {
      // image URL 고치기
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        // 업로드 끝나면 uploading false로 바꾸기
        draft.uploading = false;
      }),

      // 업로드 하는동안 기다리기
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImage,
  uploadImageFB,
  setPreview,
};

export { actionCreators };