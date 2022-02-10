// 라이크 누르면 리랜더링 없이 숫자바뀌게끔 하려고 컴포넌트 나눠보았으나 실패
// post id를 가져와야하는데 데이터베이스에 post id칼럼 넣기를 실패했다.

import React from 'react';
import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Button from "../elements/Button";
import styled from 'styled-components';

import {useSelector, useDispatch} from 'react-redux';
import {actionCreators as likeActions} from "../redux/modules/like";

import {history} from '../redux/configureStore';

const LikeClick = (props) => {
    const user_id = useSelector(
        (state) => state.user.user
            ?.uid
    );

    console.log(user_id);
    const post = useSelector((state) => state.post.list);
    const {layout} = props;
    

    const [like, setLike] = React.useState(false);
    const [color, setColor] = React.useState("unLike");
    const styles = {
        color: color
    };

    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);

    React.useEffect(() => {
        dispatch(likeActions.getLikeFB(user_id));
      }, []);

    //좋아요 유무에 따라서 새로고침이 되어도 그대로 반영 되게 하는 코드
    React.useEffect(() => {
        console.log(post)
        const _post = post.filter((p) => {
                // 게시물 정보에서 좋아요를 누른 사람의 목록을 가져온다.
                return p.id === props.id;
            })[0]
            .like_list;
            console.log(_post);

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

        console.log(post_user_id);
        if (like) {
            // 안좋아요
            setLike(false);
            setColor("unLike");
            // 좋아요 해제하면 firebase, redux에 like_cnt - 1
            dispatch(likeActions.minusLikeFB(post_id, like_cnt, like_list));
            history.replace('/');
        } else {
            // 좋아요
            setLike(true);
            setColor("like");
            // 좋아요를 누르면 firebase, redux에 like_cnt + 1
            dispatch(likeActions.addLikeFB(post_id, like_cnt, like_list));
            history.replace('/');
        }
        
    }


    return (
        <Grid width="30%" is_flex="is_flex">
            <Text bold="bold">좋아요 {props.like_cnt}개</Text>
            <Like
                {...styles}
                onClick={() => {
                    likeClick(props);
                }}>
                ♥
            </Like>
        </Grid>
    );
}

const Like = styled.div ` // ***
  font-size : 30px;
  color : ${ (props) => (
    props.color === 'like'
)
    ? 'pink'
    : 'gray'};
`;

export default LikeClick;