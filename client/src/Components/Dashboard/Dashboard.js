import { useStoreState } from "easy-peasy";
import React from "react";
import EntryBanner from "../EntryBanner/EntryBanner";
import HabitsHandler from "../HabitsHandler/HabitsHandler";
import RoutinesHandler from "../RoutinesHandler/RoutinesHandler";
import SchedulesHandler from "../SchedulesHandler/SchedulesHandler";
import TasksHandler from "../TasksHandler/TasksHandler";

const Dashboard = () => {
  
  const { user } = useStoreState((state) => ({isLoggedIn: state.isLoggedIn, user: state.user}));
  
  // const getData = () => {
  //   async function getDataAsync(){
  //     let result = await axios.get("https://p8uek.sse.codesandbox.io/login", {withCredentials: true});
      // console.log(result);
  //   }
  //   getDataAsync();
  // }
  
  
  // const history = useHistory();
  // const setUserState = useStoreActions(actions => actions.setUserState);
  // useEffect(() => {
  //     if(user.name === ''){
  //         async function getData() {
  //             let result = await axios.get("http://localhost:3001/api/user/info", {withCredentials: true, headers: {
  //                 "Content-Type": "application/json"
  //             }});
  //             if(result.status === 200){
  //                 setUserState({...user, ...result.data});
  //             } else {
  //                 history.push('/login');
  //             }
  //         }
  //         getData();
  //     }
  // },[])
  // console.log(user);
  return (
    <div className="page">
      <h1 className="fw-bold">Hello {user.name}</h1>
      <EntryBanner />
      <div className="container">
        <div className="row gap-3">
          <HabitsHandler props="col col-md-5 align-self-start" />
          <SchedulesHandler props="col col-md-6 align-self-start" />
          {/* <TasksHandler props="col col-md-5 align-self-start" /> */}
          <RoutinesHandler props="col col-md-6 align-self-start" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
