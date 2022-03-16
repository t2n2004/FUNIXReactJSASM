import React, { Component } from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import {
  fetchDepartments,
  fetchDepartmentStaffs,
} from "../redux/ActionCreators";
import Staff from "./StaffComponent";

const mapStateToProps = (state) => {
  return {
    departments: state.departments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },

  fetchDepartmentStaffs: (departmentId) => {
    dispatch(fetchDepartmentStaffs(departmentId));
  },
});

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDepartment: null,
    };

    this.onDepartmentSelect = this.onDepartmentSelect.bind(this);
    this.goback = this.goback.bind(this);
  }

  componentDidMount() {
    this.props.fetchDepartments();
  }

  onDepartmentSelect(department) {
    this.setState({
      selectedDepartment: department,
    });

    this.props.fetchDepartmentStaffs(department.id);
  }

  goback() {
    this.setState({
      selectedDepartment: null,
    });
  }

  renderDepartments() {
    if (this.props.departments.isLoading) {
      return <div>Loading...</div>;
    }

    const departments = this.props.departments.departments.map((department) => {
      return (
        <div
          key={`department-${department.id}`}
          className="col-12 col-sm-6 col-md-4 my-3"
        >
          <Card onClick={() => this.onDepartmentSelect(department)}>
            <CardBody>
              <CardTitle>{department.name}</CardTitle>
              <CardText>
                Số lượng nhân viên: {department.numberOfStaff}
              </CardText>
            </CardBody>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{departments}</div>
      </div>
    );
  }

  renderSelectedDepartmentStaffs() {
    if (this.props.departments.selectedDepartmentStaffsLoading) {
      return (
        <div className="p-4 text-center">{`Loading ${this.state.selectedDepartment.name} staffs...`}</div>
      );
    }

    const staffs = this.props.departments.selectedDepartmentStaffs.map(
      (staff) => <Staff key={staff.id} staff={staff} />
    );

    return (
      <div className="container">
        <div className="row my-3 my-md-4">
          <div className="col-12">
            <a href="#" onClick={() => this.goback()}>
              Back
            </a>
          </div>
        </div>

        <div className="row">{staffs}</div>
      </div>
    );
  }

  render() {
    if (this.state.selectedDepartment) {
      return this.renderSelectedDepartmentStaffs();
    }

    return this.renderDepartments();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Department);
