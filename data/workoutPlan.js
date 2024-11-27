const workoutPlan = [
  {
    day: 1,
    name: "Peito e Tríceps",
    dayName: "Segunda-feira",
    exercises: [
      { name: "Supino reto com halteres", series: 3, repetitions: 12 },
      { name: "Supino inclinado na máquina", series: 3, repetitions: 12 },
      { name: "Crucifixo com halteres", series: 3, repetitions: 15 },
      { name: "Tríceps pulley", series: 3, repetitions: 12 },
      { name: "Tríceps testa com halteres", series: 3, repetitions: 12 },
      { name: "Prancha abdominal", series: 3, repetitions: "30 segundos" },
    ],
  },
  {
    day: 2,
    name: "Costas e Bíceps",
    dayName: "Terça-feira",
    exercises: [
      { name: "Puxada frontal", series: 3, repetitions: 12 },
      { name: "Remada sentado na máquina", series: 3, repetitions: 12 },
      { name: "Pulldown com pegada neutra", series: 3, repetitions: 15 },
      { name: "Rosca direta com barra", series: 3, repetitions: 12 },
      { name: "Rosca martelo com halteres", series: 3, repetitions: 12 },
      {
        name: "Abdominais oblíquos",
        series: 3,
        repetitions: "15 repetições de cada lado",
      },
    ],
  },
  {
    day: 3,
    name: "Pernas e Core",
    dayName: "Quarta-feira",
    exercises: [
      { name: "Cadeira extensora (carga leve)", series: 3, repetitions: 15 },
      { name: "Cadeira flexora", series: 3, repetitions: 15 },
      { name: "Abdução de quadril na máquina", series: 3, repetitions: 15 },
      { name: "Adução de quadril na máquina", series: 3, repetitions: 15 },
      { name: "Elevação de panturrilha sentado", series: 3, repetitions: 20 },
      {
        name: "Exercícios de estabilidade (bola suíça)",
        series: 3,
        repetitions: "30 segundos",
      },
    ],
  },
  {
    day: 4,
    name: "Ombros e Trapézio",
    dayName: "Quinta-feira",
    exercises: [
      { name: "Desenvolvimento com halteres", series: 3, repetitions: 12 },
      { name: "Elevação lateral", series: 3, repetitions: 12 },
      { name: "Elevação frontal com halteres", series: 3, repetitions: 12 },
      {
        name: "Encolhimento de ombros com halteres",
        series: 3,
        repetitions: 15,
      },
      { name: "Face pull na polia", series: 3, repetitions: 15 },
      {
        name: "Prancha lateral",
        series: 3,
        repetitions: "30 segundos de cada lado",
      },
    ],
  },
  {
    day: 5,
    name: "Treino Funcional e Alongamento",
    dayName: "Sexta-feira",
    exercises: [
      {
        name: "Kettlebell swing (cuidado com o joelho)",
        series: 3,
        repetitions: 15,
      },
      { name: "Flexão de braço", series: 3, repetitions: 12 },
      { name: "Superman (para lombar)", series: 3, repetitions: 15 },
      { name: "Ponte para glúteos", series: 3, repetitions: 15 },
      {
        name: "Alongamentos estáticos",
        series: 1,
        repetitions: "Tempo variável",
      },
    ],
  },
  {
    day: 6,
    name: "Atividade Aeróbica de Baixo Impacto",
    dayName: "Sábado",
    exercises: [
      { name: "Bicicleta ergométrica", series: 1, repetitions: "45 minutos" },
      { name: "Elíptico", series: 1, repetitions: "45 minutos" },
      {
        name: "Alongamentos após a atividade",
        series: 1,
        repetitions: "Tempo variável",
      },
    ],
  },
  {
    day: 7,
    dayName: "Domingo",
    name: "",
    exercises: [],
  },
];

export default workoutPlan;
