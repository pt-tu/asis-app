import { create } from 'zustand';

// 1. DTO Types reflecting asis-web/src/types/task.ts
export type TaskTag = 'Work' | 'Study' | 'Health' | 'Finance';

export interface Task {
  id: string; // Mobile added for dynamic routing params
  task_name: string;
  start_time: string; // "HH:mm" format
  end_time: string; // "HH:mm" format
  duration_minutes: number;
  tag: TaskTag;
}

export interface UserState {
  isLoggedIn: boolean;
  name: string;
  email: string;
  avatar: string;
}

export const TAG_COLORS: Record<
  TaskTag,
  { bg: string; border: string; text: string }
> = {
  Work: {
    bg: 'bg-orange-100/50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-800 dark:text-orange-400',
  },
  Study: {
    bg: 'bg-sky-100/50 dark:bg-sky-950/30',
    border: 'border-sky-200 dark:border-sky-800',
    text: 'text-sky-800 dark:text-sky-400',
  },
  Health: {
    bg: 'bg-emerald-100/50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-800 dark:text-emerald-400',
  },
  Finance: {
    bg: 'bg-amber-100/50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-800 dark:text-amber-400',
  },
};

// 2. Initial Mock Data reflecting Medical Student Schedule
const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    task_name: 'Trực gác bệnh viện (On-call 24h)',
    start_time: '08:00',
    end_time: '08:00', // Indicates next day
    duration_minutes: 1440,
    tag: 'Work',
  },
  {
    id: 't2',
    task_name: 'Thực tập lâm sàng khoa Ngoại',
    start_time: '08:30',
    end_time: '12:00',
    duration_minutes: 210,
    tag: 'Study',
  },
  {
    id: 't3',
    task_name: 'Họp giao ban ca trực',
    start_time: '12:00',
    end_time: '12:45',
    duration_minutes: 45,
    tag: 'Work',
  },
  {
    id: 't4',
    task_name: 'Đọc tài liệu phác đồ Cấp cứu',
    start_time: '13:00',
    end_time: '15:30',
    duration_minutes: 150,
    tag: 'Study',
  },
  {
    id: 't5',
    task_name: 'Nghỉ ngơi / Chợp mắt',
    start_time: '15:30',
    end_time: '16:00',
    duration_minutes: 30,
    tag: 'Health',
  },
  {
    id: 't6',
    task_name: 'Đóng quỹ lớp / Nộp lệ phí thi',
    start_time: '16:30',
    end_time: '16:45',
    duration_minutes: 15,
    tag: 'Finance',
  },
];

const DEFAULT_USER: UserState = {
  isLoggedIn: false,
  name: 'Guest',
  email: '',
  avatar: '',
};

const MOCK_USER: UserState = {
  isLoggedIn: true,
  name: 'Sinh Viên Y - Yến',
  email: 'yen.med@hospital.vn',
  avatar:
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face',
};

// 3. Store Definition
interface AppStore {
  user: UserState;
  tasks: Task[];
  login: () => void;
  logout: () => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: DEFAULT_USER,
  tasks: MOCK_TASKS,
  login: () => set({ user: MOCK_USER }),
  logout: () => set({ user: DEFAULT_USER }),
  addTask: (taskWithoutId) =>
    set((state) => ({
      tasks: [...state.tasks, { ...taskWithoutId, id: `t${Date.now()}` }],
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
}));
