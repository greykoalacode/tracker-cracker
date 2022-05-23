import { useStoreActions, useStoreState } from "easy-peasy";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import NoTasksSVG from "../../Assets/NoTasksSVG";
import { api } from "../../http/ApiService";
import { progressCounter } from "../../utils/habitFunctions";
import Card from "../Card/Card";
// import './styles.scss';

const streakCounter = (habits) => {
  var streak = 0;
  // var progress = 0;
  if (habits.length > 0) {
    for (let i = 0; i < habits.length; i++) {
      if (habits[i].status === false) {
        break;
      }
      streak += 1;
    }
  }
  return streak;
};

const HabitsHandler = ({ props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setHabits, setUserState } = useStoreActions((actions) => ({
    setHabits: actions.setHabits,
    setUserState: actions.setUserState,
  }));
  const user = useStoreState((state) => state.user);
  // const setUserState = useStoreActions(actions => actions.setUserState);
  const [addingButton, setAddingButton] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const addHabit = (data) => {
    setAddingButton(false);
    reset();
    // console.log(data);
    async function habitUpdate() {
      let result = await api.post("/habits", data);
      if (result.status === 200) {
        setHabits(result.data);
      } else {
        setUpdateFailed(true);
        setAddingButton(true);
      }
    }
    habitUpdate();
  };

  const deleteHabit = (id) => {
    async function asynchronousDelete() {
      let result = await api.delete(`/habits/${id}`);
      if (result.status === 200) {
        setHabits(result.data);
      } else {
        setUpdateFailed(true);
        setAddingButton(false);
      }
    }
    asynchronousDelete();
  };
  return (
    <Card title="Habits" props={props}>
      <>
        {updateFailed && (
          <div className="p-3 my-3 bg-danger text-light font-weight-600">
            <span>Habit Update Failed</span>
          </div>
        )}
      </>
      {user.habits.length > 0 ? (
        <div className="row row-cols-1 px-3">
          {user.habits.map((each) => (
            <div
              key={each._id}
              className="p-2 my-2 col rounded border-0 shadow"
            >
              {/* '#2A2B2A' */}
              <div className="row row-cols-auto justify-content-between">
                <div className="col">
                  <div className="row row-cols-1 justify-content-between">
                    <h4 className="fw-bold m-0">{each.name}</h4>
                    <p className="my-1">{each.description}</p>
                    <p className="fs-6 m-0">{`Updated: ${moment(
                      each.updatedAt
                    ).format("hh:mmA, DD-MM-YYYY")}`}</p>
                  </div>
                </div>
                <div className="col">
                  <div className="my-2 row row-cols-auto justify-content-evenly align-items-center">
                    <p className="m-0">
                      Streak:{" "}
                      <strong>
                        {streakCounter(each.progress).toFixed(0)}*
                      </strong>
                    </p>
                    <Link
                      to={`/habits/${each._id}`}
                      className="btn btn-sm mr-1 regbtn"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => deleteHabit(each._id)}
                      className="btn ml-1 btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="fs-6 m-0 my-1">
                    <strong>{`Total Progress: ${(
                      progressCounter(each.progress) * 100
                    ).toFixed(1)}%`}</strong>
                  </p>
                  <div
                    className="progress"
                    style={{ height: "8px", backgroundColor: "#36454f" }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow={progressCounter(each.progress) * 100}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        width: `${progressCounter(each.progress) * 100}%`,
                        backgroundColor: "#CCAFA5",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex p-3 flex-column align-items-center">
          <NoTasksSVG height="30vh" />
          <h2 className="fw-light mt-3">No Habits yet</h2>
        </div>
      )}
      <div>
        {!addingButton ? (
          <button
            className="btn regbtn"
            onClick={() => setAddingButton(!addingButton)}
          >
            Add Habit
          </button>
        ) : (
          <form onSubmit={handleSubmit(addHabit)}>
            <div>
              <div className="mb-3">
                <label htmlFor="habitName" className="form-label">
                  Habit Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Habit Name is Required",
                    min: {
                      value: 3,
                      message: "Habit name should have atleast 3 letters",
                    },
                  })}
                  className="form-control"
                  id="habitName"
                  placeholder="Eat Healthy, Walk 10,000 steps, etc."
                />
                <p className="text-danger">{errors.name?.message}</p>
              </div>
              <div className="mb-3">
                <label htmlFor="habitDescription" className="form-label">
                  Habit Description
                </label>
                <textarea
                  defaultValue={""}
                  {...register("description")}
                  className="form-control"
                  id="habitDescription"
                  rows="2"
                  placeholder="Description of your habit, for your motivation / reference"
                />
                {/* <p className="text-danger">{errors.description?.message}</p> */}
              </div>
              <button type="submit" className="btn btn-dark">
                Add Habit
              </button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
};

export default HabitsHandler;
