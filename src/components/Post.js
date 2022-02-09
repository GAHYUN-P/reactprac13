import React from 'react';
import {Grid, Image, Text} from "../elements/Index"
import Button from '../elements/Button';
import {history} from '../redux/configureStore';
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as likeActions} from "../redux/modules/like";
import {apiKey} from '../shared/firebase';
import styled from 'styled-components'

const Post = (props) => {
    const user_id = useSelector(
        (state) => state.user.user
            ?.uid
    );
    const post = useSelector((state) => state.post.list);
    const {layout} = props;

    const [like, setLike] = React.useState(false);
    const [color, setColor] = React.useState("unLike");
    const styles = {
        color: color
    };

    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);

    // 좋아요 유무에 따라서 새로고침이 되어도 그대로 반영 되게 하는 코드
    React.useEffect(() => {
        console.log(post)
        const _post = post
            .filter((p) => {
                // 게시물 정보에서 좋아요를 누른 사람의 목록을 가져온다.
                return p.id === props.id;
            })[0]
            .like_list;

        if (_post) {
            _post.forEach((p) => {
                if (p === user_id) {
                    setLike(true);
                    setColor('like');
                }
            });
        }
    })

    const likeClick = (props) => {
        const post_id = props.id; // 게시물 정보
        const like_cnt = props.like_cnt; // 좋아요 갯수
        const post_user_id = props.user_info.user_id; // 게시물 작성자
        const like_list = props.like_list; // 좋아요 누른 사람들 아이디

        // 게시물 작성자인 지 체크 if (post_user_id === user_id) {     window.alert("작성자의 게시물에는
        // 좋아요를 누르실 수 없습니다.");     return; }  else if(like_list.includes(user_id)){  이게
        // 진짜 필요할까??   window.alert("이미 좋아요를  눌렀습니다.")   return; }

        if (like) {
            // 안좋아요
            setLike(false);
            setColor("unLike");
            // 좋아요 해제하면 firebase, redux에 like_cnt - 1
            dispatch(likeActions.minusLikeFB(post_id, like_cnt, like_list));
        } else {
            // 좋아요
            setLike(true);
            setColor("like");
            // 좋아요를 누르면 firebase, redux에 like_cnt + 1
            dispatch(likeActions.addLikeFB(post_id, like_cnt, like_list));
        }
    }

    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key)
        ? true
        : false;

    if (is_login && is_session) {
        return (
            <div>
                <Grid>
                    {/* 여기 값이 Grid의 children으로 넘어간다 */}
                    <Grid is_flex="is_flex" padding="16px">
                        <Grid is_flex="is_flex" width="auto">
                            <Image shape="circle" src={props.src}/>
                            <Text bold="bold">{props.user_info.user_name}</Text>
                        </Grid>
                        <Grid is_flex="is_flex" width="auto">
                            <Text>{props.insert_dt}</Text>
                            {
                                props.is_me && (
                                    <Button
                                        width="auto"
                                        padding="4px"
                                        margin="4px"
                                        _onClick={() => {
                                            history.push(`/write/${props.id}`)
                                        }}>
                                        수정</Button>
                                )
                            }
                            {
                                props.is_me && (
                                    <Button
                                        width="auto"
                                        padding="4px"
                                        margin="4px"
                                        _onClick={() => {
                                            history.push(`/delete/${props.id}`);
                                        }}>
                                        삭제</Button>
                                )
                            }
                        </Grid>
                    </Grid>

                    {layout === "right" && (
                        <Grid padding="16px" is_flex>
                        <Grid>
                            <Text>{props.contents}</Text>
                        </Grid>
                        <Grid margin="5px">
                            <Image half shape="rectangle" src={props.image_url}/>
                        </Grid>
                    </Grid>
                    )}
                    
                    {layout === "left" && (
                        <Grid padding="16px" is_flex>
                        <Grid>
                            <Image half shape="rectangle" src={props.image_url}/>
                        </Grid>
                        <Grid margin="5px">
                            <Text>{props.contents}</Text>
                        </Grid>
                    </Grid>
                    )}

                    {layout === "bottom" && (
                        <Grid padding="16px">
                        <Grid>
                            <Image shape="rectangle" src={props.image_url}/>
                        </Grid>
                        <Grid>
                            <Text>{props.contents}</Text>
                        </Grid>
                    </Grid>
                    )}

                    <Grid padding="16px" is_flex>
                        <Text margin="0px" bold="bold" >댓글 {props.comment_cnt}개</Text>
                        <Grid width="30%"is_flex>
                            <Text bold="bold">좋아요 {props.like_cnt}개</Text>
                            <Like
                                {...styles}
                                onClick={() => {
                                    likeClick(props);
                                }}>
                                ♥
                            </Like>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }

    return (
        <div>
            <Grid>
                {/* 여기 값이 Grid의 children으로 넘어간다 */}
                <Grid is_flex="is_flex" padding="16px">
                    <Grid is_flex="is_flex" width="auto">
                        <Image shape="circle" src={props.src}/>
                        <Text bold="bold">{props.user_info.user_name}</Text>
                    </Grid>
                    <Grid is_flex="is_flex" width="auto">
                        <Text>{props.insert_dt}</Text>
                        {
                            props.is_me && (
                                <Button
                                    width="auto"
                                    padding="4px"
                                    margin="4px"
                                    _onClick={() => {
                                        history.push(`/write/${props.id}`)
                                    }}>
                                    수정</Button>
                            )
                        }
                        {
                            props.is_me && (
                                <Button
                                    width="auto"
                                    padding="4px"
                                    margin="4px"
                                    _onClick={() => {
                                        history.push(`/delete/${props.id}`);
                                    }}>
                                    삭제</Button>
                            )
                        }
                    </Grid>
                </Grid>


                {layout === "right" && (
                    <Grid padding="16px" is_flex>
                    <Grid>
                        <Text>{props.contents}</Text>
                    </Grid>
                    <Grid>
                        <Image half shape="rectangle" src={props.image_url}/>
                    </Grid>
                </Grid>
                )}
                
                {layout === "left" && (
                    <Grid padding="16px" is_flex>
                    <Grid>
                        <Image half shape="rectangle" src={props.image_url}/>
                    </Grid>
                    <Grid>
                        <Text>{props.contents}</Text>
                    </Grid>
                </Grid>
                )}
                {layout === "bottom" && (
                    <Grid padding="16px">
                    <Grid>
                        <Image shape="rectangle" src={props.image_url}/>
                    </Grid>
                    <Grid>
                        <Text>{props.contents}</Text>
                    </Grid>
                </Grid>
                )}
                
                <Grid padding="16px" is_flex="is_flex">
                    <Text margin="0px" bold="bold">댓글 {props.comment_cnt}개</Text>
                    <Text bold="bold">좋아요 {props.like_cnt}개</Text>
                </Grid>

            </Grid>
        </div>
    );
}

// 데이터가 없어서 나는 오류 방지
Post.defaultProps = {
    user_info: {
        user_name: "hyunee",
        user_profile: "https://cdn.class101.net/images/2897cf87-e75e-4f7a-b9ff-a33800066b55"
    },
    image_url: "https://cdn.class101.net/images/2897cf87-e75e-4f7a-b9ff-a33800066b55",
    contents: "달이 떴네요!",
    comment_cnt: 10,
    insert_dt: "2021-02-27 10:00:00",
    is_me: false
};

const Like = styled.div ` // ***
  font-size : 30px;
  color : ${ (props) => (
    props.color === 'like'
)
    ? 'pink'
    : 'gray'};
`

export default Post;