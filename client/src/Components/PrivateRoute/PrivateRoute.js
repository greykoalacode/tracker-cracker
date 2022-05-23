import React from "react";
import { Redirect, Route } from "react-router";

function getCookie(cookieName) {
  var cookieArr = document.cookie.split(";");
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if (cookieName === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  // // const history = useHistory();
  const cookieExists = getCookie("token") !== null;
  // console.log("islogged ", user);
  // useEffect(() => {
  //   console.log('useff runn')
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
        cookieExists ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
