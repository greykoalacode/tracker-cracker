import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import { api } from "./http/ApiService";
import { useEffect, Suspense, lazy  } from "react";
import { useStoreRehydrated } from 'easy-peasy';
import "./App.css";
import "./styles.scss";
import ScheduleManager from "./Components/ScheduleManager/ScheduleManager";
import Loading from "./Components/Loading/Loading";
import HabitsContainer from "./Components/HabitsContainer/HabitsContainer";

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
      if (isLogged === true) {
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

  if(!isRehydrated){
    return <Loading />
  }
  return (
    <div className="App">
      <Router>
        {/* <div> */}
        <Suspense fallback={<Loading />}>
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
            <PrivateRoute component={HabitsContainer} path="/habits" />
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
