import React, {useState} from "react";
import {Grid, Text, Button, Image, Input} from "../elements/Index.js";
import Upload from "../shared/Upload";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post.js";
import {actionCreators as imageActions} from "../redux/modules/image";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    // 로그인 체크하기
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);

    // 주소창에서 params로 가져온 아이디
    const post_id = props.match.params.id;
    // 게시글 id 있냐 없냐
    const is_edit = post_id
        ? true
        : false;

    const {history} = props;

    // 이게 수정모드니? 수정모드면 포스트리스트에서 p.id===post_id인 것을 찾아와
    let _post = is_edit
        ? post_list.find((p) => p.id === post_id)
        : null;

    const [layout, setLayout] = useState(
        _post
            ? _post.layout
            : "bottom"
    );
    const [contents, setContents] = React.useState(
        _post
            ? _post.contents
            : ""
    );

    // _post값이 없을때 메인 페이지로 돌아가게 하기

    React.useEffect(() => {
        // 수정 모드인데 _post가 존재하지 않는다면!
        if (is_edit && !_post) {
            console.log("포스트 정보가 없어요!");
            history.goBack();

            return;
        }

        if (!is_edit) {
            dispatch(imageActions.setPreview(""));
        }

        if (is_edit) {
            dispatch(imageActions.setPreview(_post.image_url));
        }
    }, []);

    // 텍스트 내용 받아오기
    const changeContents = (e) => {
        setContents(e.target.value);
    }

    const is_checked = (e) => {
        if (e.target.checked) {
            setLayout(e.target.value);
        }
    };

    // 작성글 firebase에 저장은 post.js에서 한다. 작성버튼과 연동
    const addPost = () => {
        dispatch(postActions.addPostFB(contents, layout));
        alert("작성이 완료되었습니다!");
        // 새로고침 하기전에 게시물이 두개보이는것을 방지하기 위해 history말고 아래와같이 씀 window     .location
        // .replace("/");
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
                    {
                        is_edit
                            ? "게시글 수정"
                            : "게시글 작성"
                    }
                </Text>
                <Upload/>
            </Grid>

            <Grid padding="16px">
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

                <Grid width="75%" padding="16px" is_flex="is_flex">
                    <input
                        type="radio"
                        name="layout"
                        value="right"
                        id="right"
                        onChange={is_checked}/>
                    <label htmlFor="right">
                        <Text
                            style={layout === "right"
                                ? {
                                    color: "#1B9CFC",
                                    margin: "10px"
                                }
                                : null
                            }>
                            오른쪽에 이미지 왼쪽에 텍스트
                        </Text>
                    </label>
                </Grid>
                <Grid is_flex="is_flex">
                    <Text width="80%" margin="10px" center="center">
                        {contents}
                    </Text>
                    <Image
                        half="half"
                        shape="big_square"
                        src={preview
                            ? preview
                            : "https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11e" +
                                    "b-93ec-c0330dff399b.jpg"
                            }/>
                </Grid>
                <Grid width="75%" padding="16px" is_flex="is_flex">
                    <input type="radio" name="layout" value="left" id="left" onChange={is_checked}/>
                    <label htmlFor="left">
                        <Text
                            style={layout === "left"
                                ? {
                                    color: "#1B9CFC",
                                    margin: "10px"
                                }
                                : null
                            }>
                            왼쪽에 이미지 오른쪽에 텍스트
                        </Text>
                    </label>
                </Grid>
                <Grid is_flex="is_flex">
                    <Image
                        half="half"
                        shape="big_square"
                        src={preview
                            ? preview
                            : "https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11e" +
                                    "b-93ec-c0330dff399b.jpg"
                            }/>
                    <Text width="80%" margin="10px" center="center">
                        {contents}
                    </Text>
                </Grid>
                <Grid width="75%" padding="16px" is_flex="is_flex">
                    <input
                        type="radio"
                        name="layout"
                        value="bottom"
                        id="bottom"
                        onChange={is_checked}
                        style={{
                            color: "skyblue"
                        }}/>
                    <label htmlFor="bottom">
                        {" "}
                        <Text
                            style={layout === "bottom"
                                ? {
                                    color: "#1B9CFC",
                                    margin: "10px"
                                }
                                : null
                            }>
                            하단에 이미지 상단에 텍스트
                        </Text>
                    </label>
                </Grid>
                <Grid>
                    <Text margin="10px">{contents}</Text>
                    <Image
                        shape="big_square"
                        src={preview
                            ? preview
                            : "https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11e" +
                                    "b-93ec-c0330dff399b.jpg"
                            }/>
                </Grid>

            </Grid>

            <Grid padding="16px">
                <Input
                    value={contents}
                    _onChange={changeContents}
                    label="게시글 내용"
                    placeholder="게시글 작성"
                    multiLine="multiLine"/>
            </Grid>

            <Grid padding="16px">
                <Text size="10px" margin="0px">
                    * 내용을 모두 입력하면 게시글 작성 버튼이 활성화 됩니다!
                </Text>
                {
                    is_edit
                        ? (
                            <Button
                                text="게시글 수정"
                                _onClick={editPost}
                                _disabled={!preview || contents === ""
                                    ? true
                                    : false}></Button>
                        )
                        : (
                            <Button
                                text="게시글 작성"
                                _onClick={addPost}
                                _disabled={!preview || contents === ""
                                    ? true
                                    : false}></Button>
                        )
                }
            </Grid>
        </React.Fragment>
    );
}

export default PostWrite;