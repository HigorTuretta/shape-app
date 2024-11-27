// screens/WorkoutsScreen.js
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import workoutPlan from '../data/workoutPlan';

const Container = styled.View`
  flex: 1;
`;

const ScrollContainer = styled(ScrollView)`
  padding: 15px;
`;

const DayCard = styled.View`
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  elevation: 1;
`;

const DayHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  justify-content: space-between;
`;

const DayTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const ExerciseList = styled.View`
  padding: 0 15px 15px 15px;
`;

const ExerciseItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const ExerciseText = styled.Text`
  font-size: 16px;
`;

const EditModal = styled.Modal``;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  margin: 20px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const ButtonText = styled.Text`
  color: #1b5be5;
  font-weight: bold;
  margin-left: 15px;
`;

const WorkoutsScreen = () => {
  const [expandedDays, setExpandedDays] = useState([]);
  const [editWorkoutModalVisible, setEditWorkoutModalVisible] = useState(false);
  const [editExerciseModalVisible, setEditExerciseModalVisible] = useState(false);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workouts, setWorkouts] = useState(workoutPlan);
  const [newExercise, setNewExercise] = useState({
    name: '',
    series: '',
    repetitions: '',
  });

  const toggleExpandDay = (day) => {
    if (expandedDays.includes(day)) {
      setExpandedDays(expandedDays.filter((d) => d !== day));
    } else {
      setExpandedDays([...expandedDays, day]);
    }
  };

  const openEditWorkoutModal = (workout) => {
    setSelectedWorkout(workout);
    setEditWorkoutModalVisible(true);
  };

  const closeEditWorkoutModal = () => {
    setEditWorkoutModalVisible(false);
    setSelectedWorkout(null);
  };

  const saveWorkoutName = () => {
    const updatedWorkouts = workouts.map((w) =>
      w.day === selectedWorkout.day ? selectedWorkout : w
    );
    setWorkouts(updatedWorkouts);
    closeEditWorkoutModal();
  };

  const deleteWorkout = (workout) => {
    Alert.alert(
      'Excluir Treino',
      `Tem certeza de que deseja excluir o treino de ${workout.dayName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const updatedWorkouts = workouts.map((w) =>
              w.day === workout.day ? { ...w, name: '', exercises: [] } : w
            );
            setWorkouts(updatedWorkouts);
          },
        },
      ]
    );
  };

  const openEditExerciseModal = (exercise, workout) => {
    setSelectedExercise({ ...exercise, workoutDay: workout.day });
    setEditExerciseModalVisible(true);
  };

  const closeEditExerciseModal = () => {
    setEditExerciseModalVisible(false);
    setSelectedExercise(null);
  };

  const saveExercise = () => {
    const updatedWorkouts = workouts.map((w) => {
      if (w.day === selectedExercise.workoutDay) {
        const updatedExercises = w.exercises.map((e) =>
          e.name === selectedExercise.name ? selectedExercise : e
        );
        return { ...w, exercises: updatedExercises };
      }
      return w;
    });
    setWorkouts(updatedWorkouts);
    closeEditExerciseModal();
  };

  const deleteExercise = (exercise, workout) => {
    Alert.alert(
      'Excluir Exercício',
      `Tem certeza de que deseja excluir o exercício "${exercise.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const updatedWorkouts = workouts.map((w) => {
              if (w.day === workout.day) {
                const updatedExercises = w.exercises.filter(
                  (e) => e.name !== exercise.name
                );
                return { ...w, exercises: updatedExercises };
              }
              return w;
            });
            setWorkouts(updatedWorkouts);
          },
        },
      ]
    );
  };

  const openAddExerciseModal = (workout) => {
    setSelectedWorkout(workout);
    setAddExerciseModalVisible(true);
  };

  const closeAddExerciseModal = () => {
    setAddExerciseModalVisible(false);
    setNewExercise({ name: '', series: '', repetitions: '' });
  };

  const addExercise = () => {
    const updatedWorkouts = workouts.map((w) => {
      if (w.day === selectedWorkout.day) {
        return { ...w, exercises: [...w.exercises, newExercise] };
      }
      return w;
    });
    setWorkouts(updatedWorkouts);
    closeAddExerciseModal();
  };

  return (
    <Container>
      <ScrollContainer>
        {workouts.map((workout) => (
          <DayCard key={workout.day}>
            <DayHeader onPress={() => toggleExpandDay(workout.day)}>
              <DayTitle>{workout.dayName}</DayTitle>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {workout.name ? (
                  <TouchableOpacity
                    onPress={() => deleteWorkout(workout)}
                    style={{ marginRight: 10 }}
                  >
                    <Ionicons name="trash" size={24} color="black" />
                  </TouchableOpacity>
                ) : null}
                <Ionicons
                  name={expandedDays.includes(workout.day) ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color="black"
                />
              </View>
            </DayHeader>
            {expandedDays.includes(workout.day) && (
              <ExerciseList>
                {workout.name ? (
                  <>
                    <ExerciseText
                      style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}
                    >
                      {workout.name}
                    </ExerciseText>
                    <TouchableOpacity onPress={() => openEditWorkoutModal(workout)}>
                      <ExerciseText style={{ color: '#1b5be5', marginBottom: 10 }}>
                        Editar Nome do Treino
                      </ExerciseText>
                    </TouchableOpacity>
                    {workout.exercises.map((exercise, index) => (
                      <ExerciseItem
                        key={index}
                        onPress={() => openEditExerciseModal(exercise, workout)}
                      >
                        <ExerciseText>{exercise.name}</ExerciseText>
                        <TouchableOpacity
                          onPress={() => deleteExercise(exercise, workout)}
                        >
                          <Ionicons name="trash" size={20} color="black" />
                        </TouchableOpacity>
                      </ExerciseItem>
                    ))}
                    <TouchableOpacity onPress={() => openAddExerciseModal(workout)}>
                      <ExerciseText style={{ color: '#1b5be5', marginTop: 10 }}>
                        Adicionar Exercício
                      </ExerciseText>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedWorkout(workout);
                      openEditWorkoutModal(workout);
                    }}
                  >
                    <ExerciseText style={{ color: '#1b5be5', marginBottom: 10 }}>
                      Adicionar Nome do Treino
                    </ExerciseText>
                  </TouchableOpacity>
                )}
              </ExerciseList>
            )}
          </DayCard>
        ))}
      </ScrollContainer>

      {/* Modal para Editar Nome do Treino */}
      <EditModal visible={editWorkoutModalVisible} transparent animationType="slide">
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Editar Nome do Treino</ModalTitle>
            <Input
              value={selectedWorkout?.name}
              onChangeText={(text) =>
                setSelectedWorkout({ ...selectedWorkout, name: text })
              }
            />
            <ButtonRow>
              <TouchableOpacity onPress={closeEditWorkoutModal}>
                <ButtonText>Cancelar</ButtonText>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveWorkoutName}>
                <ButtonText>Salvar</ButtonText>
              </TouchableOpacity>
            </ButtonRow>
          </ModalContent>
        </ModalContainer>
      </EditModal>

      {/* Modal para Editar Exercício */}
      <EditModal visible={editExerciseModalVisible} transparent animationType="slide">
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Editar Exercício</ModalTitle>
            <Text>Nome do Exercício:</Text>
            <Input
              value={selectedExercise?.name}
              onChangeText={(text) =>
                setSelectedExercise({ ...selectedExercise, name: text })
              }
            />
            <Text>Séries:</Text>
            <Input
              keyboardType="numeric"
              value={String(selectedExercise?.series)}
              onChangeText={(text) =>
                setSelectedExercise({ ...selectedExercise, series: Number(text) })
              }
            />
            <Text>Repetições:</Text>
            <Input
              keyboardType="numeric"
              value={String(selectedExercise?.repetitions)}
              onChangeText={(text) =>
                setSelectedExercise({
                  ...selectedExercise,
                  repetitions: Number(text),
                })
              }
            />
            <ButtonRow>
              <TouchableOpacity onPress={closeEditExerciseModal}>
                <ButtonText>Cancelar</ButtonText>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveExercise}>
                <ButtonText>Salvar</ButtonText>
              </TouchableOpacity>
            </ButtonRow>
          </ModalContent>
        </ModalContainer>
      </EditModal>

      {/* Modal para Adicionar Exercício */}
      <EditModal visible={addExerciseModalVisible} transparent animationType="slide">
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Adicionar Exercício</ModalTitle>
            <Text>Nome do Exercício:</Text>
            <Input
              value={newExercise.name}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, name: text })
              }
            />
            <Text>Séries:</Text>
            <Input
              keyboardType="numeric"
              value={newExercise.series}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, series: text })
              }
            />
            <Text>Repetições:</Text>
            <Input
              keyboardType="numeric"
              value={newExercise.repetitions}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, repetitions: text })
              }
            />
            <ButtonRow>
              <TouchableOpacity onPress={closeAddExerciseModal}>
                <ButtonText>Cancelar</ButtonText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (
                    newExercise.name &&
                    newExercise.series &&
                    newExercise.repetitions
                  ) {
                    addExercise();
                  } else {
                    Alert.alert('Erro', 'Por favor, preencha todos os campos.');
                  }
                }}
              >
                <ButtonText>Adicionar</ButtonText>
              </TouchableOpacity>
            </ButtonRow>
          </ModalContent>
        </ModalContainer>
      </EditModal>
    </Container>
  );
};

export default WorkoutsScreen;
