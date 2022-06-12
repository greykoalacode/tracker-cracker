import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import NoTasksSVG from "../../Assets/NoTasksSVG";
import { api } from "../../http/ApiService";
import Card from "../Card/Card";



const TasksHandler = ({props}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm();
  const history = useHistory();
  const user = useStoreState((state) => state.user);
  const setUserState = useStoreActions((actions) => actions.setUserState);
  const updateTask = (task) => {
    async function getResult() {
      let result = await api.put(`/tasks/${task._id}`, {
        name: task.name,
        completed: task.completed,
      });
      // axios.put(`http://localhost:3001/api/tasks/${task._id}`, {name: task.name, completed: task.completed}, {withCredentials: true, headers: {
      //     "Content-Type": "application/json"
      // }});
      // console.log(result);
      if (result.status === 200) {
        if (result.data.length > 0) {
          setUserState({ ...user, tasks: [...result.data] });
        }
      } else if (result.status === 401) {
        history.push("/login");
      }
    }
    getResult();
  };
//   useEffect(() => {
//     setTasks(user.tasks);
//   },[user.tasks])
  const deleteTask = (taskID) => {
    async function update() {
      let result = await api.delete(`/tasks/${taskID}`);

      // axios.delete(`http://localhost:3001/api/tasks/${taskID}`, {withCredentials: true, headers: {
      //     "Content-Type": "application/json"
      // }});

      if (result.status === 200) {
        if (result.data.length >= 0) {
          setUserState({ tasks: [...result.data] });
        }
      } else if (result.status === 401) {
        setTimeout(() => {
            history.push("/login");
        },500)
      }
    }
    update();
  };
  const addTask = (task) => {
    async function appendTask() {
      let result = await api.post("/tasks", task);
      if (result.status === 200) {
        setUserState({ ...user, tasks: [...result.data] });
      } else if (result.status === 401) {
        history.push("/login");
      }
    }
    appendTask();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ task: "" });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <Card title="Tasks" props={props}>
      <form onSubmit={handleSubmit(addTask)}>
        <div className="input-group input-group-sm mb-2">
          <input
            type="text"
            {...register("task", { required: "Task Name is Required",minLength: {value: 3, message: "Task should be atleast of 3 letters"}})}
            className="form-control"
            placeholder="Task #1 is..."
            aria-describedby="addTask"
          />
          <div className="input-group-append">
            <button className="btn btn-sm btn-outline-dark regbtn" type="submit">
              Add
            </button>
          </div>
        </div>
        <p className="text-danger">{errors.task?.message}</p>
      </form>
      {user.tasks.length > 0 ? (
        user.tasks.map((each) => (
          <div className="form-check mb-2 mr-sm-2" key={each._id}>
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value={each.task}
              checked={each.completed}
              onChange={(e) => {
                updateTask({
                  _id: each._id,
                  name: each.name,
                  completed: e.target.checked,
                });
              }}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              {each.completed ? <del>{each.task}</del> : each.task}
            </label>
            <button
              type="button close"
              onClick={() => deleteTask(each._id)}
              style={{
                backgroundColor: "#2A2B2A",
                right: 10,
                position: "absolute",
              }}
              className="btn px-2 p-0 text-light"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ))
      ) : (
        <div className="d-flex p-3 flex-column align-items-center">
          <NoTasksSVG height="30vh" />
          <h2 className="fw-light mt-3">No tasks yet</h2>
        </div>
      )}
    </Card>
  );
};

export default TasksHandler;
