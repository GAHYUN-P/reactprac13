import styled from 'styled-components';
import React from "react";

const Image = (props) => {
    const {shape, src, size} = props;

    const styles = {
        src: src,
        size: size,
    }

    if(shape === "circle"){
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if(shape === "rectangle"){
        return (
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }

    return (
        <React.Fragment>
            <ImageDefault {...styles}></ImageDefault>
        </React.Fragment>
    )
}

Image.defaultProps = {
  shape: "circle",
  src: "https://cdn.class101.net/images/2897cf87-e75e-4f7a-b9ff-a33800066b55",
  size: 36,
};


const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

// 패딩 이용하여 반응형 네모 만들기
const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
`;


const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position: center center;
`;

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    /* --size는 props에서 사이즈를 받아온다 */
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    /* 사이즈를 원에 맞춘다 */
    margin: 4px;
`;

export default Image;