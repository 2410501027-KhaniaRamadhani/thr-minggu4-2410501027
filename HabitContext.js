import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultHabits = [
  { id: '1', name: 'Sholat Subuh', icon: '🌅', completed: false, category: 'ibadah' },
  { id: '2', name: 'Sholat Dzuhur', icon: '☀️', completed: false, category: 'ibadah' },
  { id: '3', name: 'Sholat Ashar', icon: '🌤️', completed: false, category: 'ibadah' },
  { id: '4', name: 'Sholat Maghrib', icon: '🌙', completed: false, category: 'ibadah' },
  { id: '5', name: 'Sholat Isya', icon: '⭐', completed: false, category: 'ibadah' },
  { id: '6', name: 'Tilawah Al-Quran', icon: '📖', completed: false, category: 'ibadah' },
  { id: '7', name: 'Sedekah', icon: '💝', completed: false, category: 'sosial' },
  { id: '8', name: 'Silaturahmi', icon: '🤝', completed: false, category: 'sosial' },
  { id: '9', name: 'Puasa Syawal', icon: '🌙', completed: false, category: 'ibadah' },
  { id: '10', name: 'Sholat Dhuha', icon: '☀️', completed: false, category: 'ibadah' },
];

const initialState = {
  habits: defaultHabits,
};

export const ActionTypes = {
  TOGGLE_HABIT: 'TOGGLE_HABIT',
  RESET_DAILY: 'RESET_DAILY',
  ADD_HABIT: 'ADD_HABIT',
  REMOVE_HABIT: 'REMOVE_HABIT',
  LOAD_DATA: 'LOAD_DATA',
};

const habitReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_HABIT:
      return {
        ...state,
        habits: state.habits.map(habit =>
          habit.id === action.payload.id
            ? { ...habit, completed: !habit.completed }
            : habit
        ),
      };
    case ActionTypes.RESET_DAILY:
      return {
        ...state,
        habits: state.habits.map(habit => ({ ...habit, completed: false })),
      };
    case ActionTypes.ADD_HABIT:
      return {
        ...state,
        habits: [...state.habits, {
          id: Date.now().toString(),
          name: action.payload.name,
          icon: action.payload.icon || '✅',
          completed: false,
          category: action.payload.category || 'ibadah',
        }],
      };
    case ActionTypes.REMOVE_HABIT:
      return {
        ...state,
        habits: state.habits.filter(habit => habit.id !== action.payload.id),
      };
    case ActionTypes.LOAD_DATA:
      return {
        ...state,
        habits: action.payload.habits || state.habits,
      };
    default:
      return state;
  }
};

export const HabitContext = createContext();

// Fungsi untuk menyimpan data
const saveData = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('@halal_tracker', jsonValue);
    console.log('Data saved successfully');
  } catch (error) {
    console.log('Save error:', error);
  }
};

// Fungsi untuk mengambil data
const loadData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@halal_tracker');
    if (jsonValue != null) {
      console.log('Data loaded successfully');
      return JSON.parse(jsonValue);
    }
    return null;
  } catch (error) {
    console.log('Load error:', error);
    return null;
  }
};

export const HabitProvider = ({ children }) => {
  const [state, dispatch] = useReducer(habitReducer, initialState);

  useEffect(() => {
    // Load data saat pertama kali buka
    const loadInitialData = async () => {
      const data = await loadData();
      if (data) {
        dispatch({ type: ActionTypes.LOAD_DATA, payload: data });
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    // Simpan data setiap kali state berubah
    saveData(state);
  }, [state]);

  return (
    <HabitContext.Provider value={{ state, dispatch }}>
      {children}
    </HabitContext.Provider>
  );
};