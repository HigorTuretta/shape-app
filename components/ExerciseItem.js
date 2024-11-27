// components/ExerciseItem.js
import React from 'react';
import styled from 'styled-components/native';
import { Switch, Text } from 'react-native';

const Container = styled.View`
  margin-bottom: 15px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  elevation: 1;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const ExerciseName = styled.Text`
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Input = styled.TextInput`
  margin-top: 10px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  padding: 10px;
`;

const ExerciseItem = ({ exercise, isCompleted, onCheck }) => {
  const [weight, setWeight] = React.useState('');

  const toggleSwitch = () => {
    onCheck(!isCompleted);
  };

  return (
    <Container>
      <Header>
        <Switch
          value={isCompleted}
          onValueChange={toggleSwitch}
          thumbColor={isCompleted ? '#0d0d0d' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#767577' }}
        />
        <ExerciseName>{exercise.name}</ExerciseName>
      </Header>
      <Text>
        {exercise.series} séries de {exercise.repetitions} repetições
      </Text>
      <Input
        placeholder="Carga (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
    </Container>
  );
};

export default ExerciseItem;
