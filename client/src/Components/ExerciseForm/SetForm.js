import React from "react";

function SetForm({ workoutIndex, setIndex, defaultSet, register }) {
  return (
    <div className="form-group my-4">
      <p className="m-0 h5">{`Set ${setIndex + 1}`}</p>
      <div className="form-group">
        <label htmlFor={`workouts.sets.${setIndex}.weight`}>Weight</label>
        <input
          type="number"
          className="form-control"
          defaultValue={defaultSet.weight}
          min="0"
          name={`workouts.sets.${setIndex}.weight`}
          {...register(`workouts.sets.${setIndex}.weight`, {
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="form-group">
        <label htmlFor={`workouts.sets.${setIndex}.reps`}>Repetitions</label>
        <input
          type="number"
          className="form-control"
          min="0"
          defaultValue={defaultSet.reps}
          name={`workouts.sets.${setIndex}.reps`}
          {...register(`workouts.sets.${setIndex}.reps`, {
            valueAsNumber: true,
          })}
        />
      </div>
    </div>
  );
}

export default SetForm;
