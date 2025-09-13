import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Heart, Moon, Sun } from "lucide-react";
import BasicInputs from './ui/CycleTrackerComponents/BasicInputs';
import AdvancedOptions from './ui/CycleTrackerComponents/AdvancedOptions';
import CurrentDayDisplay from './ui/CycleTrackerComponents/CurrentDayDisplay';
import PhaseDisplay from './ui/CycleTrackerComponents/PhaseDisplay';
import PhasesOverview from './ui/CycleTrackerComponents/PhasesOverview';


const PeriodTracker = () => {
  const [formData, setFormData] = useState({
    lastPeriodDate: '',
    cycleLength: 28,
    periodDuration: 5,
    lifeStage: '18-44',
    pmsTiming: '4-7',
    previousCycles: [],
    enableRegularity: false,
    cycleRegularity: 'regular',
    enableFlowTracking: false,
    enableLutealPhase: false,
    lutealPhase: 14,
  });

  const [currentDay, setCurrentDay] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);

  const phases = [
    {
      name: "Menstrual",
      icon: Moon,
      days: "1-5",
      description: "Your period. Rest and be gentle with yourself.",
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    },
    {
      name: "Follicular", 
      icon: Sun,
      days: "6-13",
      description: "Energy is building. Great time to start new projects.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      name: "Ovulation",
      icon: Heart,
      days: "14-16", 
      description: "Peak energy and fertility. You might feel most social.",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      name: "Luteal",
      icon: Waves,
      days: "17-28",
      description: "Energy may dip. Focus on self-care and completion.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const getCurrentPhase = (day) => {
    if (day >= 1 && day <= 5) return "menstrual";
    if (day >= 6 && day <= 13) return "follicular";
    if (day >= 14 && day <= 16) return "ovulation";
    return "luteal";
  };

 const calculateCurrentDay = () => {
    if (!formData.lastPeriodDate) return 1;
    
    const startDate = new Date(formData.lastPeriodDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const dayInCycle = ((diffDays - 1) % formData.cycleLength) + 1;
    return dayInCycle;
  };

  const handleCalculatePredictions = () => {
    if (formData.lastPeriodDate) {
      const calculatedDay = calculateCurrentDay();
      setCurrentDay(calculatedDay);
      setIsFormValid(true);
    }
  };

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    setIsFormValid(!!formData.lastPeriodDate);
  }, [formData.lastPeriodDate]);

  const phase = getCurrentPhase(currentDay);
  const currentPhaseData = phases.find(p => p.name.toLowerCase() === phase);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-rose-800 mb-2">Cycle Tracker</h1>
          <p className="text-rose-600">Understanding your natural rhythm</p>
        </div>

        {/* Basic Inputs Section */}
        <BasicInputs 
          formData={formData}
          updateFormData={updateFormData}
          onCalculate={handleCalculatePredictions}
          isFormValid={isFormValid}
        />

        {/* Advanced Options */}
        <AdvancedOptions 
          formData={formData}
          updateFormData={updateFormData}
        />

        {/* Current Day Display */}
        {isFormValid && (
          <CurrentDayDisplay 
            currentDay={currentDay}
            cycleLength={formData.cycleLength}
          />
        )}

        {/* Current Phase Display */}
        {isFormValid && currentPhaseData && (
          <PhaseDisplay phaseData={currentPhaseData} />
        )}

        {/* All Phases Overview */}
        <PhasesOverview 
          phases={phases}
          currentPhase={isFormValid ? phase : null}
        />
      </div>
    </div>
  );
};

export default PeriodTracker;