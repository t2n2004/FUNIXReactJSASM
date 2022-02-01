import React, { Component } from 'react';
import { Media, Card,  CardText, CardBody, CardTitle, CardFooter } from 'reactstrap';
import { STAFFS } from '../shared/staffs';

class Salary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
    };
  }

  render() {
    const basicSalary = 3000000;
    const overTimeSalary = 200000;
    const salary = this.state.staffs.map((staff) => {
      return (
        <div
          key={`staff-${staff.id}`}
          className={`col-12 col-sm-6 col-md-4 my-1`}
        >
            <Card>
                <CardTitle>{staff.name}</CardTitle>
                <CardBody>
                    <CardText>Mã nhân viên: {staff.id}</CardText>
                    <CardText>Hệ số lương:  {staff.salaryScale}</CardText>
                    <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
                </CardBody>
                <CardFooter>Lương: {(staff.salaryScale * basicSalary) + (staff.overTime * overTimeSalary)}</CardFooter>
            </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{salary}</div>
      </div>
    );
  }
}

export default Salary;