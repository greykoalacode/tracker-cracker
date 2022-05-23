import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { api } from "../../http/ApiService";
import ExerciseSelect from "../ExerciseSelect/ExerciseSelect";
import SetForm from "./SetForm";

function ExerciseForm({
  defaultWorkout = false,
  workout = {},
  workoutIndex = 0,
}) {
  const demoFormObj = {
    workouts: [
      {
        exercise: "",
        sets: [
          {
            weight: 0,
            reps: 0,
          },
        ],
      },
    ],
  };
  const {user, exercises}  = useStoreState((state) => ({user: state.user, exercises: state.exercises}));
  const { register, unregister, handleSubmit, reset } = useForm(user.routines);

  const history = useHistory();
  const params = useParams();
  const { id } = params;
  const routine = user.routines.find((each) => each._id === id);
  const setRoutines = useStoreActions((actions) => actions.setRoutines);

  const updateRoutine = (routineDetails) => {
    console.log("before update (data)", routineDetails);
    async function updateCall() {
      console.log("new obj routi", routineDetails);
      let result = await api.put(`/routines/${id}`, routineDetails);
      console.log(result);
      if (result.status === 200) {
        setRoutines(result.data);

      } else if (result.status === 401) {
        history.push("/login");
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



  return (
    <div>
      <form onSubmit={handleSubmit(updateRoutine)}>
        <input className="d-none" defaultValue={routine.name} {...register("name")} />
        {
          defaultWorkout && (
            <input className="d-none" defaultValue={workout._id} {...register("workouts._id")} />
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
            defaultValue={defaultWorkout && ("_id" in workout.exercise) ? workout.exercise._id : exercises[0]._id}
            className="form-select"
            name="exercise"
            aria-label="select-exercise"
            {...register("workouts.exercise")}
          >
            {exercises.map((eachEx) => (
              <option key={eachEx._id} value={eachEx._id}>
                {eachEx.name}
              </option>
            ))}
          </select>
          {/* {defaultWorkout === true ? (
            <ExerciseSelect
              selectedExercise={workout.exercise._id}
              registerRef={register(`workouts.${workoutIndex}.exercise`)}
            />
          ) : (
            <ExerciseSelect
              registerRef={register(`workouts.${workoutIndex}.exercise`)}
            />
          )} */}
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
        <div>
          {list.length > 0 ? (
            <div className="gap-2">
              <button className="btn normalbtn" onClick={addList}>
                Add Set
              </button>
              <button className="btn delbtn" onClick={removeList}>
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
        </div>
        <div>
          <button className="btn regbtn" data-bs-dismiss="modal" type="submit">
            Update Routine
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExerciseForm;
