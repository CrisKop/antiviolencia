import { User, Heart } from 'lucide-react';

export const classes = {
  primary: "#6A1B9A",
  primaryLight: "#8E24AA",
  primaryDark: "#4A148C",
  secondaryLight: "#E1F5FE",
  background: "#FAFAFA",
  error: "#EF9A9A",
  errorDark: "#E57373",
  success: "#A5D6A7",
  successDark: "#81C784",
  text: "#424242",
  textLight: "#757575",
  textLighter: "#9E9E9E",
};

export const steps = [
  { id: 1, title: "Situación actual", icon: User },
  { id: 2, title: "Estado emocional", icon: Heart }
];

export const questions = {
  1: [
    {
      id: "situacionHogar",
      type: "radio",
      question: "¿Alguien en tu casa te hace sentir con miedo o en peligro?",
      required: true,
      options: [
        { option: "Si", puntos: 10 },
        { option: "No", puntos: 0 },
      ]
    },
    {
      id: "tipoViolencia",
      type: "multiselect",
      question: "¿Cuál es el tipo de violencia que estás experimentando?",
      required: true,
      options: [
        { option: "Físicas (golpes, empujones, etc.)", puntos: 10 },
        { option: "Verbales (insultos, gritos, etc.)", puntos: 4 },
        { option: "Psicológica (manipulación, chantaje, etc.)", puntos: 6 },
        { option: "Sexual (acoso, abuso, etc.)", puntos: 10 },
        { option: "Económica (control de dinero, etc.)", puntos: 5 },
      ]
    },
    {
      id: "frecuenciaViolencia",
      type: "radio",
      question: "¿Cuántas veces ha experimentado violencia en el último mes?",
      required: true,
      options: [
        { option: "1-2 veces", puntos: 3 },
        { option: "3-5 veces", puntos: 6 },
        { option: "Más de 5 veces", puntos: 10 },
      ]
    },
    {
      id: "buscasteAyuda",
      type: "radio",
      question: "¿Has intentado buscar ayuda anteriormente?",
      required: true,
      options: [
        { option: "Sí", puntos: 2 },
        { option: "No", puntos: 5 },
      ]
    },
  ],
  2: [
    {
      id: "nivelEstres",
      type: "radio",
      question: "¿Cuál es tu nivel de ansiedad o estrés actual?",
      required: true,
      options: [
        { option: "Bajo", puntos: 1 },
        { option: "Moderado", puntos: 4 },
        { option: "Alto", puntos: 8 },
      ]
    },
    {
      id: "experimentoTrauma",
      type: "radio",
      question: "¿Ha experimentado algún tipo de trauma en el pasado?",
      required: true,
      options: [
        { option: "Sí", puntos: 6 },
        { option: "No", puntos: 0 },
      ]
    },
    {
      id: "apoyoSocial",
      type: "radio",
      question: "¿Cuál es tu nivel de apoyo social actual?",
      required: true,
      options: [
        { option: "Bajo (sin apoyo de amigos o familiares)", puntos: 8 },
        { option: "Moderado (algunos amigos/familiares me apoyan)", puntos: 4 },
        { option: "Alto (tengo una red de apoyo sólida)", puntos: 0 },
      ]
    },
    {
      id: "preocupacionPrincipal",
      type: "textarea",
      question: "¿Qué es lo que más te preocupa en este momento?",
      placeholder: "Escribe tu preocupación principal..."
      // No necesita puntos, se analiza cualitativamente
    }
  ]
};
