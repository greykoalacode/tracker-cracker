import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useForm } from "react-hook-form";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
// import { api } from "../../http/ApiService";
import Card from "../Card/Card";
import { api } from "../../http/ApiService";
import NoDashComponent from "../NoDashComponent/NoDashComponent";

function RoutinesHandler({ props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const user = useStoreState((state) => state.user);
  const { setUserState, setRoutines } = useStoreActions((actions) => ({ setUserState: actions.setUserState, setRoutines: actions.setRoutines }));
  const history = useHistory();
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
  const deleteRoutine = (id) => {
    async function deleteCall() {
      let result = await api.delete(`/routines/${id}`);
      if (result.status === 200) {
        setUserState({ ...user, routines: [...result.data] });
        history.push("/dashboard");
      } else if (result.status === 401) {
        history.push("/login");
      }
    }

    deleteCall();
  };
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
        <div className="row row-cols-auto">
          {user.routines.map((each) => (
            <div
              key={each._id}
              className="col shadow border-none"
            >
              <div className="">
                <div className="w-100 row row-cols-1 justify-content-between">
                    <h4 className="fw-bold m-0">{each.name}</h4>
                    <p className="my-1">{each.description}</p>
                    <p className="fs-6 m-0">{`Updated: ${moment(
                      each.updatedAt
                    ).format("hh:mmA, DD-MM-YYYY")}`}</p>
                </div>
                <div className="w-100">
                    <Link
                      to={`/routines/${each._id}`}
                      className="btn mr-2 btn-sm regbtn"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => deleteRoutine(each._id)}
                      className="btn ml-2 btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                </div>
              </div>
              {/* color: '#C6DDF0', */}
            </div>
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
                  placeholder="Eat Healthy, Walk 10,000 steps, etc."
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
                  placeholder="Description of your Routine, for your motivation / reference"
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
