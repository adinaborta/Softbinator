import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import MyProfile from "./components/MyProfile";
import UploadForm from "./components/UploadForm";
import { AuthProvider } from "./firebase/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Feed from "./components/Feed";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/signup" component={Signup} />
          <PrivateRoute path="/login" component={Login} />
          <PrivateRoute path="/upload" component={UploadForm} />
          <PrivateRoute path="/profile" component={MyProfile} />
          <PrivateRoute path="/feed" component={Feed} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
