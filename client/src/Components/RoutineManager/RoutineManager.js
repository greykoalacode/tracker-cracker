import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { api, checkLogin } from "../../http/ApiService";
import Modal from "../Modal/Modal";
import "./styles.scss";
import ExerciseCard from "./ExerciseCard";
// import AddExerciseForm from "./AddExerciseForm";
import { useForm } from "react-hook-form";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import NoExerciseSVG from "../../Assets/NoExerciseSVG";

function RoutineManager() {
  const params = useParams();
  const { id } = params;
  const history = useHistory();
  const user = useStoreState((state) => state.user);
  const setUserState = useStoreActions((actions) => actions.setUserState);
  const routine = user.routines.find((each) => each._id === id); 
  // { }

  // useEffect(() => {
  //   reset();
  // },[])
  // const updateRoutine = (routineDetails) => {
    
    // console.log('before update (data)',routineDetails);
  //   async function updateCall() {
  //     let newRoutineObj = {
  //       name: routine.name,
  //       workouts: [...routineDetails.workouts],
  //     };
      // console.log('new obj routi', newRoutineObj);
  //     let result = await api.put(`/routines/${id}`, newRoutineObj);
      // console.log(result);
  //     if (result.status === 200) {
  //       setRoutines(result.data);
        
  //     } else if (result.status === 401) {
  //       history.push("/login");
  //     }
  //     reset(demoFormObj);
  //   }
  //   updateCall();
  // };



  const deleteRoutine = () => {
    async function deleteCall() {
      let result = await api.delete(`/routines/${id}`);
      if (result.status === 200) {
        setUserState({ ...user, routines: [...result.data] });
        history.push("/dashboard");
      } else if (result.status === 401) {
        history.push("/login");
      }
      // history.push("/dashboard");
    }

    deleteCall();
  };
  // console.log(routine);
  useEffect(() => {
    async function checkStatus() {
      let result = await checkLogin();
      if (result.status === 401) {
        history.push("/login");
      }
    }
    checkStatus();
  }, [history]);
  // console.log('routine', routine);
  return (
    <div className="p-3 px-4 page">
      <div>
        <div className="d-flex justify-content-between">
          <h1>{routine.name}</h1>
          <div>
            <button
              data-bs-toggle="modal"
              data-bs-target={`#modal-add-${id.slice(id.length - 5)}`}
              className="btn regbtn"
            >
              Add Exercise
            </button>
            <Modal
              id={`modal-add-${id.slice(id.length - 5)}`}
              title="Add Exercise to Routine"
              // onClick={deleteRoutine}
              content="Add Exercise"
              contentClass="regbtn"
            >
              {

              // console.log(routine.workouts.length)
              }
              <ExerciseForm
                workoutIndex={routine.workouts.length}
              />
            </Modal>
            <button
              data-bs-toggle="modal"
              data-bs-target={`#modal${id.slice(id.length - 5)}`}
              className="btn delbtn"
            >
              Delete Routine
            </button>
            <Modal
              id={`modal${id.slice(id.length - 5)}`}
              title="Delete Routine"
              onClick={deleteRoutine}
              content="Delete Routine"
              contentClass="btn-danger"
            >
              <p>Are you sure you want to delete the Routine</p>
            </Modal>
          </div>
        </div>
        <h3>Exercises</h3>
        <div className="container">
          <div className="row gap-5">
            {routine.workouts.length > 0 ? (
              routine.workouts.map((eachExercise, i) => (
                <ExerciseCard
                  id={id}
                  index={i}
                  workout={eachExercise}
                  key={eachExercise._id}
                  // deleteExercise={() => deleteExercise(eachExercise._id)}
                />
              ))
            ) : (
              <div className="text-center">
                <p className="fs-3 my-2 banner-sad">No Exercises Yet 😔</p>
                <div className="mx-auto" style={{width: "30vw"}}>
                  <NoExerciseSVG />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <WorkoutCard workout={routine.workout} /> */}
      </div>
    </div>
  );
}

export default RoutineManager;
