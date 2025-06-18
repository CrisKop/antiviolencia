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
        "Si",
        "No",
      ]
    },
    {
      id: "tipoViolencia",
      type: "multiselect",
      question: "¿Cuál es el tipo de violencia que estás experimentando?",
      required: true,
      options: [
        "Físicas (golpes, empujones, etc.)",
        "Verbales (insultos, gritos, etc.)",
        "Psicológica (manipulación, chantaje, etc.)",
        "Sexual (acoso, abuso, etc.)",
        "Económica (control de dinero, etc.)"
      ]
    },
    {
      id: "frecuenciaViolencia",
      type: "radio",
      question: "¿Cuántas veces ha experimentado violencia en el último mes?",
      required: true,
      options: ["1-2 veces", "3-5 veces", "Más de 5 veces"]
    },
    {
      id: "buscasteAyuda",
      type: "radio",
      question: "¿Has intentado buscar ayuda anteriormente?",
      required: true,
      options: ["Sí", "No"]
    },
  ],
  2: [
    {
      id: "nivelEstres",
      type: "radio",
      question: "¿Cuál es tu nivel de ansiedad o estrés actual?",
      required: true,
      options: ["Bajo", "Moderado", "Alto"]
    },
    {
      id: "experimentoTrauma",
      type: "radio",
      question: "¿Ha experimentado algún tipo de trauma en el pasado?",
      required: true,
      options: ["Sí", "No"]
    },
    {
      id: "apoyoSocial",
      type: "radio",
      question: "¿Cuál es tu nivel de apoyo social actual?",
      required: true,
      options: ["Bajo (sin apoyo de amigos o familiares)", "Moderado (algunos amigos/familiares me apoyan)", "Alto (tengo una red de apoyo sólida)"]
    },
    {
      id: "preocupacionPrincipal",
      type: "textarea",
      question: "¿Qué es lo que más te preocupa en este momento?",
      placeholder: "Escribe tu preocupación principal..."
    }
  ]
};