"use client";

import React from "react";
import { Check } from "lucide-react";
import { classes } from "@/utils/utils";

export const FormStep = ({ step, currentStep, title, isCompleted }) => {
  const isActive = step === currentStep;
  const isPassed = step < currentStep || isCompleted;

  const circleBase =
    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300";
  const titleBase = "text-sm font-medium transition-colors duration-200";

  let circleStyle = {};
  let titleStyle = {};

  if (isActive) {
    circleStyle = {
      backgroundColor: classes.primary,
      borderColor: classes.primary,
      color: "#fff",
      transform: "scale(1.1)",
    };
    titleStyle = { color: classes.primary };
  } else if (isPassed) {
    circleStyle = {
      backgroundColor: classes.success,
      borderColor: classes.success,
      color: "#fff",
    };
    titleStyle = { color: classes.success };
  } else {
    circleStyle = {
      backgroundColor: "#fff",
      borderColor: "#e0e0e0",
      color: classes.textLighter,
    };
    titleStyle = { color: classes.textLighter };
  }

  return (
    <div className="flex items-center">
      <div className={circleBase} style={circleStyle}>
        {isPassed && !isActive ? (
          <Check size={18} className="animate-bounce-subtle" />
        ) : (
          <span className="font-semibold text-sm">{step}</span>
        )}
      </div>

      <div className="ml-3">
        <p className={titleBase} style={titleStyle}>
          {title}
        </p>
      </div>
    </div>
  );
};
