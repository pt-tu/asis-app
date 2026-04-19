export type TaskTag = 'Work' | 'Study' | 'Health' | 'Finance';

export interface Task {
  id: string; // Mobile added for dynamic routing params
  task_name: string;
  start_time: string; // "HH:mm" format
  end_time: string; // "HH:mm" format
  duration_minutes: number;
  tag: TaskTag;
  isLocked?: boolean; // AI adjust lock
}

export interface UserState {
  isLoggedIn: boolean;
  name: string;
  email: string;
  avatar: string;
}

export interface FinanceState {
  fixedIncome: number;
  foodBudget: number;
  studyBudget: number;
  healthBudget: number;
  isOverdraftWarning: boolean;
}
