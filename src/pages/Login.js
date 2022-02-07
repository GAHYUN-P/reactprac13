import React from "react";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import Input from "../elements/Input";
import Text from "../elements/Text";
// import { Button, Grid, Input, Text } from "../elements";
// Module not found: Error: Cannot find file: 
//'index.js' does not match the corresponding name on disk: '.\src\elements\Index.js'
// 라는 에러가 계속 발생해서 그냥 Indext.js 를 안쓰고 다 빼서 각각 import해주니까 해결되었다.
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import {actionCreators as userActions} from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { emailCheck } from "../shared/common";

const Login = (props) => {
    const dispatch = useDispatch();
    
    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const login = () => {
        
        console.log(id);
        

        if(id ==="" || pwd ==="") {
            window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!")
            return;
        }

        if(!emailCheck(id)) {
            window.alert("이메일 형식이 맞지 않습니다!");
            return;
        }
      
        dispatch(userActions.loginFB(id, pwd));

    };
    

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text size="32px" bold="bold">
                    로그인
                </Text>

                <Grid padding="16px 0px">
                    <Input
                        label="아이디"
                        placeholder="아이디를 입력해주세요."
                        _onChange={(e) => {
                            setId(e.target.value);
                        }}/>
                </Grid>

                <Grid padding="16px 0px">
                    <Input
                        label="패스워드"
                        placeholder="패스워드 입력해주세요."
                        type="password"
                        _onChange={(e) => {
                            setPwd(e.target.value);
                        }}/>
                </Grid>

                <Button
                    text="로그인하기"
                    _onClick={() => {
                        console.log("로그인 했어!");
                        login();
                    }}></Button>
            </Grid>
        </React.Fragment>
    );
};

export default Login;