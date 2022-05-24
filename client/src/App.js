import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Homepage from "./Components/Homepage/Homepage";
import Dashboard from "./Components/Dashboard/Dashboard";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { useStoreActions, useStoreState } from "easy-peasy";
import HabitManager from "./Components/HabitManager/HabitManager";
import { api } from "./http/ApiService";
import Navbar from "./Components/Navbar/Navbar";
import RoutineManager from "./Components/RoutineManager/RoutineManager";
import { useEffect } from "react";
import { useStoreRehydrated } from 'easy-peasy';
import "./App.css";
import "./styles.scss";

function App() {
  const isRehydrated = useStoreRehydrated();
  const { setLoginState, setUserState, resetUserState, setExercises } = useStoreActions(
    (actions) => ({
      setLoginState: actions.setLoginState,
      setUserState: actions.setUserState,
      resetUserState: actions.resetUserState,
      setExercises: actions.setExercises,
    })
  );
  const {user, isLogged} = useStoreState((state) => ({user: state.user, isLogged: state.isLogged}));
  const history = useHistory();
  // function isLoggedIn(){
  //   async function check(){
  //     let resultObj = await checkLogin();
  //     if(resultObj.status !==  200){
  //       // setLoginState(false);
  //       // resetUserState();
  //       return false;
  //     }
  //     return true;
  //   }
  //   return check();
  // }
  // const isLoggedCheck = () => {
  //   async function check(){
  //     let val = await isLoggedIn();
  //     return val;
  //   }
  //   return check();
  // }
  // const user = useStoreState(state => state.user);
  // const [loginState, setLogSt] = useState(user.isLogged);
  // loginStatus.then(
  //   (result) => setLoginState(true)
  // ).catch(
  //   (error) => setLoginState(false)
  // );
  
  // console.log('log st',isLogged);
  // const cookieExists = getCookie("token") !== undefined;
  // console.log('cookie ', getCookie("token"));
  // console.log("app cookie", cookieExists);
  // console.log(isLoggedCheck);

  useEffect(() => {
    async function updateDets() {
      if (isLogged) {
        // console.log("update called ");
        let resultObj = await api.get("/user/info");
        let exercisesObj = await api.get("exercises");
        if (resultObj.status !== 200) {
          setLoginState(false);
          history.push("/login");
        } else {
          setUserState({ ...user, ...resultObj.data });
          setExercises(exercisesObj.data);
        }
      } else {
        resetUserState();
        setLoginState(false);
      }
    }
    updateDets();
  },[]);
  // const isLogged = useStoreState(state => state.isLogged);
  // const setLoginState = useStoreActions(actions => actions.setLoginState);
  // // const [navigate, setNavigate] = useState(false);
  // const logout = () => {
  //   // document.cookie = "token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  //   async function logoutCall() {
  //     let result = await api.get("/user/logout");
  //     if(result.status === 200){
  //       setLoginState(false);
  //     }
  //   }
  //   logoutCall();
  //   // setNavigate(true);
  // }
  // console.log(user);
  if(!isRehydrated){
    return <div>Loading...</div>
  }
  return (
    <div className="App">
      <Router>
        {/* <div> */}
        <Navbar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute component={HabitManager} path="/habits/:id" />
          <PrivateRoute component={RoutineManager} path="/routines/:id" />
          <PrivateRoute component={Dashboard} path="/dashboard" />
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
        {/* </div> */}
      </Router>
      <script src="node_modules/jquery/dist/jquery.slim.min.js"></script>
    </div>
  );
}

export default App;
