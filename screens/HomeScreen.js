// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Button, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import workoutPlan from '../data/workoutPlan';
import ProgressBar from '../components/ProgressBar';
import ExerciseItem from '../components/ExerciseItem';

const Container = styled(ScrollView)`
  flex: 1;
  padding: 15px;
`;

const WelcomeText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const DayExercises = styled.View`
  padding-bottom: 50px;
`;

const ProgressCard = styled.View`
  margin-bottom: 20px;
`;

const DayText = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const FocusText = styled.Text`
  font-size: 20px;
  margin-bottom: 15px;
`;

const HomeScreen = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [displayedDay, setDisplayedDay] = useState(1);
  const [completedDays, setCompletedDays] = useState([]);
  const [exerciseCompletion, setExerciseCompletion] = useState({});

  useEffect(() => {
    const today = new Date().getDay();
    const adjustedDay = today === 0 ? 7 : today; // Domingo como dia 7
    setCurrentDay(adjustedDay);
    setDisplayedDay(adjustedDay);
  }, []);

  const handlePreviousDay = () => {
    setDisplayedDay((prev) => (prev === 1 ? 7 : prev - 1));
    // Remover esta linha para preservar o estado dos exercícios entre os dias
    // setExerciseCompletion({});
  };

  const handleNextDay = () => {
    setDisplayedDay((prev) => (prev === 7 ? 1 : prev + 1));
    // Remover esta linha para preservar o estado dos exercícios entre os dias
    // setExerciseCompletion({});
  };

  const getWeekdayName = (dayNumber) => {
    const date = new Date();
    const currentDayOfWeek = date.getDay() || 7; // Ajusta Domingo para 7
    const difference = dayNumber - currentDayOfWeek;
    const adjustedDate = new Date(date);
    adjustedDate.setDate(date.getDate() + difference);
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })
      .format(adjustedDate)
      .toUpperCase();
  };

  const dayPlan = workoutPlan.find((day) => day.day === displayedDay);

  const handleCompleteDay = () => {
    if (completedDays.includes(displayedDay)) {
      // Desmarcar o dia como completo
      setCompletedDays(completedDays.filter((day) => day !== displayedDay));
    } else {
      // Marcar o dia como completo
      setCompletedDays([...completedDays, displayedDay]);
    }
  };

  // Atualizar handleExerciseCheck
  const handleExerciseCheck = (exerciseName, isChecked) => {
    setExerciseCompletion((prev) => ({
      ...prev,
      [displayedDay]: {
        ...prev[displayedDay],
        [exerciseName]: isChecked,
      },
    }));
  };

  // Atualizar isDayComplete
  const currentDayCompletion = exerciseCompletion[displayedDay] || {};

  const isDayComplete =
    dayPlan &&
    dayPlan.exercises.length > 0 &&
    Object.keys(currentDayCompletion).length === dayPlan.exercises.length &&
    Object.values(currentDayCompletion).every((value) => value === true);

  // **Definir isDayMarkedComplete**
  const isDayMarkedComplete = completedDays.includes(displayedDay);

  return (
    <Container>
      <WelcomeText>Bem-vindo Higor</WelcomeText>

      {/* Card de Progresso */}
      <ProgressCard>
        <ProgressBar completedDays={completedDays.length} totalDays={6} />
      </ProgressCard>

      {/* Navegação Entre Dias */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={handlePreviousDay}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <DayText style={{ flex: 1, textAlign: 'center' }}>
          {getWeekdayName(displayedDay)}
        </DayText>
        <TouchableOpacity onPress={handleNextDay}>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Informação do Treino */}
      {dayPlan ? (
        <DayExercises>
          {dayPlan.name ? (
            <>
              <FocusText>{dayPlan.name}</FocusText>

              {/* Lista de Exercícios */}
              {dayPlan.exercises.map((exercise, index) => (
                <ExerciseItem
                  key={index}
                  exercise={exercise}
                  isCompleted={currentDayCompletion[exercise.name] || false}
                  onCheck={(isChecked) => handleExerciseCheck(exercise.name, isChecked)}
                />
              ))}

              {/* Botão para Marcar ou Desmarcar o Dia como Completo */}
              <Button
                title={
                  isDayMarkedComplete
                    ? 'Desmarcar Dia como Completo'
                    : 'Marcar Dia como Completo'
                }
                onPress={handleCompleteDay}
                disabled={
                  !isDayComplete && !isDayMarkedComplete // Botão habilitado se o dia estiver completo ou já estiver marcado como completo
                }
              />
            </>
          ) : (
            <Text>Sem treino programado para este dia.</Text>
          )}
        </DayExercises>
      ) : (
        <Text>Nenhum treino programado para este dia.</Text>
      )}
    </Container>
  );
};

export default HomeScreen;
