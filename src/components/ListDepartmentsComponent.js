import React, { Component } from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

class Department extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.staffs.isLoading || this.props.departments.isLoading) {
      return <div>Loading...</div>;
    }

    const departments = this.props.departments.departments.map((department) => {
      const numberOfStaff = this.props.staffs.staffs.filter(
        (staff) => staff.departmentId === department.id
      ).length;

      return (
        <div
          key={`department-${department.id}`}
          className="col-12 col-sm-6 col-md-4 my-3"
        >
          <Card>
            <CardBody>
              <CardTitle>{department.name}</CardTitle>
              <CardText>Số lượng nhân viên: {numberOfStaff}</CardText>
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
}

export default Department;
