import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Calendar } from "./calendar";
import { fetchEntriesByDate } from "@/api/journalAPI";
import { fetchMealsByDate } from "@/api/mealAPI";
import { fetchWaterByDate } from "@/api/waterAPI";

const CalendarDisplay = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [data, setData] = useState({
    meals: [],
    exercises: [],
    water: 0,
  });

  useEffect(() => {
    if (selectedDate) {
      const fetchData = async () => {
        const formattedDate = selectedDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
        try {
          const meals = await fetchMealsByDate(formattedDate);
          const exercises = await fetchEntriesByDate(formattedDate);
          const waterData = await fetchWaterByDate(formattedDate);
          console.log("Fetched data:", { meals, exercises, waterData }); // Log fetched data

          console.log("Fetched data:", { meals, exercises, waterData }); // Log fetched data

          setData({
            meals: meals || [],
            exercises: exercises || [],
            water: waterData?.[0]?.count || 0, // Extract water count or default to 0
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [selectedDate]);

  return (
    <div className="w-full">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="mb-4"
      />
      <Accordion type="multiple" className="border border-gray-200 rounded-md shadow-sm">
        <AccordionItem value="meals" className="border-b last:border-b-0">
          <AccordionTrigger className="flex justify-between items-center p-4 text-sm font-medium text-gray-800 hover:bg-gray-100">
            Meals Recorded
          </AccordionTrigger>
          <AccordionContent className="p-4 text-sm text-gray-600">
            {data.meals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.meals.map((meal, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-md p-3 shadow-sm bg-gray-50"
                  >
                    <p className="font-medium text-gray-800">
                      {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
                    </p>
                    <p className="text-gray-600">{meal.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No meals recorded for this date.</p>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="exercises" className="border-b last:border-b-0">
          <AccordionTrigger className="flex justify-between items-center p-4 text-sm font-medium text-gray-800 hover:bg-gray-100">
            Exercises Completed
          </AccordionTrigger>
          <AccordionContent className="p-4 text-sm text-gray-600">
            {data.exercises.length > 0 ? (
              <ul className="list-disc pl-5">
                {data.exercises.map((exercise, index) => (
                  <li key={index}>{exercise.name}</li>
                ))}
              </ul>
            ) : (
              <p>No exercises completed for this date.</p>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="water" className="border-b last:border-b-0">
          <AccordionTrigger className="flex justify-between items-center p-4 text-sm font-medium text-gray-800 hover:bg-gray-100">
            Water Intake
          </AccordionTrigger>
          <AccordionContent className="p-4 text-sm text-gray-600">
            {data.water > 0 ? (
              <p>{data.water} ml</p>
            ) : (
              <p>No water intake recorded for this date.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CalendarDisplay;
