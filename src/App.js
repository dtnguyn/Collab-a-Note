import React from "react";
import HomePage from "./view/pages/HomePage";
import NotePage from "./view/pages/NotePage";
import DashBoardPage from "./view/pages/DashBoardPage";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationBar from "./view/components/shared/NavigationBar";
import CourseDetailPage from "./view/pages/CourseDetailPage";

function App() {

  return (

    <Router>
      <NavigationBar/>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/auth" component={HomePage}/>
        <Route path="/note" component={NotePage}/>
        
        <Route path="/dashboard" exact component={DashBoardPage}/>
        <Route path="/dashboard/course" component={CourseDetailPage}/>
      </Switch>
    </Router>
  )
}

export default App;
