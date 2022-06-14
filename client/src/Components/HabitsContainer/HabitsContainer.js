import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { api } from '../../http/ApiService';
import { progressCounter, streakCounter } from '../../utils/habitFunctions';
import { getDateAccToCalendar } from '../../utils/utils';
import NoDashComponent from '../NoDashComponent/NoDashComponent';

function HabitsContainer() {
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
    <div className="container page">
        <h3>Habits</h3>
        <>
        {updateFailed && (
          <div className="p-3 my-3 bg-danger text-light font-weight-600">
            <span>Habit Update Failed</span>
          </div>
        )}
      </>
        <div className="row">
        {user.habits.length > 0 ? (
        <div className="my-2">
          {user.habits.map((each) => (
            <Link
              to={`/habits/${each._id}`}
              className="text-decoration-none cardLink w-100"
              key={each._id}
            >
            <div
              className="p-2 my-2 col rounded border-0 shadow"
            >
              <div className="row row-cols-auto justify-content-between">
                <div className="col">
                  <div className="row row-cols-1 justify-content-between">
                    <h4 className="fw-bold m-0">{each.name}</h4>
                    <p className="my-1">{each.description}</p>
                    <p className="fs-6 m-0">{`Updated: ${getDateAccToCalendar(each.updatedAt)}`}</p>
                  </div>
                </div>
                <div className="col">
                  <div className="my-2">
                    <p className="m-0">
                      Streak:{" "}
                      <strong>
                        {streakCounter(each.progress).toFixed(0)}*
                      </strong>
                    </p>
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
            </Link>
          ))}
        </div>
      ) : (
        <NoDashComponent content="Habits" />
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
                <p className="text-danger">{errors.description?.message}</p>
              </div>
              <button type="submit" className="btn btn-dark normalbtn">
                Add Habit
              </button>
            </div>
          </form>
        )}
      </div>
        </div>
    </div>
  )
}

export default HabitsContainer