import {upload} from "@testing-library/user-event/dist/upload";
import React from "react";
import Button from "../elements/Button";
import {storage} from "./firebase";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as imageActions} from "../redux/modules/image";

const Upload = (props) => {

    const dispatch = useDispatch();
    // 파일 업로드 중일때 버튼 눌림을 방지
    const is_uploading = useSelector((state) => state.image.uploading);
    const fileInput = React.useRef();

    const selectFile = (e) => {
        // e.target은 input이죠! input이 가진 files 객체를 살펴봅시다.
        console.log(e);
        console.log(e.target);
        console.log(e.target.files);
        // 선택한 파일이 어떻게 저장되어 있나 봅시다.
        console.log(e.target.files[0]);

        // ref로도 확인해봅시다. :)
        console.log(fileInput.current.files[0]);
    };

    const uploadFB = () => {
        // // 이미지를 가져온다.
        // let image = fileInput
        //     .current
        //     .files[0];
        // const _upload = storage
        //     .ref(`images/${image.name}`)
        //     .put(image);

        // //   업로드!
        // _upload.then((snapshot) => {
        //     console.log(snapshot);

        //     // 업로드한 파일의 다운로드 경로를 가져오자!
        //     snapshot
        //         .ref
        //         .getDownloadURL()
        //         .then((url) => {
        //             console.log(url);
        //         });
        // });

        if (!fileInput.current || fileInput.current.files.length === 0) {
            window.alert("파일을 선택해주세요!");
            return;
          }
      
          dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
    }

    return (
        <React.Fragment>
            <input type="file" ref={fileInput} onChange={selectFile} disabled={is_uploading}/> 
            {/* disabled = {true} 일 때 버튼이 비활성화 false면 활성화 */}
            <Button _onClick={uploadFB}>업로드하기</Button>
        </React.Fragment>
    )
}

export default Upload;