import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../http/ApiService";
import { Link, useHistory, useParams } from "react-router-dom";
import NoDashComponent from "../NoDashComponent/NoDashComponent";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "#CCAFA5",
    backgroundColor: "#282c35",
    padding: 10,
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#282c35",
    border: 0,
  }),
  multiValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const backgroundColor = "#3e4149";
    const color = "#CCAFA5";
    return { ...provided, opacity, transition, backgroundColor, color };
  },
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: "#CCAFA5",
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "#282c35",
  }),
};

function ChooseRoutine() {
  const params = useParams();
  const { id } = params;
  const history = useHistory();
  const user = useStoreState((state) => state.user);
  const setSchedules = useStoreActions((actions) => actions.setSchedules);
  const { routines } = user;
  const { handleSubmit, control, reset } = useForm();
  const onSubmit = async (data) => {
    const result = await api.put(`/schedules/${id}`, {
      ...data,
      addRoutine: true,
    });
    if (result.status === 200) {
      if (result.status === 200) {
        setSchedules(result.data);
        reset();
      } else if (result.status === 401) {
        history.push("/login");
      }
    }
  };
  const routineOptions = routines.map((each) => ({
    label: each.name,
    value: each._id,
  }));
  return (
    <div>
        {
            routineOptions.length > 0 ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Choose Routine(s) here</h3>
                <Controller
                  name="routines"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Select
                      value={routineOptions.filter((option) =>
                        value?.includes(option.value)
                      )}
                      onChange={(options) =>
                        onChange(options?.map((option) => option.value))
                      }
                      onBlur={onBlur}
                      styles={customStyles}
                      placeholder="Choose Routines"
                      isMulti
                      isClearable
                      options={routineOptions}
                    />
                  )}
                />
                <button type="submit" data-bs-dismiss="modal"  className="btn regbtn mt-4">
                  Add
                </button>
              </form>
            ) : (
                <div className="text-center">
                    <NoDashComponent content="Routines" />  
                    <Link className="btn regbtn" to="/routines">Go to Routines</Link>
                </div>
            )
        }
    </div>
  );
}

export default ChooseRoutine;
