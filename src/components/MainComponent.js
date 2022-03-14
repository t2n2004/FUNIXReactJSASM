import React, { Component } from "react";
import ListStaff from "./ListStaffComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Department from "./DepartmentComponent";
import Salary from "./SalaryComponent";
import { addStaff, fetchStaffs } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addStaff: (name, doB, startDate, salaryScale) =>
    dispatch(addStaff(name, doB, startDate, salaryScale)),
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.addStaff = this.addStaff.bind(this);
  }

  componentDidMount() {
    this.props.fetchStaffs();
  }

  addStaff(newStaff) {
    // update danh sách staff
    const staff = {
      ...newStaff,
      id: this.props.staffs.staffs.length,
      department: this.props.departments.departments.find(
        (dpm) => dpm.id == newStaff.department
      ),
      image: "/assets/images/alberto.png",
    };

    this.setState({
      staffs: this.props.staffs.push(staff),
    });

    // update numberOfStaff trong phòng ban
    const departments = this.props.departments.departments;
    departments.forEach((item) => {
      if (item.id == newStaff.department) {
        item.numberOfStaff += 1;
      }
    });

    this.setState({
      departments: departments,
    });
  }

  render() {
    const StaffPage = () => {
      return (
        <div>
          <ListStaff
            staffs={this.props.staffs.staffs}
            onAddStaff={this.props.addStaff}
          />
        </div>
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/staff" component={StaffPage} />
          <Route
            exact
            path="/department"
            component={() => (
              <Department departments={this.props.departments} />
            )}
          />
          <Route
            exact
            path="/salary"
            component={() => <Salary staffs={this.props.staffs.staffs} />}
          />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
