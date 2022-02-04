import React from 'react';
import {Grid, Text, Button} from "../elements/Index";
// 그냥 elements/Index로 불러오면 에러가 생겨서 Index.js로 import하니까 해결되었다.
// 근데 다시 지워서 해봤는데 갑자기 됨;;;

const Header = (props) => {

    return (
        <Grid is_flex padding="4px 16px">
            <Grid>
                <Text margin="0px" sixe="24px" bold>헬로</Text>
            </Grid>

            <Grid is_flex>
                <Button text="로그인"></Button>
                <Button text="회원가입"></Button>
            </Grid>
        </Grid>
    );
}

Header.defaultProps = {}

export default Header;