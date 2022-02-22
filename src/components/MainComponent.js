import React, { Component } from "react";
import ListStaff from "./ListStaffComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import { Route, Switch, Redirect } from "react-router";
import Department from "./DepartmentComponent";
import Salary from "./SalaryComponent";
import StaffForm from "./StaffFormComponent";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS
    };

    this.addStaff = this.addStaff.bind(this);
  }

  addStaff(newStaff) {

    // update danh sách staff
    const staff = {
      ...newStaff,
      id: this.state.staffs.length,
      department: DEPARTMENTS.find(dpm =>  dpm.id == newStaff.department),
      image: '/assets/images/alberto.png'
    }
    this.setState({ 
      staffs: this.state.staffs.concat([staff])
    });

    // update numberOfStaff trong phòng ban
    const departments = this.state.departments;
    departments.forEach((item)=> { 
      if (item.id == newStaff.department) {
        item.numberOfStaff += 1;
      }
    })
    this.setState({
      departments: departments
    });

  }

  render() {
    const StaffPage = () => {
      return (
        <div>
          <ListStaff staffs={this.state.staffs} />
          <StaffForm onAddStaff={this.addStaff} />
        </div>
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/staff" component={StaffPage} />
          <Route exact path="/department" component={() => <Department departments={this.state.departments} />} />
          <Route exact path="/salary" component={() => <Salary staffs={this.state.staffs} />} />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
