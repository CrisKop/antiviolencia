// Reemplazo completo del componente QuestionnaireForm con clases personalizadas inline
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  RotateCcw,
  Star,
} from "lucide-react";
import { FormStep } from "./FormStep";

import { classes, questions, steps } from "@/utils/utils";

export const QuestionnaireForm = () => {
  const router = useRouter();
  // #MARK: States
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [violentometro, setViolentometro] = useState(0);

  const currentQuestions = questions[currentStep] || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const isLastQuestionInStep =
    currentQuestionIndex === currentQuestions.length - 1;
  const isLastStep = currentStep === Object.keys(questions).length;

  //#MARK: Validate current question
  const validateCurrentQuestion = () => {
    if (!currentQuestion?.required) return true;
    const answer = answers[currentQuestion.id];
    const newErrors = {};
    if (
      !answer ||
      (Array.isArray(answer) && answer.length === 0) ||
      answer === ""
    ) {
      newErrors[currentQuestion.id] = "This question is required";
    }
    if (currentQuestion.type === "rating" && (!answer || answer === 0)) {
      newErrors[currentQuestion.id] = "Please provide a rating";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleNext = () => {
  if (!validateCurrentQuestion()) return;

  const answer = answers[currentQuestion.id];

  // 👉 Lógica para sumar puntos
  let puntos = 0;

  if (currentQuestion.type === "radio" || currentQuestion.type === "select") {
    const selected = currentQuestion.options.find(opt => opt.option === answer);
    if (selected) puntos += selected.puntos;
  }

  if (currentQuestion.type === "multiselect") {
    for (const selectedOption of answer) {
      const selected = currentQuestion.options.find(opt => opt.option === selectedOption);
      if (selected) puntos += selected.puntos;
    }
  }

  setViolentometro(prev => prev + puntos); // ✅ suma al total actual

  if (isLastQuestionInStep) {
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep(currentStep + 1);
      setCurrentQuestionIndex(0);
    }
  } else {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  console.log(violentometro)
  setErrors({});
};


  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setCurrentQuestionIndex(questions[currentStep - 1].length - 1);
    }
    setErrors({});
  };


  //#MARK: Enviar form
  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsCompleted(true);
  };

  useEffect(() => {

    const redirectToChat = () => {
  const keywordsToSend = answers.tipoViolencia
    .map(str => str.split(" ")[0])
    .join(" ");

  const encodedKeywords = encodeURIComponent(keywordsToSend);
  const encodedViolentometro = encodeURIComponent(violentometro)
  router.push(`/chat?keywords=${encodedKeywords}&violentometro=${encodedViolentometro}`);
};


    if (isCompleted) {
      // Redirect to chat after 2 seconds
      console.log("Form completed, redirecting to chat...");
      setTimeout(() => {
        redirectToChat();
      }, 2000);
    }
  }, [isCompleted, answers, router]);






  const updateAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (errors[questionId]) {
      setErrors((prev) => ({ ...prev, [questionId]: "" }));
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const answer = answers[currentQuestion.id];
    const error = errors[currentQuestion.id];

    switch (currentQuestion.type) {
      case "text":
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={answer || ""}
              onChange={(e) => updateAnswer(currentQuestion.id, e.target.value)}
              placeholder={currentQuestion.placeholder}
              className={`
                w-full px-6 py-4 text-lg bg-white border-2 rounded-xl
                transition-all duration-200 outline-none text-[#424242]
                ${
                  error
                    ? "border-error focus:border-error focus:ring-4 focus:ring-error/20"
                    : "border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
                }
              `}
            />
          </div>
        );

      case "select":
        return (
          <div className="space-y-4">
            <select
              value={answer || ""}
              onChange={(e) => updateAnswer(currentQuestion.id, e.target.value)}
              className={`
                w-full px-6 py-4 text-lg bg-white border-2 rounded-xl
                transition-all duration-200 outline-none text-[#424242]
                ${
                  error
                    ? "border-error focus:border-error focus:ring-4 focus:ring-error/20"
                    : "border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
                }
              `}
            >
              <option value="">Select an option...</option>
              {currentQuestion.options?.map((option) => (
                <option key={option.option} value={option.option}>
                  {option.option}
                </option>
              ))}
            </select>
          </div>
        );

      case "radio":
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <label
                key={option.option}
                className={`
                  flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-[#424242]
                  ${
                    answer === option.option
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option.option}
                  checked={answer === option.option}
                  onChange={(e) =>
                    updateAnswer(currentQuestion.id, e.target.value)
                  }
                  className="sr-only text-[#424242]"
                />
                <div
                  className={`
                  w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                  ${answer === option ? "border-primary" : "border-gray-300"}
                `}
                >
                  {answer === option && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-scale-in" />
                  )}
                </div>
                <span className="text-lg text-text">{option.option}</span>
              </label>
            ))}
          </div>
        );

      case "multiselect":
        const selectedOptions = answer || [];
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <label
                key={option.option}
                className={`
                  flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-[#424242]
                  ${
                    selectedOptions.includes(option.option)
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.option)}
                  onChange={(e) => {
                    const newSelected = e.target.checked
                      ? [...selectedOptions, option.option]
                      : selectedOptions.filter((item) => item !== option.option);
                    updateAnswer(currentQuestion.id, newSelected);
                  }}
                  className="sr-only text-[#424242]"
                />
                <div
                  className={`
                  w-5 h-5 rounded border-2 mr-3 flex items-center justify-center
                  ${
                    selectedOptions.includes(option.option)
                      ? "border-primary bg-primary"
                      : "border-gray-300"
                  }
                `}
                >
                  {selectedOptions.includes(option.option) && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-lg text-text">{option.option}</span>
              </label>
            ))}
          </div>
        );

      case "rating":
        return (
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => updateAnswer(currentQuestion.id, rating)}
                className={`
                  p-3 rounded-full transition-all duration-200 transform hover:scale-110
                  ${
                    answer >= rating
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-300"
                  }
                `}
              >
                <Star
                  size={40}
                  fill={answer >= rating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-4">
            <textarea
              value={answer || ""}
              onChange={(e) => updateAnswer(currentQuestion.id, e.target.value)}
              placeholder={currentQuestion.placeholder}
              rows={4}
              className={`
                w-full px-6 py-4 text-lg bg-white border-2 rounded-xl resize-none
                transition-all duration-200 outline-none text-[#424242]
                ${
                  error
                    ? "border-error focus:border-error focus:ring-4 focus:ring-error/20"
                    : "border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
                }
              `}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const totalQuestions = Object.values(questions).flat().length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const bgStyle = {
    background: `linear-gradient(to bottom right, ${classes.background}, ${classes.secondaryLight})`,
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#FAFAFA] to-[#E1F5FE]">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 bg-[#A5D6A7] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#424242] mb-4">¡Ya casi!</h2>
          <p className="text-[#757575] mb-8 text-lg">
            Tu situación ha sido registrada exitosamente. <br />
            <br />
            Estamos analizando tus respuestas para ofrecerte la mejor
            experiencia posible.
          </p>
          {/*
            <button
            onClick={() => {
              setIsCompleted(false);
              setCurrentStep(1);
              setCurrentQuestionIndex(0);
              setAnswers({});
              setErrors({});
            }}
            className="bg-[#6A1B9A] hover:bg-[#4A148C] text-white px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={20} />
            Boton de ejemplo
          </button>
          */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#FAFAFA] to-[#E1F5FE]">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Explicanos tu caso</h1>
          <p className="text-white/90 mb-4">
            Ayudanos a comprender tu situación
          </p>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-white/80 mt-2">
            {answeredQuestions} de {totalQuestions} preguntas respondidas
          </p>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 bg-[#E1F5FE] p-8">
            <div className="space-y-8">
              {steps.map((step) => (
                <FormStep
                  key={step.id}
                  step={step.id}
                  currentStep={currentStep}
                  title={step.title}
                  isCompleted={step.id < currentStep}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 p-8">
            <div className="max-w-2xl mx-auto">
              <div className="animate-slide-in">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-[#6A1B9A] bg-[#6A1B9A]/10 px-3 py-1 rounded-full">
                      Pregunta {currentQuestionIndex + 1} de{" "}
                      {currentQuestions.length}
                    </span>
                    <span className="text-sm text-[#757575]">
                      Paso {currentStep} de {Object.keys(questions).length}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#424242] mb-6 leading-relaxed">
                    {currentQuestion?.question}
                    {currentQuestion?.required && (
                      <span className="text-[#EF9A9A] ml-1">*</span>
                    )}
                  </h2>
                </div>

                {renderQuestion()}

                {errors[currentQuestion?.id] && (
                  <p className="mt-4 text-[#EF9A9A] text-sm animate-slide-in">
                    {errors[currentQuestion.id]}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mt-12">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1 && currentQuestionIndex === 0}
                  className="flex items-center gap-2 px-6 py-3 text-[#757575] hover:text-[#424242] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                  Anterior
                </button>

                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-[#6A1B9A] hover:bg-[#4A148C] disabled:bg-[#9E9E9E] text-white px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : isLastStep && isLastQuestionInStep ? (
                    <>
                      Enviar Respuestas
                      <CheckCircle size={20} />
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ChevronRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
