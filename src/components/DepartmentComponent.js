import React, { Component } from 'react';
import { Card,  CardText, CardBody, CardTitle } from 'reactstrap';

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
        departments: this.props.departments
      };
  }

  render() {
    const department = this.state.departments.map((department) => {
      return (
        <div
          key={`department-${department.id}`}
          className={`col-12 col-sm-6 col-md-4 my-1`}
        >
          <Card>
            <CardBody>
              <CardTitle>{department.name}</CardTitle>
              <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{department}</div>
      </div>
    );
  }
}

export default Department;