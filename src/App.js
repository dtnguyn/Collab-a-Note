import React from "react";
import HomePage from "./view/pages/HomePage";
import NotePage from "./view/pages/NotePage";
import DashBoardPage from "./view/pages/DashBoardPage";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationBar from "./view/components/shared/NavigationBar";
import CourseDetailPage from "./view/pages/CourseDetailPage";
import SignUpPage from './view/pages/SignUp';
import SignInPage from './view/pages/SignIn';
import PasswordForgetPage from './view/pages/PasswordForget';
import AccountPage from './view/pages/Account';
import AdminPage from './view/pages/Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from './view/pages/Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);

// export default withAuthentication(App);
// function App() {

//   return (

//     <Router>
//       <NavigationBar/>
//       <Switch>
//         <Route path="/" exact component={HomePage}/>
//         <Route path="/auth" component={HomePage}/>
//         <Route path="/note" component={NotePage}/>
        
//         <Route path="/dashboard" exact component={DashBoardPage}/>
//         <Route path="/dashboard/course" component={CourseDetailPage}/>
//       </Switch>
//     </Router>
//   )
// }

// export default App;
