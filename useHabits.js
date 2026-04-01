import { useContext, useMemo } from 'react';
import { HabitContext, ActionTypes } from '../context/HabitContext';

export const useHabits = () => {
  const { state, dispatch } = useContext(HabitContext);

  const toggleHabit = (id) => {
    dispatch({ type: ActionTypes.TOGGLE_HABIT, payload: { id } });
  };

  const resetDaily = () => {
    dispatch({ type: ActionTypes.RESET_DAILY });
  };

  const addHabit = (name, icon, category) => {
    dispatch({ type: ActionTypes.ADD_HABIT, payload: { name, icon, category } });
  };

  const removeHabit = (id) => {
    dispatch({ type: ActionTypes.REMOVE_HABIT, payload: { id } });
  };

  const stats = useMemo(() => {
    const total = state.habits.length;
    const completed = state.habits.filter(h => h.completed).length;
    const percentage = total === 0 ? 0 : (completed / total) * 100;
    
    const ibadah = state.habits.filter(h => h.category === 'ibadah');
    const sosial = state.habits.filter(h => h.category === 'sosial');
    const completedIbadah = ibadah.filter(h => h.completed).length;
    const completedSosial = sosial.filter(h => h.completed).length;
    const ibadahPercentage = ibadah.length === 0 ? 0 : (completedIbadah / ibadah.length) * 100;
    const sosialPercentage = sosial.length === 0 ? 0 : (completedSosial / sosial.length) * 100;
    
    let message = '🌱 Ayo mulai hari ini dengan semangat!';
    if (percentage === 100) message = '🎉 Luar biasa! Hari ini sempurna! 🎉';
    else if (percentage >= 75) message = '🌟 Hebat! Hampir sempurna! 🌟';
    else if (percentage >= 50) message = '💪 Bagus! Terus semangat! 💪';
    else if (percentage >= 25) message = '✨ Mulai dengan baik! ✨';
    
    return {
      total,
      completed,
      percentage: Math.round(percentage),
      ibadahPercentage: Math.round(ibadahPercentage),
      sosialPercentage: Math.round(sosialPercentage),
      totalIbadah: ibadah.length,
      totalSosial: sosial.length,
      completedIbadah,
      completedSosial,
      message,
    };
  }, [state.habits]);

  return {
    habits: state.habits,
    stats,
    toggleHabit,
    resetDaily,
    addHabit,
    removeHabit,
  };
};