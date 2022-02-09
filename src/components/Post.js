import React from 'react';
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";
import { Grid, Image, Text } from "../elements/Index"
import Button from '../elements/Button';
import { history } from '../redux/configureStore';

const Post = (props) => {

    return (
    <div>
        <Grid>
            {/* 여기 값이 Grid의 children으로 넘어간다 */}
            <Grid is_flex padding="16px">
                <Grid is_flex width="auto">
                    <Image shape="circle" src={props.src}/>
                    <Text bold>{props.user_info.user_name}</Text> 
                </Grid>
                <Grid is_flex width="auto">
                    <Text>{props.insert_dt}</Text>
                    {props.is_me && 
                    (<Button width="auto" padding="4px" margin="4px" 
                    _onClick={() => {history.push(`/write/${props.id}`)}}>
                        수정</Button>)}
                </Grid>
            </Grid>
            <Grid padding="16px">
                <Text>{props.contents}</Text>
            </Grid>
            <Grid>
                <Image shape="rectangle" src={props.image_url}/>
            </Grid>
            <Grid padding="16px">
                <Text margin="0px" bold>댓글 {props.comment_cnt}개</Text>
            </Grid>

            {/* <div>img / nickname / time / 수정btn</div>
            <div>contents</div>
            <div>image</div>
            <div>comment cnt</div> */}
        </Grid>
    </div>
    );
}


// 데이터가 없어서 나는 오류 방지
Post.defaultProps = {
    user_info: {
      user_name: "hyunee",
      user_profile: "https://cdn.class101.net/images/2897cf87-e75e-4f7a-b9ff-a33800066b55",
    },
    image_url: "https://cdn.class101.net/images/2897cf87-e75e-4f7a-b9ff-a33800066b55",
    contents: "달이 떴네요!",
    comment_cnt: 10,
    insert_dt: "2021-02-27 10:00:00",
    is_me: false,
};



export default Post;