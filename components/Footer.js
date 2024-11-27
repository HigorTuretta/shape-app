// components/Footer.js
import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

const FooterContainer = styled(SafeAreaView)`
  background-color: #000;
  padding-vertical: 10px;
  align-items: center;
`;

const FooterText = styled.Text`
  color: #fff;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2023 SHAPE</FooterText>
    </FooterContainer>
  );
};

export default Footer;
