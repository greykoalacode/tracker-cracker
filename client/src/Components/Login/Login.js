import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { api, login } from "../../http/ApiService";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const isLogged = useStoreState((state) => state.isLogged);

  const { setUserState, setLoginState, resetUserState, setExercises } = useStoreActions(
    (actions) => ({
      setUserState: actions.setUserState,
      setLoginState: actions.setLoginState,
      resetUserState: actions.resetUserState,
      setExercises: actions.setExercises
    })
  );
  const userLogged = (seconds) => {
    setLoginState(true);
    setTimeout(() => {
      history.push("/dashboard");
    }, seconds);
  };

  useEffect(() => {
    async function isUserLoggedin() {
      let result = await api.get("/user/info");
      if (result.status === 200) {
        setUserState(result.data);
        userLogged(500);
      } else {
        setLoginState(false);
        resetUserState();
      }
    }
    if (!isLogged) {
      isUserLoggedin();
    }
    if (isLogged) {
      userLogged(500);
    }
  }, []);

  const loginAsGuest = async () => {
    const testData = {email: "test@user.com", password: "test1234"};
    let result = await login(testData);
    if (result.status === 200) {
      let exercise = await api.get("/exercises");
      if(exercise.status === 200){
        setExercises(exercise.data);
      }
      setUserState(result.data);
      userLogged(1000);
    }
  }

  const onSubmit = async (data) => {
    // console.log("data", data);
    let result = await login(data);
    // console.log("result", result);
    if (result.status === 200) {
      let exercise = await api.get("/exercises");
      if(exercise.status === 200){
        setExercises(exercise.data);
      }
      setUserState(result.data);
      userLogged(1000);
    }
  };

  return (
    <div
      className="register container border-0 rounded shadow-sm text-start mx-auto p-3 p-sm-4 m-5"
      style={{ maxWidth: "600px", width: "90vw" }}
    >
      <div className="row align-items-center font-weight-600 mb-4 shadow p-2">
        <span className="col fw-bold">Just want to check the site ?</span>
        <button onClick={loginAsGuest} className="col-auto btn regbtn align-self-start">Login as Guest</button>
      </div>
      <h2 className="fs-2 fw-bold">Login</h2>
      <div className="my-1">
        <p className="">
          First time here ?
          <Link className="m-2 link" to="/register">
            Register →
          </Link>
        </p>
      </div>
      {isLogged && (
        <div className="alert alert-success font-weight-600" role="alert">
        {/* // "p-3 my-3 bg-success text-light font-weight-600" */}
          <span>Successfully Logged In</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            {...register("email", {
              required: "Email Address is Required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Email id does not satisfy pattern",
              },
            })}
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
          />
          <p className="text-danger">{errors.email?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            {...register("password", {
              required: "You must specify password",
              minLength: {
                value: 8,
                message: "Password must have atleast 8 characters",
              },
            })}
            type="password"
            className="form-control"
            id="password"
          />
          <p className="text-danger">{errors.password?.message}</p>
        </div>
        <button type="submit" className="btn regbtn">
          Login
        </button>
      </form>
      
    </div>
  );
};

export default Login;
