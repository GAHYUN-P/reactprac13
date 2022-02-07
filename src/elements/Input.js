import React from "react";
import styled from 'styled-components';
import Text from "./Text";
import Grid from "./Grid";
// import {Text,Grid} from "./Index.js";

const Input = (props) => {

    const {label, placeholder, _onChange} = props;

    return (
        <React.Fragment>
            <Grid>
                <Text margin="0px">{label}</Text>
                <ElInput placeholder={placeholder} onChange={_onChange}/>
            </Grid>
        </React.Fragment>
    )
}

const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

Input.defaultProps = {
    label: '텍스트',
    placeholder: '텍스트를 입력하세요',
    _onChange: () => {},
}

export default Input;