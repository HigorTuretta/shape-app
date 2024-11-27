// components/Header.js
import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

const HeaderContainer = styled(SafeAreaView)`
  background-color: #000;
  padding-vertical: 15px;
  padding-horizontal: 20px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>SHAPE</Title>
    </HeaderContainer>
  );
};

export default Header;
