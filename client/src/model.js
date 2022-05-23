import { action } from "easy-peasy";
import { persist } from "easy-peasy";
import data from "./data/index";

const model = persist({
  isLogged: false,
  user: {
    name: "",
    email: "",
    gender: "",
    age: 0,
    tasks: [],
    habits: [],
    routines: [],
    schedules: [],
  },
  exercises: [],
  resetUserState: action((state) => ({
    ...data.defaultUserState
  })),
  setUserState: action((state, dets) => {
    state.user = { ...state.user, ...dets };
  }),
  setHabits: action((state, habits) => {
    state.user.habits = [...habits];
  }),
  setTasks: action((state, tasks) => {
    state.user.tasks = tasks;
  }),
  setRoutines: action((state, routines) => {
    state.user.routines = [ ...routines];
  }),
  setSchedules: action((state, schedules) => {
    state.user.schedules = [...schedules];
  }),
  setExercises: action((state, exercises) => {
    state.exercises = exercises;
  }),
  setLoginState: action((state, loginBool) => {
    state.isLogged = loginBool;
  }),
});

export default model;
