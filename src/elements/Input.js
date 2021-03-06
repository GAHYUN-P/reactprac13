import React from "react";
import styled from 'styled-components';
import Text from "./Text";
import Grid from "./Grid";
// import {Text,Grid} from "./Index.js";

const Input = (props) => {
    const { label, placeholder, _onChange, type, multiLine, value } = props;

    if(multiLine){
      return(
        <Grid>
          {label && <Text margin="0px">{label}</Text>}
          <ElTextarea rows={10} value={value} placeholder={placeholder} onChange={_onChange}></ElTextarea>
        </Grid>
      )
    }
    return (
      <React.Fragment>
        <Grid>
          {label ? "" : <Text margin="0px">{label}</Text>}
          {/* {label && <Text margin="0px">{label}</Text>} */}
          {/* 라벨이 있을 때에만 라벨을 붙여줘라 */}
          <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
        </Grid>
      </React.Fragment>
    );
  };
  
  Input.defaultProps = {
    multiLine: false,
    label: false,
    placeholder: "텍스트를 입력해주세요.",
    type: "text",
    _onChange: () => {},
    value: "",
  };

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;
  
  const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
  `;
  
  export default Input;