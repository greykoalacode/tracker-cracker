import { useStoreState } from "easy-peasy";
import React from "react";
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
    <>
    <div className="p-2 px-4 page">
      <h1 className="fw-bold">Hello {user.name}</h1>
      <div className="row gap-2">
        <HabitsHandler props="col align-self-start" />
        <SchedulesHandler props="col align-self-start" />
        <TasksHandler props="col align-self-start" />
        <RoutinesHandler props="col align-self-start" />
        {/* <button onClick={getData}>Click</button> */}
      </div>
      {/* row-cols-1 row-cols-md-2 */}
    </div>
    </>
  );
};

export default Dashboard;
