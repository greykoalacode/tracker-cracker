import { useStoreActions, useStoreState } from "easy-peasy";
import moment from "moment";
import React from "react";
import { useHistory, useParams } from "react-router";
import { api, checkLogin } from "../../http/ApiService";
import {
  parseDate,
  progressClassname,
  progressCounter,
} from "../../utils/habitFunctions";
import Modal from "../Modal/Modal";
import { useEffect } from "react";

const HabitManager = () => {
  const params = useParams();
  const { id } = params;
  const history = useHistory();
  const user = useStoreState((state) => state.user);
  const setUserState = useStoreActions((actions) => actions.setUserState);
  const habit = user.habits.find((each) => each._id === id);
  const updateHabit = (habitDetails) => {
    console.log(habitDetails);
    async function updateCall() {
      let result = await api.put(`/habits/${id}`, habitDetails);
      if (result.status === 200) {
        setUserState({ ...user, habits: [user.habits, result.data] });
      } else if (result.status === 401) {
        history.push("/login");
      }
    }
    updateCall();
  };

  const deleteHabit = () => {
    async function deleteCall() {
      let result = await api.delete(`/habits/${id}`);
      if (result.status === 200) {
        setUserState({ ...user, habits: [...result.data] });
      } else if (result.status === 401) {
        history.push("/login");
      }
    }
    deleteCall();
    history.push("/dashboard");
  };

  useEffect(() => {
    async function checkStatus() {
      let result = await checkLogin();
      console.log('result ', result)
      if (result.status === 401) {
        history.push("/login");
      } else {
        setUserState(result.data);
      }
    }
    checkStatus();
  }, []);
  console.log(user);
  return (
    <div className="p-3 px-4 page">
      <div className="d-flex flex-row align-items-center">
        <div className="col">
          <h1 className="m-0">{habit.name}</h1>
          <p className="fs-4 font-italic">{habit.description}</p>
        </div>
        <button
          className="btn delbtn"
          data-bs-toggle="modal"
          data-bs-target={`#modal${id.slice(id.length - 5)}`}
        >
          Delete Habit
        </button>
        <Modal
          id={`modal${id.slice(id.length - 5)}`}
          title="Delete Habit"
          onClick={deleteHabit}
          content="Delete Habit"
          contentClass="btn-danger"
        >
          <p>
            Are you sure you want to delete the habit <b>{habit.name}</b>
          </p>
        </Modal>
      </div>
      <h3>{`Progress : ${(progressCounter(habit.progress) * 100).toFixed(
        1
      )} %`}</h3>
      <div className="p-2 py-3">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          {habit.progress.map((each) => (
            <div
              key={each._id}
              style={{ width: "150px", height: "150px" }}
              className={`col bg-${progressClassname(
                each
              )} m-1 align-self-start rounded p-3 position-relative`}
            >
              <input
                className="form-check-input m-0 position-absolute"
                style={{
                  opacity: 0,
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                onChange={(e) => {
                  e.preventDefault();
                  updateHabit({
                    date: each.date,
                    status: e.target.checked,
                  });
                }}
                type="checkbox"
                checked={each.status}
                disabled={moment(parseDate(each.date)).isAfter(
                  parseDate(new Date()),
                  "day"
                )}
                name={`progress_${moment(each.date).format("DD_MM_YYYY")}`}
                id={each._id}
              />
              <span className="badge rounded-pill habit-badge bg-dark">
                {moment(each.date).format("dddd")}
              </span>
              <p className="fw-bold m-0 my-2">
                {moment(each.date).format("Do MMM YYYY")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitManager;
