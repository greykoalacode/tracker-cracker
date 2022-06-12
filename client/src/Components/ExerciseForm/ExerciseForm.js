import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { api } from "../../http/ApiService";
// import ExerciseSelect from "../ExerciseSelect/ExerciseSelect";
import SetForm from "./SetForm";

function ExerciseForm({
  defaultWorkout = false,
  workout = {},
  workoutIndex = 0,
  isRoutine=false,
  isSchedule=false,
  scheduleDate=null,
  editExerciseId=null
}) {

  const {user, exercises}  = useStoreState((state) => ({user: state.user, exercises: state.exercises}));
  const { register, unregister, handleSubmit, reset } = useForm(user.routines);

  const history = useHistory();
  const params = useParams();
  const { id } = params;
  // const [exercise, setExercise] = useState(null);
  // if(isRoutine){
  //   const routine = user.routines.find((each) => each._id === id);

  //   if(routine){
  //     if(routine.workouts.length > 0){
  //       setExercise(routine.workouts[workoutIndex].exercise._id);
  //     }
  //   }
  // }
  // if(isSchedule){
  //   const schedule = user.schedules.find((each) => each._id === id);
  //   // console.log(schedule, workoutIndex)
  //   if(schedule){
  //     if(schedule.workouts.length > 0){
  //       setExercise(schedule.workouts[workoutIndex].exercise._id);
  //     }
  //   }
  // }
  
  const {setRoutines, setSchedules, setExercises} = useStoreActions((actions) => ({setRoutines: actions.setRoutines, setSchedules: actions.setSchedules, setExercises: actions.setExercises}));

  const update = (details) => {
    async function updateCall() {
      if(isRoutine){
        let result = await api.put(`/routines/${id}`, details);
        if (result.status === 200) {
          setRoutines(result.data);
        } else if (result.status === 401) {
          history.push("/login");
        }
      }
      else if(isSchedule){
        let result = await api.put(`/schedules/${id}`, details);
        if (result.status === 200) {
          setSchedules(result.data);
        } else if (result.status === 401) {
          history.push("/login");
        }
      }
      reset();
    }
    updateCall();
  };

  const defaultKeys = Object.keys(workout).length;

  const initialSets = [];
  if (defaultKeys > 0) {
    workout.sets.map((eachSet, i) => initialSets.push(SetForm));
  } else {
    initialSets.push(SetForm);
  }
  const [list, setList] = useState(initialSets);
  const addList = (e) => {
    e.preventDefault();
    setList([...list, SetForm]);
  };
  const removeList = (e) => {
    e.preventDefault();
    unregister(`workouts.${workoutIndex}.sets.${list.length - 1}`);
    setList((list) => list.slice(0, list.length - 1));
  };
  const defaultSet = {
    weight: 0,
    reps: 0,
  };

  useEffect(() => {
    if(exercises.length === 0){
      async function isUserLoggedin() {
        let result = await api.get("/user/info");
        if (result.status === 200) {
          let exercise = await api.get("/exercises");
          if(exercise.status === 200){
            setExercises(exercise.data);
          }
      }else{
        history.push("/login");
      }
    }
    isUserLoggedin();
  }
  })

  return (
    <div>
      <form onSubmit={handleSubmit(update)}>
        {
          defaultWorkout && (
            <input className="d-none" defaultValue={workout._id} {...register("workouts._id")} />
          )
        }
        {
          isSchedule && (
            <input className="d-none" defaultValue={scheduleDate} {...register("date")} />
          )
        }
        <div className="form-group">
          <label
            htmlFor={`workouts.exercise`}
            className="form-label"
          >
            Choose Exercise
          </label>
          <select
            defaultValue={defaultWorkout && (editExerciseId !== null) ? editExerciseId : exercises[0]._id}
            className="form-select"
            name="exercise"
            aria-label="select-exercise"
            {...register("workouts.exercise")}
          >
            {exercises.map((eachEx) => (
              <option key={eachEx._id} value={eachEx._id} disabled={eachEx._id === editExerciseId}>
                {eachEx.name}
              </option>
            ))}
          </select>
        </div>
        {list.map((EachList, i) => (
          <EachList
            defaultSet={
              defaultWorkout && defaultKeys > 0
                ? workout.sets.length > i
                  ? workout.sets[i]
                  : defaultSet
                : defaultSet
            }
            key={i}
            register={register}
            setIndex={i}
            workoutIndex={workoutIndex}
          />
        ))}
        <>
          {list.length > 0 ? (
            <div className="">
              <button className="btn normalbtn" onClick={addList}>
                Add Set
              </button>
              <button className="btn delbtn mx-3" onClick={removeList}>
                Remove Set
              </button>
            </div>
          ) : (
            <div>
              <button className="btn normalbtn" onClick={addList}>
                Add Set
              </button>
            </div>
          )}
        </>
        <div className="pt-4">
          <button className="btn regbtn" data-bs-dismiss="modal" type="submit">
            {`Update ${isRoutine ? "Routine" : "Schedule"}`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExerciseForm;
