import React from "react";
import styled from "styled-components";
import { auth } from "../shared/firebase";

const Text = (props) => {
  const { bold, color, size, children, margin, width } = props;

  const styles = {bold: bold, color: color, size: size, margin, width};
  return (
      <P {...styles}>
          {children}
      </P>
  )
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: false,
  width: "auto",
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "600" : "400")};
  ${(props) => (props.margin? `margin: ${props.margin};` : '')}; 
  width: ${(props) => props.width};
`;

export default Text;