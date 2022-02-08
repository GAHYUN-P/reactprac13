import React from "react";
import {Grid, Text, Button, Image, Input} from "../elements/Index.js";
import Upload from "../shared/Upload";
import {useSelector, useDispatch} from "react-redux";

const PostWrite = (props) => {
    // 로그인 체크하기
    const is_login = useSelector((state) => state.user.is_login);
    const {history} = props;

    const [contents, setContents] = React.useState('');

    // 텍스트 내용 받아오기
    const changeContents = (e) => {
        setContents(e.target.value);
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
                    게시글 작성
                </Text>
                <Upload/>
            </Grid>

            <Grid>
                <Grid padding="16px">
                    <Text margin="0px" size="24px" bold="bold">
                        미리보기
                    </Text>
                </Grid>

                <Image shape="rectangle"/>
            </Grid>

            <Grid padding="16px">
                <Input
                    _onChange={changeContents}
                    label="게시글 내용"
                    placeholder="게시글 작성"
                    multiLine="multiLine"/>
            </Grid>

            <Grid padding="16px">
                <Button text="게시글 작성"></Button>
            </Grid>
        </React.Fragment>
    );
}

export default PostWrite;