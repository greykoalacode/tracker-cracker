import { useStoreActions, useStoreState } from "easy-peasy";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { api } from "../../http/ApiService";
import { progressCounter, streakCounter } from "../../utils/habitFunctions";
import { getDateAccToCalendar } from "../../utils/utils";
import Card from "../Card/Card";
import NoDashComponent from "../NoDashComponent/NoDashComponent";
// import './styles.scss';

const HabitsHandler = ({ props }) => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();
  // const { setHabits, setUserState } = useStoreActions((actions) => ({
  //   setHabits: actions.setHabits,
  //   setUserState: actions.setUserState,
  // }));
  const user = useStoreState((state) => state.user);
  // const setUserState = useStoreActions(actions => actions.setUserState);
  // const [addingButton, setAddingButton] = useState(false);
  // const [updateFailed, setUpdateFailed] = useState(false);
  // const addHabit = (data) => {
  //   setAddingButton(false);
  //   reset();
  //   // console.log(data);
  //   async function habitUpdate() {
  //     let result = await api.post("/habits", data);
  //     if (result.status === 200) {
  //       setHabits(result.data);
  //     } else {
  //       setUpdateFailed(true);
  //       setAddingButton(true);
  //     }
  //   }
  //   habitUpdate();
  // };

  // const deleteHabit = (id) => {
  //   async function asynchronousDelete() {
  //     let result = await api.delete(`/habits/${id}`);
  //     if (result.status === 200) {
  //       setHabits(result.data);
  //     } else {
  //       setUpdateFailed(true);
  //       setAddingButton(false);
  //     }
  //   }
  //   asynchronousDelete();
  // };
  return (
    <Card title="Habits" props={props}>
      {/* <>
        {updateFailed && (
          <div className="p-3 my-3 bg-danger text-light font-weight-600">
            <span>Habit Update Failed</span>
          </div>
        )}
      </> */}
      <div>
        {user.habits.length > 0 ? (
          <div className="my-2">
            {user.habits.map((each) => (
              <Link
                to={`/habits/${each._id}`}
                className="text-decoration-none cardLink w-100"
                key={each._id}
              >
                <div className="eachCard shadow">
                  <h4 className="fw-bold m-0">{each.name}</h4>
                  <p className="my-1">{each.description}</p>
                  <div className="my-2">
                    <p className="m-0">
                      Streak:{" "}
                      <strong>
                        {streakCounter(each.progress).toFixed(0)}*
                      </strong>
                    </p>
                  </div>
                  <div className="">
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
                
              </Link>
            ))}
          </div>
        ) : (
          <NoDashComponent content="Habits" />
        )}
      </div>
      <Link to="/habits" className="btn regbtn align-self-start">
        View Habits
      </Link>
    </Card>
  );
};

export default HabitsHandler;
