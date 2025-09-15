export interface JournalEntry {
  id: string;
  text: string;
  time: string;
}

export interface Meal {
  id: string;
  name: string;
  type: string;
  time: string;
}

export interface WaterEntry {
  id?: string;
  count: number;
  time: string;
}

export interface Workout {
  id: string;
  duration: number;
  time: string;
}

export interface Period {
  id?: string;
  cycle_phase: string;
  cycle_start_date: string;
  cycle_length: number;
  cycle_duration: number;
  date: string;
}

export interface DayData {
  journal: JournalEntry[];
  meals: Meal[];
  water: WaterEntry[];
  workouts: Workout[];
  periods: Period[];
}
