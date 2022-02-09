import React from 'react';
import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Button from "../elements/Button";
// import {Grid, Text, Button} from "../elements/Index.js";
// 그냥 elements/Index로 불러오면 에러가 생겨서 Index.js로 import하니까 해결되었다.
// 근데 다시 지워서 해봤는데 갑자기 됨;;;
import {getCookie, deleteCookie} from "../shared/Cookie";

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { history } from '../redux/configureStore';
import { apiKey } from '../shared/firebase';

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    // const [is_login, setIsLogin] = React.useState(false);
    // 로그인 했을 때 안했을 때 헤더 나눠주기

    // React.useEffect(()=>{
    //     let cookie=getCookie("user_id");
    //     console.log(cookie);

    //     if(cookie) {
    //         setIsLogin(true);
    //     } else {
    //         setIsLogin(false);
    //     }
    // });
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false;
    
    console.log(is_session);

    if(is_login && is_session){
        return (
            <Grid is_flex padding="4px 16px">
                <Grid>
                    <Text margin="0px" sixe="24px" bold>헬로</Text>
                </Grid>
    
                <Grid is_flex>
                    <Button text="내정보"></Button>
                    <Button text="알림" _onClick={() => {
                      history.push('/noti');
                    }}></Button>
                    <Button text="로그아웃" _onClick={() => {
                        dispatch(userActions.logoutFB());
                    }}></Button>
                </Grid>
            </Grid>
        );
    
    }

    return (
        <Grid is_flex padding="4px 16px">
            <Grid>
                <Text margin="0px" sixe="24px" bold>헬로</Text>
            </Grid>

            <Grid is_flex>
                <Button text="로그인" _onClick={() => {
                    history.push('/login');
                }}></Button>
                <Button text="회원가입" _onClick={() => {
                    history.push('/signup');
                }}></Button>
            </Grid>
        </Grid>
    );  
    
}

Header.defaultProps = {}

export default Header;