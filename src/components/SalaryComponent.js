import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardFooter,
  Input,
  Form,
  Label,
} from "reactstrap";

class Salary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: this.props.staffs,
      order: "id",
    };
  }

  sort(event) {
    this.setState({ order: event.target.value });
  }

  renderSalary() {
    const basicSalary = 3000000;
    const overTimeSalary = 200000;

    //tạo ra 1 list mới từ list cũ + property salary
    let newSalaryList = this.state.staffs.map((staff) => {
      return {
        ...staff,
        salary: Math.round(
          staff.salaryScale * basicSalary + staff.overTime * overTimeSalary
        ),
      };
    });

    // sort theo order
    newSalaryList = newSalaryList.sort((a, b) =>
      a[this.state.order] > b[this.state.order] ? 1 : -1
    );

    //render danh sách bảng lương
    const salary = newSalaryList.map((staff) => {
      return (
        <div
          key={`staff-${staff.id}`}
          className={`col-12 col-sm-6 col-md-4 my-2`}
        >
          <Card>
            <CardTitle>{staff.name}</CardTitle>
            <CardBody>
              <CardText>Mã nhân viên: {staff.id}</CardText>
              <CardText>Hệ số lương: {staff.salaryScale}</CardText>
              <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
            </CardBody>
            <CardFooter>Lương: {staff.salary}</CardFooter>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-end">
              <Form inline className="my-2 mr-2">
                <Label className="mr-2"> Sắp xếp theo: </Label>
                <Input
                  type={"select"}
                  size="1"
                  value={this.state.order}
                  onChange={(event) => this.sort(event)}
                >
                  <option value={"id"}>Mã nhân viên</option>
                  <option value={"salary"}>Mức lương</option>
                  <option value={"salaryScale"}>Hệ số lương</option>
                </Input>
              </Form>
            </div>
          </div>
        </div>
        <div className="row">{salary}</div>
      </div>
    );
  }

  render() {
    return this.renderSalary();
  }
}

export default Salary;
