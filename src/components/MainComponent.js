import React, { Component } from "react";
import ListStaffs from "./ListStaffsComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import ListDepartments from "./ListDepartmentsComponent";
import Salary from "./SalaryComponent";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />

        <Switch>
          <Route exact path="/staffs" component={ListStaffs} />
          <Route exact path="/departments" component={ListDepartments} />
          <Route exact path="/salary" component={Salary} />
          <Redirect to="/staffs" />
        </Switch>

        <Footer />
      </div>
    );

  }
}

export default Main;
