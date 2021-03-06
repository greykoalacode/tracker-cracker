import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { api } from "../../http/ApiService";
import Card from "../Card/Card";
import "react-datepicker/dist/react-datepicker.css";
import NoDashComponent from "../NoDashComponent/NoDashComponent";
import { getDateAccToCalendar } from "../../utils/utils";

function SchedulesHandler({ props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const user = useStoreState((state) => state.user);
  const { setSchedules } = useStoreActions((actions) => ({
    setSchedules: actions.setSchedules,
  }));
  const [addingButton, setAddingButton] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const addSchedule = (data) => {
    setAddingButton(false);
    reset();
    // console.log(data);
    async function scheduleUpdate() {
      let result = await api.post("/schedules", data);
      if (result.status === 200) {
        setSchedules(result.data);
      } else {
        setUpdateFailed(true);
        setAddingButton(true);
      }
    }
    scheduleUpdate();
  };
  // const deleteSchedule = (id) => {
  //   async function deleteCall() {
  //     let result = await api.delete(`/schedules/${id}`);
  //     if (result.status === 200) {
  //       setUserState({ ...user, schedules: [...result.data] });
  //     } else if (result.status === 401) {
  //       history.push("/login");
  //     }
  //   }

  //   deleteCall();
  // };
  return (
    <Card title={"Schedules"} props={props}>
      <>
        {updateFailed && (
          <div className="p-3 my-3 bg-danger text-light font-weight-600">
            <span>Routine Update Failed</span>
          </div>
        )}
      </>
      {user.schedules.length > 0 ? (
        <div className="my-2">
          {user.schedules.map((each) => (
            <Link
              to={`/schedules/${each._id}`}
              className="text-decoration-none cardLink"
              key={each._id}
            >
            <div
              className="p-2 my-2 col shadow border border-dark"
            >
                  <div className="">
                    {/* row row-cols-1 justify-content-between */}
                    <h4 className="fw-bold m-0">
                      {getDateAccToCalendar(each.date)}
                    </h4>
                    <p className="my-1 fst-italic">{each.description}</p>
                    <span className="m-0">{`Updated: ${getDateAccToCalendar(each.updatedAt)}`}</span>
                  </div>
                {/* <button
                  onClick={() => deleteSchedule(each._id)}
                  className="btn mx-2 btn-sm btn-outline-danger"
                >
                  Delete
                </button> */}
              {/* color: '#C6DDF0', */}
            </div>
          </Link>
          ))}
        </div>
      ) : (
        <NoDashComponent content="Schedules" />
      )}
      <div>
        {!addingButton ? (
          <button
            className="btn regbtn"
            onClick={() => setAddingButton(!addingButton)}
          >
            Add Schedule
          </button>
        ) : (
          <form onSubmit={handleSubmit(addSchedule)}>
            <div>
              <div className="mb-3">
                <label htmlFor="ScheduleName" className="form-label">
                  Schedule Date
                </label>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      className="date-picker"
                      onChange={e => field.onChange(e)}
                      required
                      placeholderText="Pick a Date"
                    />
                  )}
                />
                {/* <input
                  type="text"
                  {...register("name", {
                    required: "Schedule Name is Required",
                    min: {
                      value: 3,
                      message: "Schedule name should have atleast 3 letters",
                    },
                  })}
                  className="form-control"
                  id="ScheduleName"
                  placeholder="Eat Healthy, Walk 10,000 steps, etc."
                /> */}
                <p className="text-danger">{errors.name?.message}</p>
              </div>
              <div className="mb-3">
                <label htmlFor="ScheduleDescription" className="form-label">
                  Schedule Description
                </label>
                <textarea
                  {...register("description")}
                  className="form-control"
                  id="ScheduleDescription"
                  rows="2"
                  defaultValue={""}
                  placeholder="Description of your Schedule, for your motivation / reference"
                />
                <p className="text-danger">{errors.description?.message}</p>
              </div>
              <button type="submit" className="btn btn-dark normalbtn">
                Add Schedule
              </button>
            </div>
          </form>
        )}
      </div>

      
    </Card>
  );
}

export default SchedulesHandler;
