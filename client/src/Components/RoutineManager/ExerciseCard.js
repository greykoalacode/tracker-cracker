import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { api } from '../../http/ApiService';
import ExerciseForm from '../ExerciseForm/ExerciseForm';
import Modal from '../Modal/Modal';
import ModifyExercise from './ModifyExercise';

function ExerciseCard({ workout, updateRoutine, index, handleSubmit, register, unregister}) {
  const history = useHistory();
  const params = useParams();
  const {id} = params;
  const user = useStoreState(state => state.user);
  const routine = user.routines.find(each => each._id === id);
  const setRoutines = useStoreActions(actions =>  actions.setRoutines);

  const deleteExercise = () => {
    async function filterAndUpdate() {
      // console.log("delete req");

      let filteredWorkouts = routine.workouts.filter(
        (eachWork) => eachWork._id !== workout._id
      );
      let newRoutineObj = {
        ...routine,
        filter: true,
        workouts: filteredWorkouts,
      };
      // console.log(newRoutineObj)
      let result = await api.put(`/routines/${id}`, newRoutineObj);
      if (result.status === 200) {
        setRoutines(result.data);
      } else if (result.status === 401) {
        history.push("/login");
      }
    }
    filterAndUpdate();
  };
    const { exercise, sets, _id } = workout;
    return (
      <div className="col p-0 routine-card border rounded-2 shadow">
        <div className="">
          <img
            className="routine-gif"
            src={exercise.gifUrl}
            alt={exercise.name}
          />
        </div>
        <div className="routine-card-body">
          <h3 className="m-0">{exercise.name}</h3>
          <div className="routine-badge-grid">
            <span className="routine-badge">{exercise.bodyPart}</span>
            <span className="routine-badge">{exercise.target}</span>
            <span className="routine-badge">{exercise.equipment}</span>
          </div>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Set</th>
                <th scope="col">Weight (kg)</th>
                <th scope="col">Reps</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((eachSet, i) => (
                <tr className="" key={eachSet._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{eachSet.weight}</td>
                  <td>{eachSet.reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex flex-column">
            <button
              className="btn regbtn mb-2"
              data-bs-toggle="modal"
              data-bs-target={`#modal-Edit-${_id.slice(_id.length - 5)}`}
            >
              Update
            </button>
            <Modal
              id={`modal-Edit-${_id.slice(_id.length - 5)}`}
              title="Update Routine"
              content="Update Routine"
              contentClass="normalbtn"
              isForm
            >
              {/* Form for changing Exercise & Sets details */}
              {/* <ModifyExercise
                index={index}
                workout={workout}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={updateRoutine}
              /> */}
              <ExerciseForm
                defaultWorkout={true}
                workout={workout}
                workoutIndex={index}
               />
            </Modal>
            <button className="btn delbtn" onClick={deleteExercise}>Delete</button>
          </div>
        </div>
      </div>
    );
  }

export default ExerciseCard