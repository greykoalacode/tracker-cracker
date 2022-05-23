import React from 'react'
import ExerciseSelect from '../ExerciseSelect/ExerciseSelect';

function ModifyExercise({
    workout,
    handleSubmit,
    register,
    onSubmit,
    index,
  }) {
    const {exercise, sets} = workout;
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor={`routine.${index}.exercise`} className="form-label">
              Exercise
            </label>
            <ExerciseSelect
              selectedExercise={exercise._id}
              registerRef={register(`routine.${index}.exercise`)}
            />
          </div>
          {sets.map((eachSet, i) => (
            <div key={eachSet._id} className="form-group">
              <p>{`Set ${i + 1}`}</p>
              <div className="form-group">
                <label htmlFor={`routine.${index}.sets.${i}.weight`}>Weight</label>
                <input
                  type="number"
                  className="form-control"
                  defaultValue={eachSet.weight}
                  min="0"
                  name={`routine.${index}.sets.${i}.weight`}
                  {...register(`routine.${index}.sets.${i}.weight`, {
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`routine.sets.${i}.reps`}>Repetitions</label>
                <input
                  type="number"
                  className="form-control"
                  min="0"
                  defaultValue={eachSet.reps}
                  name={`routine.${index}.sets.${i}.reps`}
                  {...register(`routine.${index}.sets.${i}.reps`, {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>
          ))}
          <div>
            <button className="btn regbtn" data-bs-dismiss="modal" type="submit">
              Update Routine
            </button>
          </div>
        </form>
      </div>
    );
  }

export default ModifyExercise