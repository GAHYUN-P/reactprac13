import React from 'react';
import styled from "styled-components";

const Button = (props) => {
    
    const {text, _onClick, is_float, children, margin, width, padding, _disabled} = props;

    if(is_float){
        return (
            <React.Fragment>
                <FloatButton onClick={_onClick}>{text? text : children}</FloatButton>
            </React.Fragment>
        )
    }
    
    const styles = {
        margin: margin,
        width: width,
        padding: padding,
    };

    return (
        <React.Fragment>
            <ElButton {...styles} onClick={_onClick} disabled={_disabled}>{text? text : children}</ElButton>
        </React.Fragment>
    )
  };

Button.defaultProps = {
    text: false,
    _onClick: () => {},
    is_float: false,
    children: null,
    margin: false,
    width: '100%',
    padding: "12px 0px",
    _disabled: false,
}

const ElButton = styled.button`
    width: ${(props) => props.width};
    background-color: #212121;
    color: #fff;
    padding: ${(props) => props.padding};
    box-sizing: border-box;
    border: none;
    ${(props) => props.margin ? `margin: ${props.margin}` : ''};
    background-color: ${(props) => (props.disabled ? "gray" : "#212121")};
`;
  
const FloatButton = styled.button `
    width: 50px;
    height: 50px;
    background-color: #212121;
    color: #fff;
    box-sizing: border-box;
    font-size: 36px;
    font-weight: 800;
    position: fixed;
    bottom: 50px;
    right: 16px;
    text-align: center;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
`;

export default Button;