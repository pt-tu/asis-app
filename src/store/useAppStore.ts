import { create } from 'zustand';
import { Task, UserState, FinanceState } from '../types';
import { TAG_COLORS } from '../constants/theme';

// 2. Initial Mock Data reflecting Medical Student Schedule
const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    task_name: 'Trực gác bệnh viện (On-call 24h)',
    start_time: '08:00',
    end_time: '08:00', // Indicates next day
    duration_minutes: 1440,
    tag: 'Work',
    isLocked: true,
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

const DEFAULT_FINANCE: FinanceState = {
  fixedIncome: 14000000,
  foodBudget: 4000000,
  studyBudget: 2000000,
  healthBudget: 1500000,
  isOverdraftWarning: false,
};

// 3. Store Definition
interface AppStore {
  user: UserState;
  tasks: Task[];
  finance: FinanceState;
  login: () => void;
  logout: () => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  syncMealCostToBudget: (cost: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: DEFAULT_USER,
  tasks: MOCK_TASKS,
  finance: DEFAULT_FINANCE,
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
  syncMealCostToBudget: (cost) =>
    set((state) => {
      const newFoodBudget = state.finance.foodBudget - cost;
      return {
        finance: {
          ...state.finance,
          foodBudget: newFoodBudget,
          isOverdraftWarning: newFoodBudget < 0,
        },
      };
    }),
}));
