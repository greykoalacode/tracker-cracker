import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { api } from "../../http/ApiService";
import Card from "../Card/Card";
import { api } from "../../http/ApiService";
import NoDashComponent from "../NoDashComponent/NoDashComponent";
import { getDateAccToCalendar } from "../../utils/utils";

function RoutinesHandler({ props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const user = useStoreState((state) => state.user);
  const {  setRoutines } = useStoreActions((actions) => ({ setRoutines: actions.setRoutines }));
  const [addingButton, setAddingButton] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const addRoutine = (data) => {
    setAddingButton(false);
    reset();
    // console.log(data);
    async function habitUpdate() {
      let result = await api.post("/routines", data);
      if (result.status === 200) {
        setRoutines(result.data);
      } else {
        setUpdateFailed(true);
        setAddingButton(true);
      }
    }
    habitUpdate();
  };
  // const deleteRoutine = (id) => {
  //   async function deleteCall() {
  //     let result = await api.delete(`/routines/${id}`);
  //     if (result.status === 200) {
  //       setUserState({ ...user, routines: [...result.data] });
  //       history.push("/dashboard");
  //     } else if (result.status === 401) {
  //       history.push("/login");
  //     }
  //   }

  //   deleteCall();
  // };
  return (
    <Card title="Routines" props={props}>
      <>
        {updateFailed && (
          <div className="p-3 my-3 bg-danger text-light font-weight-600">
            <span>Routine Update Failed</span>
          </div>
        )}
      </>
      {user.routines.length > 0 ? (
        <div className="my-2">
          {/* className="row row-cols-auto" */}
          {user.routines.map((each) => (
            <Link
              to={`/routines/${each._id}`}
              className="text-decoration-none cardLink w-100"
              key={each._id}
            >
                <div className="p-2 my-2 col shadow">
                    <h4 className="fw-bold m-0">{each.name}</h4>
                    <p className="my-1">{each.description}</p>
                    <p className="fs-6 m-0">{`Updated: ${getDateAccToCalendar(each.updatedAt)}`}</p>
                </div>
                {/* <div className="w-100">
                    
                    <button
                      onClick={() => deleteRoutine(each._id)}
                      className="btn ml-2 btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                </div> */}
            </Link>
          ))}
        </div>
      ) : (
        <NoDashComponent content="Routines" />
      )}
      <div>
        {!addingButton ? (
          <button
            className="btn regbtn"
            onClick={() => setAddingButton(!addingButton)}
          >
            Add Routine
          </button>
        ) : (
          <form onSubmit={handleSubmit(addRoutine)}>
            <div>
              <div className="mb-3">
                <label htmlFor="RoutineName" className="form-label">
                  Routine Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Routine Name is Required",
                    min: {
                      value: 3,
                      message: "Routine name should have atleast 3 letters",
                    },
                  })}
                  className="form-control"
                  id="RoutineName"
                  placeholder="Push / Pull / Leg Workout"
                />
                <p className="text-danger">{errors.name?.message}</p>
              </div>
              <div className="mb-3">
                <label htmlFor="RoutineDescription" className="form-label">
                  Routine Description
                </label>
                <textarea
                  {...register("description")}
                  className="form-control"
                  id="RoutineDescription"
                  rows="2"
                  defaultValue={""}
                  placeholder="Description of your Routine"
                />
                <p className="text-danger">{errors.description?.message}</p>
              </div>
              <button type="submit" className="btn btn-dark normalbtn">
                Add Routine
              </button>
            </div>
          </form>
        )}
      </div>

    </Card>
  );
}

export default RoutinesHandler;
