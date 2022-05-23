import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { registerUser } from "../../http/ApiService";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  const [regStatus, setRegStatus] = useState(false);
  const history = useHistory();
  // const [formData, setFormData] =useState({});

  password.current = watch("password", "");
  const onSubmit = (data) => {
    // console.log(data);
    signUp(data);
  };
  // useEffect(() => {
  //     async function getData() {
  //         const response = await fetch('http://localhost:3001/api/user/register', {method: 'POST', body: JSON.stringify(formData)}).then(res => res.json());
  //         setResp(response);
  //         // console.log(response)
  //     }
  //     getData();
  // },[formData])

  async function signUp(formData) {
    // console.log(formData);
    let result = await registerUser(formData);
    // axios.post("http://localhost:3001/api/user/register", formData, {withCredentials: true,headers: {
    //     "Content-Type": "application/json"
    // }});
    // let result = await axios.post("http://localhost:3001/api/user/login", {email: formData.email, password: formData.password}, {withCredentials: true, headers: {
    //     "Content-Type": "application/json"
    // }});
    // console.log(result);
    if (result.status === 200) {
      setRegStatus(true);
      setTimeout(() => {
        history.push("/login");
      }, 5000);
    }
  }

  // if(error) return <div>failed to load</div>
  // if(!data) return <div>loading...</div>

  return (
    <div
      className="register container border-0 rounded shadow-sm text-start mx-auto p-3 p-sm-4 m-5"
      style={{ maxWidth: "700px" }}
    >
      <h2 className="fs-2 fw-bold">Register</h2>
      <div className="my-1">
        <p className="">
          Already have an Account ?
          <Link className="m-2 link" to="/login">
            Login →
          </Link>
        </p>
      </div>
      {regStatus && (
        <div className="p-3 my-3 bg-success text-light font-weight-600">
          <span>Successfully Registered</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name", {
              required: "Name is Required",
              minLength: {
                value: 6,
                message: "Name can't be less than 6 words",
              },
            })}
            type="text"
            className="form-control"
            id="name"
            placeholder="John Doe"
          />
          <p className="text-danger">{errors.name?.message}</p>
        </div>
        <div className="row  mb-3">
          <div className="col-md-8">
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
          <div className="col-md-4 col-6">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              {...register("gender")}
              defaultValue="other"
              className="form-select"
              id="gender"
              aria-label="Gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col mb-3">
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
          <div className="col mb-3">
            <label htmlFor="password2" className="form-label">
              Confirm Password
            </label>
            <input
              {...register("password2", {
                validate: (value) =>
                  value === password.current || "Passwords do not match",
              })}
              type="password"
              className="form-control"
              id="password2"
            />
            <p className="text-danger">{errors.password2?.message}</p>
          </div>
        </div>
        <button type="submit" className="btn regbtn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
