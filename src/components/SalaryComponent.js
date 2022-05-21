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
import { FadeTransform } from "react-animation-components";
import { connect } from "react-redux";
import { fetchSalaries } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    salaries: state.salaries,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSalaries: () => {
    dispatch(fetchSalaries());
  },
});

class Salary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: this.props.staffs,
      order: "id",
    };
  }

  componentDidMount() {
    this.props.fetchSalaries();
  }

  sort(event) {
    this.setState({ order: event.target.value });
  }

  renderSalaries() {
    // sort theo order
    const sortedSalaries = this.props.salaries.salaries.sort((a, b) =>
      a[this.state.order] > b[this.state.order] ? 1 : -1
    );

    //render danh sách bảng lương
    return sortedSalaries.map((staff) => {
      return (
        <div
          key={`staff-${staff.id}`}
          className={`col-12 col-sm-6 col-md-4 my-2`}
        >
          <FadeTransform
            in
            transformProps={{
              exitTransform: "scale(0.5) translateY(-50%)",
            }}
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
          </FadeTransform>
        </div>
      );
    });
  }

  render() {
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

        <div className="row">{this.renderSalaries()}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Salary);
