import React, { Component } from 'react';
import ListStaff from './ListStaffComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { STAFFS } from '../shared/staffs';
import { Route, Switch, Redirect } from 'react-router';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS
    };
  }

  render() {

    const StaffPage = () => {
      return(
        <ListStaff staff={this.state.staffs}
        />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
              <Route path='/staff' component={StaffPage} />
              <Route exact path='/department' component={Department} />
              <Route exact path='/salary' component={Salary} />
              <Redirect to="/staff" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;