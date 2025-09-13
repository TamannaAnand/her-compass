import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const CurrentDayDisplay = ({ currentDay, cycleLength }) => {
  const progressPercentage = currentDay / cycleLength;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference * (1 - progressPercentage);

  return (
    <Card className="mb-8 bg-gradient-to-br from-rose-400 to-pink-500 border-0 shadow-lg">
      <CardContent className="p-8 text-center">
        <div className="space-y-4">
          <div className="text-white">
            <p className="text-lg opacity-90">Day</p>
            <p className="text-5xl font-bold">{currentDay}</p>
            <p className="text-sm opacity-75">of {cycleLength} day cycle</p>
          </div>
          
          {/* Progress Circle */}
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentDayDisplay;