import { useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import { api } from "../../http/ApiService";
import { useHistory } from "react-router";

function ExerciseSelect({ selectedExercise , registerRef}) {
  const exercises = useStoreState((state) => state.exercises);
  //   const { setLoginState, setExercises } = useStoreActions((actions) => ({
  //     setLoginState: actions.setLoginState,
  //     setUserState: actions.setUserState,
  //   }));
  //   const history = useHistory();
  //   useEffect(() => {
  //     async function getExercises() {
  //       let resultObj = await api.get("/exercises");
  //       if (resultObj.status !== 200) {
  //         setLoginState(false);
  //         history.push("/login");
  //       } else {
  //         setExercises(resultObj.data);
  //       }
  //     }
  //     getExercises();
  //   }, []);
  return (
    <select defaultValue={selectedExercise || exercises[0]._id} className="form-select" name="exercise" aria-label="select-exercise" {...registerRef}>
      {exercises.map((eachEx) => (
        <option
          key={eachEx._id}
          value={eachEx._id}
        >
          {eachEx.name}
        </option>
      ))}
    </select>
  );
}

export default ExerciseSelect;
