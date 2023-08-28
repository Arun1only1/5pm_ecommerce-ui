import { Typography } from "@mui/material";
import React from "react";
import { styled } from "styled-components";

const Footer = () => {
  return (
    <StyledFooterDiv>
      <StyledTypography>Copyright Nepal Mart &#x40;2023</StyledTypography>
    </StyledFooterDiv>
  );
};

export default Footer;

const StyledFooterDiv = styled.div`
  width: 100%;
  height: 80px;
  background: #352f44;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTypography = styled(Typography)`
  font-size: 1.5rem !important;
  color: #d3d3d3;
`;
