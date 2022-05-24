import React from "react";
import { Redirect, Route } from "react-router";
import { getCookie, isLoggedIn } from "../../utils/utils";



const PrivateRoute = async ({ component: Component, ...rest }) => {
  // // const history = useHistory();
  // const cookieExists = getCookie("token") !== undefined;
  const isLoggedCheck = await isLoggedIn();
  // console.log("islogged ", user);
  // useEffect(() => {
    // console.log('useff runn')
  //   if (cookieExists) {
  //     async function updateDets() {
  //       let resultObj = await api.get("/user/info");
  //       let exercisesObj = await api.get("exercises");
  //       if (resultObj.status !== 200) {
  //         setLoginState(false);
  //         history.push("/login");
  //       } else {
  //         setUserState({ ...user, ...resultObj.data });
  //         setExercises(exercisesObj.data);
  //       }
  //     }
  //     updateDets();
  //   }else{
  //       history.push("/login");
  //   }
  // },[]);
  // useEffect(() => {
  //     async function getResultObj() {
  //         let resultObj = await api.get("/user/info");
  //         let exercisesObj = await api.get("exercises");
  //         // axios.get("http://localhost:3001/api/user/info", {withCredentials: true, headers: {
  //         //     "Content-Type": "application/json"
  //         // }});
  //         if(resultObj.status !== 200){
  //             setLoginState(false);
  //             history.push("/login");
  //         }
  //         else {
  //             setUserState({...user, ...resultObj.data});
  //             setExercises(exercisesObj.data);
  //         }
  //     }
  //     getResultObj();
  // },[])
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedCheck ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
