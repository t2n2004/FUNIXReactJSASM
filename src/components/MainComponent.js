import React, { Component } from "react";
import ListStaffs from "./ListStaffsComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ListDepartments from "./ListDepartmentsComponent";
import Salary from "./SalaryComponent";
import {
  addStaff,
  fetchStaffs,
  fetchDepartments,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addStaff: (staff) => dispatch(addStaff(staff)),

  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },

  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
  }

  render() {
    const StaffPage = () => {
      return (
        <div>
          <ListStaffs
            staffs={this.props.staffs}
            departments={this.props.departments}
            onAddStaff={this.props.addStaff}
          />
        </div>
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/staffs" component={StaffPage} />

          <Route
            exact
            path="/departments"
            component={() => (
              <ListDepartments
                departments={this.props.departments}
                staffs={this.props.staffs}
              />
            )}
          />

          <Route
            exact
            path="/salary"
            component={() => <Salary staffs={this.props.staffs.staffs} />}
          />

          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
