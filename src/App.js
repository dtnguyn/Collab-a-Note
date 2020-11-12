import React, { useContext } from "react";
import HomePage from "./view/pages/HomePage";
import Signup from "./view/components/Signup/index";
import Signin from "./view/components/Signin/index";
import AuthPage from "./view/pages/AuthPage";
import NotePage from "./view/pages/NotePage";
import DashBoardPage from "./view/pages/DashBoardPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./view/components/shared/NavigationBar";
import CourseDetailPage from "./view/pages/CourseDetailPage";
import { AuthProvider } from "./contexts/AuthContext";

// import Navigation from './view/components/Navigation';
// import LandingPage from './view/components/Landing';
// import SignUpPage from './view/components/SignUp';
// import SignInPage from './view/components/SignIn';
// import PasswordForgetPage from './view/components/PasswordForget';
// import AccountPage from './view/components/Account';
// import AdminPage from './view/components/Admin';

// import * as ROUTES from './view/constants/routes';
// import { withAuthentication } from './view/components/Session';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={DashBoardPage} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/note" component={NotePage} />
          <Route path="/dashboard/course" component={CourseDetailPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

// const App = () => (
//   <Router>
//     <div>
//       <Navigation />

//       <hr />

//       <Route exact path={ROUTES.LANDING} component={LandingPage} />
//       <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
//       <Route path={ROUTES.SIGN_IN} component={SignInPage} />
//       <Route
//         path={ROUTES.PASSWORD_FORGET}
//         component={PasswordForgetPage}
//       />
//       <Route path={ROUTES.HOME} component={HomePage} />
//       <Route path={ROUTES.ACCOUNT} component={AccountPage} />
//       <Route path={ROUTES.ADMIN} component={AdminPage} />
//     </div>
//   </Router>
// );

// export default withAuthentication(App);
