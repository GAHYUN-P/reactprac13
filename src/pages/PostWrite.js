import React from "react";
import {Grid, Text, Button, Image, Input} from "../elements/Index.js";
import Upload from "../shared/Upload";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post.js";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    // 로그인 체크하기
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);
    
    // 주소창에서 params로 가져온 아이디
    const post_id = props.match.params.id;
    // 게시글 id 있냐 없냐
    const is_edit = post_id ? true : false;

    const {history} = props;
    
    // 이게 수정모드니? 수정모드면 포스트리스트에서 p.id===post_id인 것을 찾아와
    let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;
    console.log(_post);

    const [contents, setContents] = React.useState(_post ? _post.contents : "");

    // _post값이 없을때 메인 페이지로 돌아가게 하기
    React.useEffect(() => {
        // 수정 모드인데 _post가 존재하지 않는다면!
        if (is_edit && !_post) {
          console.log("포스트 정보가 없어요!");
          history.goBack();
    
          return;
        }
    
        if (is_edit) {
          dispatch(imageActions.setPreview(_post.image_url));
        }
    }, []);

    // 텍스트 내용 받아오기
    const changeContents = (e) => {
        setContents(e.target.value);
    }

    // 작성글 firebase에 저장은 post.js에서 한다. 작성버튼과 연동
    const addPost = () => {
        dispatch(postActions.addPostFB(contents));
        alert("작성이 완료되었습니다!");
        // 새로고침 하기전에 게시물이 두개보이는것을 방지하기 위해 history말고 아래와같이 씀
        // window
        //     .location
        //     .replace("/");
    }

    const editPost = () => {
        console.log('editPost');
        dispatch(postActions.editPostFB(post_id, {contents: contents}));
    }

    if (!is_login) {
        return (
            <Grid margin="100px 0px" padding="16px" center="center">
                <Text size="32px" bold="bold">
                    앗! 잠깐!
                </Text>
                <Text size="16px">
                    로그인 후에만 글을 쓸 수 있어요!
                </Text>
                <Button
                    _onClick={() => {
                        // history.push를 쓰게되면 뒤로갔을때 로그인을 안했더라도 다시 이 작성페이지로 돌아온다. replace는 지금있는 페이지에서
                        // 갈아끼우는거다!
                        history.replace("/login");
                    }}>
                    로그인 하러가기
                </Button>
            </Grid>
        );
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold="bold">
                    {is_edit ? "게시글 수정" : "게시글 작성"}
                </Text>
                <Upload/>
            </Grid>

            <Grid>
                <Grid padding="16px">
                    <Text margin="0px" size="24px" bold="bold">
                        미리보기
                    </Text>
                </Grid>

                <Image
                    shape="rectangle"
                    src={preview
                        ? preview
                        : "http://via.placeholder.com/400x300"}/>
            </Grid>

            <Grid padding="16px">
                <Input
                    value={contents}
                    _onChange={changeContents}
                    label="게시글 내용"
                    placeholder="게시글 작성"
                    multiLine/>
            </Grid>

            <Grid padding="16px">
                {is_edit ? (
                  <Button text="게시글 수정" _onClick={editPost}></Button>
                ) : (
                  <Button text="게시글 작성" _onClick={addPost}></Button>
                )}
            </Grid>
        </React.Fragment>
    );
}

export default PostWrite;