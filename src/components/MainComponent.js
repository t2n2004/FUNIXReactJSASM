import React, { Component } from "react";
import ListStaff from "./ListStaffComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Department from "./DepartmentComponent";
import Salary from "./SalaryComponent";
import StaffForm from "./StaffFormComponent";


const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  }
}

class Main extends Component {
  constructor(props) {
    super(props);


    this.addStaff = this.addStaff.bind(this); //chưa sửa
  }

  addStaff(newStaff) { //chưa sửa

    // update danh sách staff
    const staff = {
      ...newStaff,
      id: this.props.staffs.length,
      department: this.props.departments.find(dpm =>  dpm.id == newStaff.department),
      image: '/assets/images/alberto.png'
    }
    this.setState({ 
      staffs: this.props.staffs.concat([staff])
    });

    // update numberOfStaff trong phòng ban
    const departments = this.props.departments;
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
          <ListStaff staffs={this.props.staffs} />
          <StaffForm onAddStaff={this.addStaff} />
        </div>
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/staff" component={StaffPage} />
          <Route exact path="/department" component={() => <Department departments={this.props.departments} />} />
          <Route exact path="/salary" component={() => <Salary staffs={this.props.staffs} />} />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
