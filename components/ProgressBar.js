// components/ProgressBar.js
import React from 'react';
import styled from 'styled-components/native';
import * as Progress from 'react-native-progress';

const Container = styled.View`
  padding: 15px;
  background-color: #000;
  border-radius: 8px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-offset: 0px 2px;
`;

const Title = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
  color: #fff;
`;

const ProgressBar = ({ completedDays, totalDays }) => {
  const progress = completedDays / totalDays;

  return (
    <Container>
      <Title>
        Progresso Semanal: {completedDays}/{totalDays} dias completos
      </Title>
      <Progress.Bar
        progress={progress}
        width={null}
        color="#4caf50"
        unfilledColor="#ccc"
        borderWidth={0}
        height={10}
      />
    </Container>
  );
};

export default ProgressBar;
