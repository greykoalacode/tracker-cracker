import { useStoreState } from "easy-peasy";
import React from "react";
import { Redirect, Route } from "react-router";



const PrivateRoute = ({ component: Component, ...rest }) => {

  const isLogged = useStoreState(state => state.isLogged);
  // const setLoginState =  useStoreActions(actions => actions.setLoginState);
  // const [loginState, setLogSt] = useState(user.isLogged); 
  // loginStatus.then(
  //   (result) => setLoginState(true)
  // ).catch(
  //   (error) => setLoginState(false)
  // );
  // console.log('log st',isLogged);
  //  await isLoggedIn();
  // console.log("islogged ", user);
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
