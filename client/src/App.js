import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
// import Login from "./Components/Login/Login";
// import Register from "./Components/Register/Register";
// import Homepage from "./Components/Homepage/Homepage";
// import Dashboard from "./Components/Dashboard/Dashboard";
// import HabitManager from "./Components/HabitManager/HabitManager";
// import RoutineManager from "./Components/RoutineManager/RoutineManager";
// import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
// import Navbar from "./Components/Navbar/Navbar"; 
import { useStoreActions, useStoreState } from "easy-peasy";
import { api } from "./http/ApiService";
import { useEffect, Suspense, lazy  } from "react";
import { useStoreRehydrated } from 'easy-peasy';
import "./App.css";
import "./styles.scss";
import ScheduleManager from "./Components/ScheduleManager/ScheduleManager";

const Register = lazy(() => import("./Components/Register/Register"));
const Login = lazy(() => import("./Components/Login/Login"));
const Homepage = lazy(() => import("./Components/Homepage/Homepage"));
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard"));
const HabitManager = lazy(() => import("./Components/HabitManager/HabitManager"));
const RoutineManager = lazy(() => import("./Components/RoutineManager/RoutineManager"));
const PrivateRoute = lazy(() => import("./Components/PrivateRoute/PrivateRoute"));
const Navbar = lazy(() => import("./Components/Navbar/Navbar")); 

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



  useEffect(() => {
    async function updateDets() {
      if (isLogged) {
        // console.log("update called ");
        let resultObj = await api.get("/user/info");
        let exercisesObj = await api.get("/exercises");
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
        <Suspense fallback={<div>Loading...</div>}>
        <Navbar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register" >
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute component={HabitManager} path="/habits/:id" />
          <PrivateRoute component={RoutineManager} path="/routines/:id" />
          <PrivateRoute component={ScheduleManager} path="/schedules/:id" />
          <PrivateRoute component={Dashboard} path="/dashboard" />
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
        {/* </div> */}
        </Suspense>
      </Router>
      <script src="node_modules/jquery/dist/jquery.slim.min.js"></script>
    </div>
  );
}

export default App;
